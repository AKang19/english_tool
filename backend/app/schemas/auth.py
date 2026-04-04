from __future__ import annotations

import uuid

from pydantic import BaseModel


class UserOut(BaseModel):
    id: uuid.UUID
    email: str
    name: str
    picture: str | None = None

    model_config = {"from_attributes": True}
