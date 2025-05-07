export interface UrlData {
    shortUrl: string;
    longUrl: string;
    createdAt: Date;
    visits: number;
}

export interface CreateUrlRequest {
    longUrl: string;
}

export interface CreateUrlResponse {
    shortUrl: string;
}

export interface GetUrlStatisticsResponse {
    longUrl: string;
    createdAt: Date;
    visits: number;
}