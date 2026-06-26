"""Backend API tests for Srikan Dewasumithra Portfolio.

Covers:
- GET /api/ root
- POST /api/contact (valid + invalid email)
- GET /api/admin/messages (auth header)
- PATCH /api/admin/messages/{id}/read
- DELETE /api/admin/messages/{id}
"""
import os
import uuid
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://srikan-projects.preview.emergentagent.com").rstrip("/")
ADMIN_KEY = "srikan-admin-2026"


@pytest.fixture(scope="session")
def admin_headers():
    return {"X-Admin-Key": ADMIN_KEY}


@pytest.fixture
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---- Root ----
class TestRoot:
    def test_root_returns_message(self, session):
        r = session.get(f"{BASE_URL}/api/")
        assert r.status_code == 200
        data = r.json()
        assert "message" in data
        assert "Portfolio" in data["message"]


# ---- Contact create ----
class TestContact:
    def test_create_contact_valid(self, session):
        payload = {
            "name": "TEST_User",
            "email": "test_user@example.com",
            "subject": "TEST subject",
            "message": "TEST message body from automated tests",
        }
        r = session.post(f"{BASE_URL}/api/contact", json=payload)
        assert r.status_code == 200, r.text
        data = r.json()
        assert data["name"] == payload["name"]
        assert data["email"] == payload["email"]
        assert data["subject"] == payload["subject"]
        assert data["message"] == payload["message"]
        assert "id" in data
        assert data["read"] is False
        # save for later
        pytest.contact_id = data["id"]

    def test_create_contact_invalid_email(self, session):
        payload = {"name": "X", "email": "not-an-email", "message": "hi"}
        r = session.post(f"{BASE_URL}/api/contact", json=payload)
        assert r.status_code == 422

    def test_create_contact_missing_fields(self, session):
        r = session.post(f"{BASE_URL}/api/contact", json={"email": "a@b.com"})
        assert r.status_code == 422


# ---- Admin auth ----
class TestAdminAuth:
    def test_list_messages_wrong_key(self, session):
        r = session.get(f"{BASE_URL}/api/admin/messages", headers={"X-Admin-Key": "bad-key"})
        assert r.status_code == 401

    def test_list_messages_no_key(self, session):
        r = session.get(f"{BASE_URL}/api/admin/messages")
        assert r.status_code == 401

    def test_list_messages_valid_key(self, session, admin_headers):
        r = session.get(f"{BASE_URL}/api/admin/messages", headers=admin_headers)
        assert r.status_code == 200
        data = r.json()
        assert isinstance(data, list)
        # Should contain at least the one we just created
        ids = [m.get("id") for m in data]
        assert getattr(pytest, "contact_id", None) in ids


# ---- Admin patch/delete ----
class TestAdminMutations:
    def test_mark_read_and_delete_flow(self, session, admin_headers):
        # Create a fresh message
        payload = {
            "name": "TEST_FlowUser",
            "email": "test_flow@example.com",
            "subject": "TEST flow",
            "message": "TEST flow body",
        }
        r = session.post(f"{BASE_URL}/api/contact", json=payload)
        assert r.status_code == 200
        msg_id = r.json()["id"]

        # PATCH read - wrong key
        r2 = session.patch(f"{BASE_URL}/api/admin/messages/{msg_id}/read", headers={"X-Admin-Key": "bad"})
        assert r2.status_code == 401

        # PATCH read - valid key
        r3 = session.patch(f"{BASE_URL}/api/admin/messages/{msg_id}/read", headers=admin_headers)
        assert r3.status_code == 200
        assert r3.json().get("ok") is True

        # Verify read=True in list
        r4 = session.get(f"{BASE_URL}/api/admin/messages", headers=admin_headers)
        assert r4.status_code == 200
        match = [m for m in r4.json() if m["id"] == msg_id]
        assert match and match[0]["read"] is True

        # DELETE - wrong key
        r5 = session.delete(f"{BASE_URL}/api/admin/messages/{msg_id}", headers={"X-Admin-Key": "bad"})
        assert r5.status_code == 401

        # DELETE - valid key
        r6 = session.delete(f"{BASE_URL}/api/admin/messages/{msg_id}", headers=admin_headers)
        assert r6.status_code == 200

        # Verify removed
        r7 = session.get(f"{BASE_URL}/api/admin/messages", headers=admin_headers)
        assert r7.status_code == 200
        assert all(m["id"] != msg_id for m in r7.json())


# ---- CV file ----
class TestCV:
    def test_cv_download_reachable(self, session):
        r = session.get(f"{BASE_URL}/cv-srikan-dewasumithra.pdf", allow_redirects=True)
        assert r.status_code == 200
        # Should be PDF or at least non-empty
        assert len(r.content) > 100


# ---- Cleanup: remove our TEST_ contact created in TestContact ----
@pytest.fixture(scope="session", autouse=True)
def cleanup_test_data():
    yield
    cid = getattr(pytest, "contact_id", None)
    if cid:
        try:
            requests.delete(f"{BASE_URL}/api/admin/messages/{cid}", headers={"X-Admin-Key": ADMIN_KEY}, timeout=10)
        except Exception:
            pass
