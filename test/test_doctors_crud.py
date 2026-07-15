"""医生管理 CRUD 测试"""

import pytest
from faker import Faker

fake = Faker("zh_CN")


# ══════════════════════════════════════════════════════
#  数据工厂 fixtures
# ══════════════════════════════════════════════════════

@pytest.fixture(scope="session")
def ref_ids(admin_client):
    """获取真实存在的医院/科室/职称 ID，没有就建"""
    # 科室
    r = admin_client.get("/admin/departments")
    dept_list = r.json()["data"]["list"]
    assert dept_list, "请先运行 seed 初始化科室数据"

    # 职称
    r = admin_client.get("/admin/doctor_titles")
    title_list = r.json()["data"]["list"]
    assert title_list, "请先运行 seed 初始化职称数据"

    # 医院 —— seed 里没有，测试自动建一个
    r = admin_client.get("/admin/hospitals")
    hospital_list = r.json()["data"]["list"]
    if not hospital_list:
        r = admin_client.post("/admin/hospitals", json={
            "name": "测试医院",
            "desc": "e2e 测试自动创建",
        })
        hospital = r.json()["data"]
    else:
        hospital = hospital_list[0]

    return {
        "departmentId": dept_list[0]["id"],
        "doctorTitleId": title_list[0]["id"],
        "hospitalId": hospital["id"],
    }


@pytest.fixture
def doctor_data(ref_ids):
    """生成一条随机的医生创建数据"""
    return {
        "name": fake.name(),
        "desc": fake.sentence(nb_words=10),
        "tags": "擅长," + ",".join(fake.words(3)),
        "content": fake.paragraph(nb_sentences=5),
        "avatar": fake.image_url(),
        "doctorTitleId": ref_ids["doctorTitleId"],
        "departmentId": ref_ids["departmentId"],
        "hospitalId": ref_ids["hospitalId"],
    }


def _create(admin_client, data: dict) -> dict:
    """创建医生并返回 data 对象"""
    r = admin_client.post("/admin/doctors", json=data)
    assert r.status_code in (200, 201), f"创建失败: {r.text}"
    return r.json()["data"]


# ══════════════════════════════════════════════════════
#  CRUD 测试
# ══════════════════════════════════════════════════════

def test_create_doctor(admin_client, doctor_data):
    """创建医生 → 201 + 返回数据包含 id"""
    doctor = _create(admin_client, doctor_data)
    assert doctor["id"]
    assert doctor["name"] == doctor_data["name"]


def test_get_doctor_detail(admin_client, doctor_data):
    """创建后能根据 id 查到医生详情"""
    doctor = _create(admin_client, doctor_data)
    doctor_id = doctor["id"]

    r = admin_client.get(f"/admin/doctors/{doctor_id}")
    assert r.status_code == 200
    assert r.json()["data"]["name"] == doctor_data["name"]


def test_list_doctors(admin_client, doctor_data):
    """分页列表能查到数据，支持 name 搜索"""
    _create(admin_client, doctor_data)

    r = admin_client.get("/admin/doctors", params={"page": 1, "per": 10})
    assert r.status_code == 200
    body = r.json()["data"]
    assert body["total"] >= 1
    assert len(body["list"]) >= 1


def test_search_doctors_by_name(admin_client, doctor_data):
    """按名字搜索医生"""
    unique_name = f"e2e-test-{fake.uuid4()[:8]}"
    data = {**doctor_data, "name": unique_name}
    _create(admin_client, data)

    r = admin_client.get("/admin/doctors", params={"name": unique_name})
    assert r.status_code == 200
    results = r.json()["data"]["list"]
    assert any(d["name"] == unique_name for d in results), \
        f"搜索结果中未找到 {unique_name}"


def test_update_doctor(admin_client, doctor_data):
    """修改医生信息"""
    doctor = _create(admin_client, doctor_data)
    doctor_id = doctor["id"]

    new_name = fake.name()
    r = admin_client.patch(f"/admin/doctors/{doctor_id}", json={"name": new_name})
    assert r.status_code == 200

    r = admin_client.get(f"/admin/doctors/{doctor_id}")
    assert r.json()["data"]["name"] == new_name


def test_delete_doctor(admin_client, doctor_data):
    """删除医生 → 200，之后查不到"""
    doctor = _create(admin_client, doctor_data)
    doctor_id = doctor["id"]

    r = admin_client.delete(f"/admin/doctors/{doctor_id}")
    assert r.status_code == 200

    # 确认已删除
    r = admin_client.get(f"/admin/doctors/{doctor_id}")
    assert r.status_code == 200
    assert r.json()["data"] is None or r.json()["data"] == {}


def test_delete_many_doctors(admin_client, doctor_data):
    """批量删除"""
    d1 = _create(admin_client, doctor_data)
    d2 = _create(admin_client, {**doctor_data, "name": fake.name()})

    r = admin_client.delete("/admin/doctors/remove_many",
                            params={"ids": f"{d1['id']},{d2['id']}"})
    assert r.status_code == 200


# ── 校验 ─────────────────────────────────────────────

def test_create_doctor_missing_name(admin_client, ref_ids):
    """缺少必填字段 → 400"""
    r = admin_client.post("/admin/doctors", json={
        "desc": "test",
        "departmentId": ref_ids["departmentId"],
    })
    assert r.status_code == 400


def test_create_doctor_without_token(anon_client, doctor_data):
    """未登录创建 → 401"""
    r = anon_client.post("/admin/doctors", json=doctor_data)
    assert r.status_code == 401


# ══════════════════════════════════════════════════════
#  边界 / 异常测试（部分暴露了后端 bug）
# ══════════════════════════════════════════════════════

@pytest.mark.xfail(reason="BUG: 后端返回 500，应该返回 404")
def test_update_nonexistent_doctor(admin_client):
    """更新不存在的医生 → 期望 404，实际 500"""
    r = admin_client.patch("/admin/doctors/non-existent-id", json={"name": "x"})
    assert r.status_code == 404


@pytest.mark.xfail(reason="BUG: 后端返回 500，应该返回 404")
def test_delete_nonexistent_doctor(admin_client):
    """删除不存在的医生 → 期望 404，实际 500"""
    r = admin_client.delete("/admin/doctors/non-existent-id")
    assert r.status_code == 404


@pytest.mark.xfail(reason="BUG: 后端返回 500，应该返回 400")
def test_create_with_invalid_department(admin_client, doctor_data):
    """无效科室 ID → 期望 400，实际 500"""
    data = {**doctor_data, "departmentId": "not-a-valid-id"}
    r = admin_client.post("/admin/doctors", json=data)
    assert r.status_code == 400


def test_create_with_empty_name(admin_client):
    """空 name → 400"""
    r = admin_client.post("/admin/doctors", json={"name": ""})
    assert r.status_code == 400


@pytest.mark.xfail(reason="BUG: 超长 name 应该 400，实际返回 201 创建成功")
def test_create_with_too_long_name(admin_client, doctor_data):
    """超长 name → 期望 400，实际 201"""
    data = {**doctor_data, "name": "张" * 500}
    r = admin_client.post("/admin/doctors", json=data)
    assert r.status_code == 400


def test_get_nonexistent_doctor(admin_client):
    """查不存在的医生 → 200 + data 为空"""
    r = admin_client.get("/admin/doctors/non-existent-id")
    assert r.status_code == 200
    data = r.json().get("data") or r.json().get("name")
    assert not data  # data 为空说明不存在
