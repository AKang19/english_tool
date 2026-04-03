"""CSV export service."""

import io

from fastapi.responses import StreamingResponse
from urllib.parse import quote


def build_csv_response(
    headers: list[str],
    rows: list[list[str]],
    filename: str,
    title_line: str | None = None,
) -> tuple[StreamingResponse, bytes]:
    """Build a CSV StreamingResponse with BOM for Excel compatibility.

    Returns (response, csv_bytes).
    """
    lines = []
    if title_line:
        lines.append(f'"{title_line}"')
        lines.append("")
    lines.append(",".join(f'"{h}"' for h in headers))
    for row in rows:
        lines.append(",".join(f'"{c.replace(chr(34), chr(34)+chr(34))}"' for c in row))

    csv_content = "\ufeff" + "\n".join(lines)
    csv_bytes = csv_content.encode("utf-8")

    encoded = quote(filename)
    response = StreamingResponse(
        io.BytesIO(csv_bytes),
        media_type="text/csv; charset=utf-8",
        headers={"Content-Disposition": f"attachment; filename*=UTF-8''{encoded}"},
    )
    return response, csv_bytes
