"""Centralized schema definitions."""

from app.schemas.auth import UserOut
from app.schemas.word import (
    GenerateRequest,
    GenerateResponse,
    WordCreate,
    WordGenerateRequest,
    WordGenerateResult,
    WordGroupCreate,
    WordGroupOut,
    WordGroupSummary,
    WordOut,
    WordSearchResult,
    WordUpdate,
)
from app.schemas.article import (
    ArticleOut,
    ArticlePdfRequest,
    ArticleSummary,
    AudioVideoRequest,
    GenerateArticleRequest,
    GenerateArticleResponse,
    ReviewVideoRequest,
    ReviewWord,
    SaveArticleRequest,
    Sentence,
)
from app.schemas.review import (
    ExportWordOut,
    LogReviewRequest,
    ReviewStatsOut,
    ReviewWordOut,
    ReviewWordStat,
    TimePeriodStats,
    WeeklyStat,
)
from app.schemas.email import FileOut, SendEmailRequest

__all__ = [
    # Auth
    "UserOut",
    # Word
    "GenerateRequest", "GenerateResponse", "WordCreate", "WordGenerateRequest",
    "WordGenerateResult", "WordGroupCreate", "WordGroupOut", "WordGroupSummary",
    "WordOut", "WordSearchResult", "WordUpdate",
    # Article
    "ArticleOut", "ArticlePdfRequest", "ArticleSummary", "AudioVideoRequest",
    "GenerateArticleRequest", "GenerateArticleResponse", "ReviewVideoRequest",
    "ReviewWord", "SaveArticleRequest", "Sentence",
    # Review
    "ExportWordOut", "LogReviewRequest", "ReviewStatsOut", "ReviewWordOut",
    "ReviewWordStat", "TimePeriodStats", "WeeklyStat",
    # Email
    "FileOut", "SendEmailRequest",
]
