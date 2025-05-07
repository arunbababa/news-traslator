import { fetchNews } from './fetchNews.js';
import { translateArticle } from './translate.js';
import { uploadToSupabase } from './uploadToSupabase.js';
import fs from 'fs/promises';

const OUTPUT_PATH = './scripts/output/translateNews.json';

export async function saveTranslateNews() {
    console.log("🌍 ニュースを翻訳中...");
    try {
        const news = await fetchNews();
        const translated = [];

        for (const article of news) {
            const result = await translateArticle(article);
            if (result) {
                translated.push(result);
            } else {
                console.warn("⚠️ 翻訳失敗（スキップ）");
            }
            await new Promise(r => setTimeout(r, 5000)); // API制限対策
        }

        await fs.writeFile(OUTPUT_PATH, JSON.stringify(translated, null, 2), 'utf8');
        await uploadToSupabase('latest.json', OUTPUT_PATH);

        console.log("✅ 翻訳結果を Supabase にアップロード完了！");
    } catch (err) {
        console.error("❌ 翻訳保存失敗:", err);
    }
}

saveTranslateNews();