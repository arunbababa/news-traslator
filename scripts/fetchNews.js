// scripts/fetchNews.js
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.NEWS_API_KEY;

export async function fetchNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'ok') {
        throw new Error('NewsAPI fetch failed: ' + JSON.stringify(data));
    }

    return data.articles;
}