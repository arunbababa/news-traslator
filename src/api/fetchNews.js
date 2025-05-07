import { translateToSpanish } from "./translation";

export async function translateArticle(article) {
    const prompt = `以下の英語タイトルと本文を自然なスペイン語に翻訳してください。それぞれに「タイトル:」「本文:」を付けてください。\nタイトル: ${article.title}\n本文: ${article.description || "本文なし"}`;
    const translatedText = await translateToSpanish(prompt);

    if (!translatedText) return null;

    const titleMatch = translatedText.match(/タイトル:\s*(.+)/);
    const descriptionMatch = translatedText.match(/本文:\s*(.+)/);
    if (!titleMatch || !descriptionMatch) return null;

    return {
        title: titleMatch[1],
        description: descriptionMatch[1],
        urlToImage: article.urlToImage,
        url: article.url,
    };
}

export async function translateArticlesInBatch(articles) {
    const results = [];

    for (const article of articles) {
        try {
            const translated = await translateArticle(article);
            if (translated) results.push(translated);
        } catch (err) {
            console.warn("翻訳失敗:", err);
        }

        await new Promise(resolve => setTimeout(resolve, 20000)); // これはあくまでバックエンド側実行する際のタイムアウトなのでリアルタイムじゃないので特に関係ない、ただAPI制限一旦まぁまぁ緩くしたのでタイムアウトなしでもできるかも
    }

    return results;
}