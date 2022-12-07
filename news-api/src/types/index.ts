export interface Request {
    apiKey: string;
    category?: string;
    language?: string;
    country?: string;
}

export interface Response {
    status: string;
    sources: Array<Article>;
}

export interface Article {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}
