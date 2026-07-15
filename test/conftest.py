"""pytest fixtures —— API 客户端 + Playwright 浏览器"""

import pytest
import requests

# ══════════════════════════════════════════════════════
#  全局配置（改环境的话只改这里）
# ══════════════════════════════════════════════════════

BASE_URL = "http://127.0.0.1:3006"
MANAGER_URL = f"{BASE_URL}/manager"

ADMIN_ACCOUNT = {"userName": "admin", "password": "admin"}
USER_ACCOUNT = {"userName": "testuser", "password": "123456"}

# Playwright 懒加载
_pw = None


def _get_pw():
    global _pw
    if _pw is None:
        import playwright.sync_api as _pw
    return _pw


# ══════════════════════════════════════════════════════
#  带 base_url 的 Session（不用每次写完整 URL）
# ══════════════════════════════════════════════════════

class BaseSession(requests.Session):
    """Session with base URL — '/' prefixed paths auto-prepend base_url."""

    def __init__(self, base_url: str = ""):
        super().__init__()
        self._base_url = base_url.rstrip("/")

    def request(self, method, url, *args, **kwargs):
        if url.startswith("/"):
            url = self._base_url + url
        return super().request(method, url, *args, **kwargs)


# ══════════════════════════════════════════════════════
#  工具函数
# ══════════════════════════════════════════════════════

def _ensure_user_exists():
    """确保测试用户存在"""
    requests.post(f"{BASE_URL}/auth/reg", json=USER_ACCOUNT, timeout=10)


def _login(session: requests.Session, url: str, account: dict) -> str:
    """登录，返回 token"""
    r = session.post(url, json=account)
    assert r.status_code in (200, 201), f"请求失败: {r.text}"
    body = r.json()
    assert body.get("success"), f"登录失败: {body.get('errorMessage')}"
    token = body["data"]
    assert token, f"未获取到 token: {body}"
    return token


def _get_admin_token() -> str:
    r = requests.post(f"{BASE_URL}/auth/admin_login", json=ADMIN_ACCOUNT, timeout=10)
    body = r.json()
    assert body.get("success"), f"管理员登录失败: {body.get('errorMessage')}"
    return body["data"]


def _get_user_token() -> str:
    _ensure_user_exists()
    r = requests.post(f"{BASE_URL}/auth/login", json=USER_ACCOUNT, timeout=10)
    body = r.json()
    assert body.get("success"), f"用户登录失败: {body.get('errorMessage')}"
    return body["data"]


def _make_cookie(token: str) -> dict:
    """构造鉴权 cookie"""
    return {
        "name": "token",
        "value": token,
        "url": MANAGER_URL,
        "httpOnly": True,
        "secure": False,
        "sameSite": "Lax",
    }


# ══════════════════════════════════════════════════════
#  API 客户端 fixtures
# ══════════════════════════════════════════════════════

@pytest.fixture(scope="session")
def admin_client() -> BaseSession:
    """管理员客户端 —— 自动登录，可直接用相对路径如 .get('/admin/users')"""
    s = BaseSession(BASE_URL)
    token = _login(s, f"{BASE_URL}/auth/admin_login", ADMIN_ACCOUNT)
    s.headers.update({"token": token})
    return s


@pytest.fixture(scope="session")
def user_client() -> BaseSession:
    """普通用户客户端 —— 自动登录注册"""
    s = BaseSession(BASE_URL)
    _ensure_user_exists()
    token = _login(s, f"{BASE_URL}/auth/login", USER_ACCOUNT)
    s.headers.update({"token": token})
    return s


@pytest.fixture
def anon_client() -> BaseSession:
    """未登录客户端"""
    return BaseSession(BASE_URL)


# ══════════════════════════════════════════════════════
#  URL fixtures（Playwright 测试用）
# ══════════════════════════════════════════════════════

@pytest.fixture(scope="session")
def base_url() -> str:
    return BASE_URL


@pytest.fixture(scope="session")
def manager_url() -> str:
    return MANAGER_URL


# ══════════════════════════════════════════════════════
#  Playwright 浏览器 fixtures
# ══════════════════════════════════════════════════════

@pytest.fixture(scope="session")
def browser():
    pw = _get_pw()
    with pw.sync_playwright() as p:
        b = p.chromium.launch(headless=True)
        yield b
        b.close()


@pytest.fixture
def page(context):
    p = context.new_page()
    yield p
    p.close()


@pytest.fixture
def context(browser):
    ctx = browser.new_context()
    yield ctx
    ctx.close()


@pytest.fixture
def admin_page(browser):
    """管理员已登录页面"""
    ctx = browser.new_context()
    ctx.add_cookies([_make_cookie(_get_admin_token())])
    p = ctx.new_page()
    p.goto(f"{MANAGER_URL}/#/")
    yield p
    p.close()
    ctx.close()


@pytest.fixture
def user_page(browser):
    """普通用户已登录页面"""
    ctx = browser.new_context()
    ctx.add_cookies([_make_cookie(_get_user_token())])
    p = ctx.new_page()
    p.goto(f"{MANAGER_URL}/#/")
    yield p
    p.close()
    ctx.close()
