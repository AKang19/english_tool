from pydantic import BaseModel


class FileOut(BaseModel):
    id: str
    filename: str
    file_type: str
    created_at: str

    model_config = {"from_attributes": True}


class SendEmailRequest(BaseModel):
    to: str
    subject: str = ""
    group_ids: list[str] = []
    article_ids: list[str] = []
    file_ids: list[str] = []
    custom_text: str = ""
