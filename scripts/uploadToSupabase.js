// scripts/uploadToSupabase.js
import { createClient } from '@supabase/supabase-js';
import fs from 'fs/promises';
import dotenv from 'dotenv';

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const BUCKET_NAME = process.env.SUPABASE_BUCKET;

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

/**
 * 任意の JSON ファイルを Supabase Storage にアップロードする関数
 * @param {string} filename - アップロード先ファイル名（例: latest.json）
 * @param {string} localPath - ローカルのファイルパス
 */
export async function uploadToSupabase(filename, localPath) {
    const fileData = await fs.readFile(localPath);

    const { error } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filename, fileData, {
            contentType: 'application/json',
            upsert: true,
        });

    if (error) {
        throw new Error(`Supabase upload failed: ${error.message}`);
    }

    console.log(`✅ Supabase にアップロード完了: ${filename}`);
}