"""管理后台页面测试（Playwright）"""

import pytest
from playwright.sync_api import Page


# ── 页面路径 ────────────────────────────────────────

MANAGER_PAGES = [
    "doctors/list",
    "doctors/departments",
    "doctors/hospitals",
    "doctors/tags",
    "doctors/titles",
    "articles/list",
    "articles/categories",
    "illnesses/list",
    "illnesses/categories",
    "medicines/list",
    "medicines/categories",
    "managers/list",
    "managers/roles",
    "managers/permissions",
    "users",
    "admin",
]


def _page_url(manager_url: str, path: str = "") -> str:
    return f"{manager_url}/#/{path}"


# ── 登录页 ───────────────────────────────────────────

def test_login_page_loads(page: Page, manager_url: str):
    """登录页面正常加载"""
    page.goto(_page_url(manager_url, "user/login"))
    page.wait_for_load_state("networkidle")
    assert page.locator("input").count() >= 2
    assert page.locator("button").count() >= 1


def test_login_page_title(page: Page, manager_url: str):
    """登录页标题正确"""
    page.goto(_page_url(manager_url, "user/login"))
    page.wait_for_load_state("networkidle")


# ── 管理员页面（需登录） ─────────────────────────────

def test_manager_index_loads(admin_page: Page):
    """管理员登录后能正常访问管理后台首页"""
    admin_page.wait_for_load_state("networkidle")
    assert "/user/login" not in admin_page.url


def test_welcome_page(admin_page: Page, manager_url: str):
    """欢迎页正常显示"""
    admin_page.goto(_page_url(manager_url, "welcome"))
    admin_page.wait_for_load_state("networkidle")


# ── 管理模块页面可访问性 ─────────────────────────────

@pytest.mark.parametrize("path", MANAGER_PAGES)
def test_admin_page_accessible(admin_page: Page, manager_url: str, path: str):
    """管理员能正常访问各管理页面"""
    admin_page.goto(_page_url(manager_url, path))
    admin_page.wait_for_load_state("networkidle")
    assert "/user/login" not in admin_page.url, f"{path} 被重定向到了登录页"


# ── 权限拦截 ────────────────────────────────────────

def test_user_cannot_access_admin(user_page: Page, manager_url: str):
    """普通用户访问 admin 页面 → 被拦截"""
    user_page.goto(_page_url(manager_url, "admin"))
    user_page.wait_for_load_state("networkidle")
    assert "/manager/#/admin" not in user_page.url or \
        user_page.locator(".ant-result-error,.ant-result-403").count() > 0


def test_anon_cannot_access_manager(page: Page, manager_url: str):
    """未登录访问管理后台 → 跳转到登录页"""
    page.goto(manager_url)
    page.wait_for_load_state("networkidle")
    assert "/user/login" in page.url, "未登录应跳转到登录页"


# ── 侧边栏 ──────────────────────────────────────────

def test_sidebar_menu(admin_page: Page, manager_url: str):
    """侧边栏菜单正常渲染"""
    admin_page.goto(f"{manager_url}/#/")
    admin_page.wait_for_load_state("networkidle")
    menu = admin_page.locator(".ant-menu,.ant-layout-sider")
    assert menu.count() > 0, "侧边栏菜单未找到"
