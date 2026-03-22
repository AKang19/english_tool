import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

export interface WordGenerateRequest {
  english: string;
  need_chinese: boolean;
  need_kk: boolean;
  need_example: boolean;
  need_mnemonic: boolean;
}

export interface WordResult {
  key?: string;
  english: string;
  chinese: string | null;
  kk_phonetic: string | null;
  example_sentence: string | null;
  mnemonic: string | null;
}

export interface WordGroupSummary {
  id: string;
  title: string;
  saved_date: string;
  created_at: string;
  word_count: number;
}

export interface WordOut {
  id: string;
  english: string;
  chinese: string | null;
  kk_phonetic: string | null;
  mnemonic: string | null;
  example_sentence: string | null;
  sort_order: number;
}

export interface WordGroupOut {
  id: string;
  title: string;
  saved_date: string;
  created_at: string;
  words: WordOut[];
}

export async function generateWords(words: WordGenerateRequest[]): Promise<WordResult[]> {
  const res = await api.post("/generate", { words });
  return res.data.results;
}

export async function saveWordGroup(data: {
  title: string;
  saved_date: string;
  words: {
    english: string;
    chinese?: string | null;
    kk_phonetic?: string | null;
    mnemonic?: string | null;
    example_sentence?: string | null;
    sort_order: number;
  }[];
}): Promise<WordGroupOut> {
  const res = await api.post("/word-groups", data);
  return res.data;
}

export async function listWordGroups(params?: {
  title?: string;
  date_from?: string;
  date_to?: string;
}): Promise<WordGroupSummary[]> {
  const res = await api.get("/word-groups", { params });
  return res.data;
}

export async function getWordGroup(id: string): Promise<WordGroupOut> {
  const res = await api.get(`/word-groups/${id}`);
  return res.data;
}

export async function updateWord(
  wordId: string,
  data: Partial<Pick<WordOut, "english" | "chinese" | "kk_phonetic" | "mnemonic" | "example_sentence">>
): Promise<WordOut> {
  const res = await api.put(`/words/${wordId}`, data);
  return res.data;
}

export async function deleteWordGroup(id: string): Promise<void> {
  await api.delete(`/word-groups/${id}`);
}

export default api;
