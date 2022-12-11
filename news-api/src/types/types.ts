import { Options } from './interfaces';

export enum Endpoints {
    SOURCES = 'sources',
    EVERYTHING = 'everything',
}

export enum ResponseStatuses {
    UNAUTHORIZED = 401,
    OK = 200,
    NOTFOUND = 404,
}

export type GetResponse = {
    endpoint: Endpoints;
    options?: Partial<Options>;
};

export type CallbackType<T> = (arg?: T) => void;

export type NullableElement<T> = T | null;
