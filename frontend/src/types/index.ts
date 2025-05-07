export interface UrlData {
    shortUrl: string;
    longUrl: string;
    createdAt: Date;
    visits: number;
}

export interface UrlFormProps {
    onSubmit: (longUrl: string) => void;
}

export interface UrlListProps {
    urls: UrlData[];
}

export interface UrlStatisticsProps {
    urlData: UrlData | null;
}