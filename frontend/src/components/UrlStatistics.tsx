import React, { useEffect, useState } from 'react';

interface UrlStatisticsProps {
    shortUrl: string;
}

interface UrlData {
    longUrl: string;
    createdAt: string;
    visits: number;
}

const UrlStatistics: React.FC<UrlStatisticsProps> = ({ shortUrl }) => {
    const [urlData, setUrlData] = useState<UrlData | null>(null);

    useEffect(() => {
        const fetchUrlStatistics = async () => {
            try {
                const response = await fetch(`/api/urls/${shortUrl}/statistics`);
                if (response.ok) {
                    const data = await response.json();
                    setUrlData(data);
                } else {
                    console.error('Failed to fetch URL statistics');
                }
            } catch (error) {
                console.error('Error fetching URL statistics:', error);
            }
        };

        fetchUrlStatistics();
    }, [shortUrl]);

    if (!urlData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Statistics for {shortUrl}</h2>
            <p>Long URL: {urlData.longUrl}</p>
            <p>Created At: {new Date(urlData.createdAt).toLocaleString()}</p>
            <p>Visits: {urlData.visits}</p>
        </div>
    );
};

export default UrlStatistics;