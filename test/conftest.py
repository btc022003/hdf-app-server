"""pytest fixtures —— 自动处理登录 token、base_url，测试用例直接拿 client 调接口"""
import pytest
import requests


BASE_URL = "http://localhost:3006"

# ── 测试账号（改这里就行） ──────────────────────────
ADMIN_ACCOUNT = {"userName": "admin", "password": "123456"}
USER_ACCOUNT = {"userName": "user", "password": "123456"}


def _login(session: requests.Session, url: str, account: dict) -> str:
    """登录，返回 token。登录接口始终返回 200，通过 success 字段判断结果"""
    r = session.post(url, json=account)
    assert r.status_code == 200, f"请求失败: {r.text}"
    body = r.json()
    assert body.get("success"), f"登录失败: {body.get('errorMessage')}"
    token = body.get("data")
    assert token, f"未获取到 token: {body}"
    return token


@pytest.fixture(scope="session")
def admin_client() -> requests.Session:
    """管理员客户端 —— 自动登录，所有请求带 admin token"""
    s = requests.Session()
    token = _login(s, f"{BASE_URL}/auth/admin_login", ADMIN_ACCOUNT)
    s.headers.update({"token": token})
    s.base_url = BASE_URL  # type: ignore[attr-defined]
    return s


@pytest.fixture(scope="session")
def user_client() -> requests.Session:
    """普通用户客户端 —— 自动登录，所有请求带 user token"""
    s = requests.Session()
    token = _login(s, f"{BASE_URL}/auth/login", USER_ACCOUNT)
    s.headers.update({"token": token})
    s.base_url = BASE_URL  # type: ignore[attr-defined]
    return s


@pytest.fixture
def anon_client() -> requests.Session:
    """未登录客户端 —— 用于测试权限拦截"""
    s = requests.Session()
    s.base_url = BASE_URL  # type: ignore[attr-defined]
    return s
