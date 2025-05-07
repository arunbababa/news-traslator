export async function fetchOriginalNews() {
    const url = import.meta.env.VITE_SUPABASE_STRAGE_URL_ORIGINAL;

    const res = await fetch(`${url}?t=${Date.now()}`, {
        cache: "no-store"
    });
    const text = await res.text();

    try {
        return JSON.parse(text);
    } catch (err) {
        console.error("💥 原文JSONパース失敗:", err);
        return [];
    }
}