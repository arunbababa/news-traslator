export async function fetchTranslatedNews() {
    const url = import.meta.env.VITE_SUPABASE_STRAGE_URL_TRANSLATED;

    const res = await fetch(url);
    const text = await res.text();

    try {
        return JSON.parse(text);
    } catch (err) {
        console.error("💥 翻訳JSONパース失敗:", err);
        return [];
    }
}