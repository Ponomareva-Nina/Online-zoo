export interface SourcesRequest {
    apiKey: string;
    category?: string;
    language?: string;
    country?: string;
}

export interface Sources {
    status: string;
    sources: Array<Source>;
}

export interface Source {
    id: string;
    name: string;
    description?: string;
    url?: string;
    category?: string;
    language?: string;
    country?: string;
}

export interface News {
    status: string;
    totalResults: number;
    articles: Array<NewsItem>;
}

export interface NewsItem {
    source: Source;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}
