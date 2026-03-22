import json
import os

from openai import AsyncOpenAI

from app.schemas import GenerateRequest, WordGenerateResult

client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))

SYSTEM_PROMPT = """You are a helpful English vocabulary assistant for a Taiwanese user learning English.
For each word the user provides, generate the requested fields:
- chinese: Traditional Chinese translation (繁體中文)
- kk_phonetic: KK phonetic transcription (KK 音標), e.g. /ˈæm.bjə.ləns/
- example_sentence: A simple, practical English example sentence using this word
- mnemonic: A fun Chinese homophonic mnemonic (諧音記憶法) to help remember the English pronunciation.
  For example: ambulance → 阿不能死, engage → 演給你, arrow → 哎喲

Return a JSON array where each element has the fields: english, chinese, kk_phonetic, example_sentence, mnemonic.
Only include fields that were requested. For fields not requested, set them to null.
Always return valid JSON and nothing else."""


async def generate_words(request: GenerateRequest) -> list[WordGenerateResult]:
    words_desc = []
    for w in request.words:
        fields = []
        if w.need_chinese:
            fields.append("chinese")
        if w.need_kk:
            fields.append("kk_phonetic")
        if w.need_example:
            fields.append("example_sentence")
        if w.need_mnemonic:
            fields.append("mnemonic")
        words_desc.append({"english": w.english, "generate_fields": fields})

    user_message = json.dumps(words_desc, ensure_ascii=False)

    response = await client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_message},
        ],
        temperature=0.7,
        response_format={"type": "json_object"},
    )

    content = response.choices[0].message.content
    data = json.loads(content)

    # Handle both {"results": [...]} and direct array
    if isinstance(data, list):
        items = data
    elif isinstance(data, dict) and "results" in data:
        items = data["results"]
    elif isinstance(data, dict) and "words" in data:
        items = data["words"]
    else:
        # Try to find any list value
        for v in data.values():
            if isinstance(v, list):
                items = v
                break
        else:
            items = []

    return [WordGenerateResult(**item) for item in items]
