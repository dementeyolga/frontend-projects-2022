export interface INewsItem {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: { id: string; name: string };
    id: string;
    name: string;
    title: string;
    url: string;
    urlToImage: string;
}

export interface ISource {
    category: string;
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    url: string;
}

export interface INewsOutput {
    status: string;
    articles?: INewsItem[];
    totalResults: number;
    sources?: ISource[];
}

export interface ISources {
    status: string;
    sources: ISource[];
}

export interface IOptions {
    [key: string]: string;
}

export type IDataCallback = (data: { [key: string]: string }) => void;

export type IResponseCallback = (data: Response) => void;
