"""Email sending service via Gmail SMTP."""

import os
import smtplib
from email import encoders
from email.mime.base import MIMEBase
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

SMTP_EMAIL = os.getenv("SMTP_EMAIL")
SMTP_APP_PASSWORD = os.getenv("SMTP_APP_PASSWORD")


def is_configured() -> bool:
    return bool(SMTP_EMAIL and SMTP_APP_PASSWORD)


def send(
    to: list[str],
    subject: str,
    html_body: str,
    text_body: str,
    attachments: list[tuple[str, bytes]] | None = None,
) -> None:
    """Send an email via Gmail SMTP.

    Args:
        to: List of recipient email addresses.
        subject: Email subject.
        html_body: HTML content.
        text_body: Plain text fallback.
        attachments: List of (filename, file_bytes) to attach.
    """
    if not SMTP_EMAIL or not SMTP_APP_PASSWORD:
        raise RuntimeError("SMTP not configured")

    msg = MIMEMultipart("mixed")
    msg["Subject"] = subject
    msg["From"] = SMTP_EMAIL
    msg["To"] = ", ".join(to)

    body = MIMEMultipart("alternative")
    body.attach(MIMEText(text_body, "plain", "utf-8"))
    body.attach(MIMEText(html_body, "html", "utf-8"))
    msg.attach(body)

    if attachments:
        for fname, fdata in attachments:
            part = MIMEBase("application", "octet-stream")
            part.set_payload(fdata)
            encoders.encode_base64(part)
            part.add_header("Content-Disposition", f"attachment; filename={fname}")
            msg.attach(part)

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(SMTP_EMAIL, SMTP_APP_PASSWORD)
        server.send_message(msg, to_addrs=to)
