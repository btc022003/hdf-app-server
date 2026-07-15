"""认证 / 权限相关测试

登录接口始终返回 200，成功与否看 body.success 字段
"""


# ── 登录 ─────────────────────────────────────────────

def test_login_success(anon_client):
    """正确账号密码 → success=true"""
    r = anon_client.post("/auth/login", json={
        "userName": "user",
        "password": "123456",
    })
    assert r.status_code == 200
    body = r.json()
    assert body["success"] is True
    assert body["data"] != ""


def test_login_wrong_password(anon_client):
    """错误密码 → success=false，errorMessage 提示"""
    r = anon_client.post("/auth/login", json={
        "userName": "user",
        "password": "wrong",
    })
    assert r.status_code == 200
    body = r.json()
    assert body["success"] is False
    assert "密码" in body["errorMessage"]


def test_login_missing_fields(anon_client):
    """缺少必填字段 → 400"""
    r = anon_client.post("/auth/login", json={})
    assert r.status_code == 400


# ── 权限拦截 ─────────────────────────────────────────

def test_admin_api_without_token(anon_client):
    """未登录访问 admin 接口 → 401"""
    r = anon_client.get("/admin/users")
    assert r.status_code == 401


def test_admin_api_with_user_token(user_client):
    """普通用户访问 admin 接口 → 403"""
    r = user_client.get("/admin/users")
    assert r.status_code == 403


def test_admin_api_with_admin_token(admin_client):
    """管理员访问 admin 接口 → 200"""
    r = admin_client.get("/admin/users")
    assert r.status_code == 200
