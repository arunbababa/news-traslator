import { fetchNews } from './fetchNews.js';
import { uploadToSupabase } from './uploadToSupabase.js';
import fs from 'fs/promises';

const OUTPUT_PATH = './scripts/output/originalNews.json';

export async function saveOriginalNews() {
    console.log('📰 英語ニュースを取得中...');
    try {
        const articles = await fetchNews('general');
        await fs.writeFile(OUTPUT_PATH, JSON.stringify(articles, null, 2));
        await uploadToSupabase('original.json', OUTPUT_PATH);
        console.log('✅ original.json を Supabase にアップロード完了！');
    } catch (err) {
        console.error('❌ 原文保存失敗:', err);
    }
}

saveOriginalNews();