export interface ISources {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}
export interface IResponse {
    status: string;
    sources: ISources[];
}
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
