export enum Endpoints {
    sources = 'sources',
    everything = 'everything',
}

export type GetResponse = {
    endpoint: Endpoints;
    options?: Partial<Options>;
};

export type Options = {
    apiKey: string;
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
};
