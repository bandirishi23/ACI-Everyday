import logging
from uuid import UUID
from sqlalchemy.orm import Session

from aci.common.db import crud
from aci.common.enums import OrganizationRole
from aci.common.exceptions import OrgAccessDenied, ProjectNotFound

logger = logging.getLogger(__name__)

# ─── Mock Classes ───────────────────────────────────────────────

class MockOrg:
    def user_is_role(self, role):
        return True  # Always allow access

class MockUser:
    def __init__(self):
        self.user_id= "e50870d2-9dcd-44fe-a273-1b9cc1e982de",
        self.email= "testuser@aipolabs.xyz",
        self.email_confirmed = True,
        self.has_password=False,
        self.first_name = "Test",
        self.last_name= "User",
        self.picture_url= "",
        self.properties= {},
        self.metadata= None,
        self.locked= False,
        self.enabled= True,
        self.mfa_enabled = False,
        self.can_create_orgs = False,
        self.created_at= 1746268241,
        self.last_active_at= 1746272886,
        self.update_password_required= False,


    def get_org(self, org_id: str):
        return MockOrg()

class MockFastAPIAuth:
    def require_user(self):
        def _dependency():
            return MockUser()
        return _dependency

    def require_org_member(self, user, org_id):
        pass  # No-op

    def require_org_member_with_minimum_role(self, user, org_id, role):
        pass  # No-op

# ─── Inject mock auth instance ──────────────────────────────────

_auth = MockFastAPIAuth()

def get_propelauth():
    return _auth

# ─── Missing ACL Functions (now added back) ─────────────────────

def validate_user_access_to_org(user: MockUser, org_id: UUID, org_role: OrganizationRole) -> None:
    # In mock mode, allow all
    org = user.get_org(str(org_id))
    if (org is None) or (org.user_is_role(org_role) is False):
        raise OrgAccessDenied(
            f"user={user.user_id} does not have access to org={org_id} or "
            f"does not have the required role={org_role} in the org"
        )

def validate_user_access_to_project(db_session: Session, user: MockUser, project_id: UUID) -> None:
    project = crud.projects.get_project(db_session, project_id)
    if not project:
        raise ProjectNotFound(f"project={project_id} not found")
    validate_user_access_to_org(user, project.org_id, OrganizationRole.OWNER)

def require_org_member(user: MockUser, org_id: UUID) -> None:
    get_propelauth().require_org_member(user, str(org_id))

def require_org_member_with_minimum_role(user: MockUser, org_id: UUID, minimum_role: OrganizationRole) -> None:
    get_propelauth().require_org_member_with_minimum_role(user, str(org_id), minimum_role)