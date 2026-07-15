"""认证 / 权限相关测试"""

import pytest
import requests

from conftest import BASE_URL, USER_ACCOUNT


@pytest.fixture(scope="session", autouse=True)
def _ensure_test_user():
    """确保测试用户存在"""
    requests.post(f"{BASE_URL}/auth/reg", json=USER_ACCOUNT, timeout=10)


# ── 登录 ─────────────────────────────────────────────

def test_login_success(anon_client):
    """正确账号密码 → success=true"""
    r = anon_client.post("/auth/login", json=USER_ACCOUNT)
    assert r.status_code in (200, 201), f"请求失败: {r.text}"
    body = r.json()
    assert body["success"] is True
    assert body["data"] != ""


def test_login_wrong_password(anon_client):
    """错误密码 → success=false"""
    r = anon_client.post("/auth/login", json={
        "userName": USER_ACCOUNT["userName"],
        "password": "wrong",
    })
    assert r.status_code in (200, 201), f"请求失败: {r.text}"
    body = r.json()
    assert body["success"] is False
    assert "密码" in body["errorMessage"]


def test_login_missing_fields(anon_client):
    """缺少必填字段 → 400"""
    r = anon_client.post("/auth/login", json={})
    assert r.status_code == 400


# ── 权限拦截 ─────────────────────────────────────────

def test_admin_api_without_token(anon_client):
    """未登录 → 401"""
    r = anon_client.get("/admin/users")
    assert r.status_code == 401


def test_admin_api_with_user_token(user_client):
    """普通用户访问 admin 接口 → 401"""
    r = user_client.get("/admin/users")
    assert r.status_code in (401, 403)


def test_admin_api_with_admin_token(admin_client):
    """管理员访问 admin 接口 → 200"""
    r = admin_client.get("/admin/users")
    assert r.status_code == 200
