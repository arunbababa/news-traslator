// src/api/translation.js
export async function translateToSpanish(text) {
    const body = {
        contents: [
            {
                parts: [
                    {
                        text: `以下の英語タイトルと本文を自然なスペイン語に翻訳してください:\n${text}`
                    }
                ]
            }
        ]
    };

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            }
        );
        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
    } catch (error) {
        console.error("翻訳失敗:", error);
        return null;
    }
}