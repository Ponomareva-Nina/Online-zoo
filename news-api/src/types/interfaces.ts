import { Endpoints } from './types';
export interface SourcesInterface {
    status: string;
    sources: Array<SourceItem>;
}

export interface SourceItem {
    id: string;
    name: string;
    description?: string;
    url?: string;
    category?: string;
    language?: string;
    country?: string;
}

export interface NewsInterface {
    status: string;
    totalResults: number;
    articles: Array<NewsItem>;
}

export interface NewsItem {
    source: SourceItem;
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}
export interface Options {
    readonly apiKey: string;
    endpoint: Endpoints;
    sources: string;
    searchIn: string;
    domains: string;
    excludeDomains: string;
    from: string;
    to: string;
    language: string;
    sortBy: string;
    pageSize: number;
    page: number;
}
