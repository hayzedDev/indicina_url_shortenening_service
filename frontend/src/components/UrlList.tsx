import React, { useEffect, useState } from 'react';

interface UrlData {
    shortUrl: string;
    longUrl: string;
    createdAt: string;
    visits: number;
}

const UrlList: React.FC = () => {
    const [urls, setUrls] = useState<UrlData[]>([]);

    useEffect(() => {
        const fetchUrls = async () => {
            const response = await fetch('/api/urls'); // Adjust the API endpoint as needed
            const data = await response.json();
            setUrls(data);
        };

        fetchUrls();
    }, []);

    return (
        <div>
            <h2>Shortened URLs</h2>
            <ul>
                {urls.map((url) => (
                    <li key={url.shortUrl}>
                        <a href={url.shortUrl} target="_blank" rel="noopener noreferrer">
                            {url.shortUrl}
                        </a>
                        <p>Long URL: {url.longUrl}</p>
                        <p>Created At: {new Date(url.createdAt).toLocaleString()}</p>
                        <p>Visits: {url.visits}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UrlList;