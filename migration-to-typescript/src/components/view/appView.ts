import News from './news/news';
import Sources from './sources/sources';
import { INewsOutput, INewsItem } from '../types/types';

export class AppView {
    private news;
    private sources;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: INewsOutput) {
        const values: INewsItem[] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: INewsOutput) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
