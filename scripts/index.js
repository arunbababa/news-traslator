// scripts/index.js
import { saveOriginalNews } from './saveOriginal.js';
import { saveTranslateNews } from './saveTranslateNews.js';
import dotenv from 'dotenv';
dotenv.config();

async function main() {
    try {
        await saveTranslateNews();
        await saveOriginalNews();
        console.log('🎉 全ての処理が正常に完了しました！');
    } catch (err) {
        console.error('❌ 全体処理でエラー:', err);
    }
}

main();