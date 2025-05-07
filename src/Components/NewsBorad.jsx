import { useEffect, useState } from "react";
import { NewsItem } from "./NewsItem";
import { fetchOriginalNews } from "../api/fetchOriginalNews";
import { fetchTranslatedNews } from "../api/fetchTranslatedNews";

export const NewsBorad = () => {
    const [translatedArticles, setTranslatedArticles] = useState([]);
    const [originalArticles, setOriginalArticles] = useState([]);

    useEffect(() => {
        const fetchNews = async () => {
            const translated = await fetchTranslatedNews();
            const original = await fetchOriginalNews();
            setTranslatedArticles(translated);
            setOriginalArticles(original);
        };

        fetchNews();
    }, []);

    return (
        <div style={{ display: "flex" }}>
            {/* 左: 原文（英語） */}
            <div style={{ flex: 1, padding: "10px" }}>
                <h2 className="text-center">
                    Original <span className="badge bg-primary">English</span>
                </h2>
                {originalArticles.map((news) => (
                    <NewsItem
                        key={news.url}
                        title={news.title}
                        description={news.description}
                        src={news.urlToImage}
                        url={news.url}
                    />
                ))}
            </div>

            {/* 右: 翻訳（スペイン語） */}
            <div style={{ flex: 1, padding: "10px" }}>
                <h2 className="text-center">
                    Translated <span className="badge bg-success">Spanish</span>
                </h2>
                {translatedArticles.map((news) => (
                    <NewsItem
                        key={news.url}
                        title={news.title}
                        description={news.description}
                        src={news.urlToImage}
                        url={news.url}
                    />
                ))}
            </div>
        </div>
    );
};