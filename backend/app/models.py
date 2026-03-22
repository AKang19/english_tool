import datetime
import uuid

from sqlalchemy import DateTime, ForeignKey, Integer, String, Text, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship


class Base(DeclarativeBase):
    pass


class WordGroup(Base):
    __tablename__ = "word_groups"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    saved_date: Mapped[str] = mapped_column(String(32), nullable=False)  # user-chosen date
    created_at: Mapped[datetime.datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime.datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    words: Mapped[list["Word"]] = relationship("Word", back_populates="group", cascade="all, delete-orphan", order_by="Word.sort_order")


class Word(Base):
    __tablename__ = "words"

    id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    group_id: Mapped[uuid.UUID] = mapped_column(UUID(as_uuid=True), ForeignKey("word_groups.id", ondelete="CASCADE"), nullable=False)
    english: Mapped[str] = mapped_column(String(255), nullable=False)
    chinese: Mapped[str | None] = mapped_column(String(255), nullable=True)
    kk_phonetic: Mapped[str | None] = mapped_column(String(255), nullable=True)
    mnemonic: Mapped[str | None] = mapped_column(Text, nullable=True)
    example_sentence: Mapped[str | None] = mapped_column(Text, nullable=True)
    sort_order: Mapped[int] = mapped_column(Integer, default=0)
    created_at: Mapped[datetime.datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at: Mapped[datetime.datetime] = mapped_column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    group: Mapped["WordGroup"] = relationship("WordGroup", back_populates="words")
