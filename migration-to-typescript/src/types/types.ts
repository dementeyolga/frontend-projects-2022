// Interfaces

export interface ISource {
    category: string;
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    url: string;
}

export type ISourceMainInfo = Pick<ISource, 'id' | 'name'>;

export interface INewsItem {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: ISourceMainInfo;
    id: string;
    name: string;
    title: string;
    url: string;
    urlToImage: string;
}

export interface INewsOutput {
    status: string;
    articles: INewsItem[];
    totalResults: number;
    sources: ISource[];
}

export interface IOptions {
    [key: string]: string;
}

export type IDataCallback = (data: { [key: string]: string }) => void;

export type IResponseCallback = (data: Response) => void;

// Enums

export enum ErrorCodes {
    Unauthorized = 401,
    NotFound = 404,
}

export enum HTTPMethods {
    GET = 'GET',
    POST = 'POST',
    HEAD = 'HEAD',
    PUT = 'PUT',
    CONNECT = 'CONNECT',
    OPTIONS = 'OPTIONS',
    TRACE = 'TRACE',
    PATCH = 'PATCH',
}
