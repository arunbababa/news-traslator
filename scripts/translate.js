import dotenv from 'dotenv';
dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${GEMINI_API_KEY}`;

/*
 * 英語のタイトルと本文をスペイン語に翻訳する
 */
export async function translateArticle(article) {
    const prompt = `以下の英語タイトルと本文を自然なスペイン語に翻訳してください。それぞれに「タイトル:」「本文:」を付けてください。\nタイトル: ${article.title}\n本文: ${article.description || "本文なし"}`;
    const body = {
        contents: [
            {
                parts: [{ text: prompt }]
            }
        ]
    };

    try {
        const response = await fetch(GEMINI_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        const data = await response.json();

        const result = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!result) return null;

        const titleMatch = result.match(/タイトル:\s*(.+)/);
        const descriptionMatch = result.match(/本文:\s*(.+)/);

        if (!titleMatch || !descriptionMatch) return null;

        return {
            title: titleMatch[1],
            description: descriptionMatch[1],
            url: article.url,
            urlToImage: article.urlToImage
        };
    } catch (err) {
        console.error('翻訳失敗:', err);
        return null;
    }
}