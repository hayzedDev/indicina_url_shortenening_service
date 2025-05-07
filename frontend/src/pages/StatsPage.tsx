import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StatsPage: React.FC = () => {
    const [urlStats, setUrlStats] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUrlStatistics = async () => {
            try {
                const response = await axios.get('/api/urls/stats'); // Adjust the endpoint as necessary
                setUrlStats(response.data);
            } catch (err) {
                setError('Failed to fetch URL statistics');
            } finally {
                setLoading(false);
            }
        };

        fetchUrlStatistics();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>URL Statistics</h1>
            <ul>
                {urlStats.map((stat) => (
                    <li key={stat.shortUrl}>
                        <strong>Short URL:</strong> {stat.shortUrl} <br />
                        <strong>Long URL:</strong> {stat.longUrl} <br />
                        <strong>Created At:</strong> {new Date(stat.createdAt).toLocaleString()} <br />
                        <strong>Visits:</strong> {stat.visits}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StatsPage;