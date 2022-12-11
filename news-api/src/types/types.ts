import { Options } from './interfaces';

export enum Endpoints {
    SOURCES = 'sources',
    EVERYTHING = 'everything',
}

export type GetResponse = {
    endpoint: Endpoints;
    options?: Partial<Options>;
};

export type CallbackType<T> = (arg?: T) => void;

export type NullableElement<T> = T | null;
