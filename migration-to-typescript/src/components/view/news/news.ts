import './news.css';
import { INewsItem } from './../../types/types';

class News {
    draw(data: INewsItem[]) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLMetaElement;

        console.log('data', data);

        news.forEach((item: INewsItem, idx: number): void => {
            const newsItemContent = (newsItemTemp.content as unknown) as HTMLElement;
            const newsItemClone = newsItemContent.cloneNode(true) as HTMLElement;

            const newsItem = newsItemClone.querySelector('.news__item');
            if (idx % 2) {
                newsItem && newsItem.classList.add('alt');
            }

            const metaPhoto: HTMLDivElement = newsItemClone.querySelector('.news__meta-photo');
            metaPhoto && metaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            newsItemClone.querySelector('.news__meta-author').textContent = item.author || item.source.name;
            newsItemClone.querySelector('.news__meta-date').textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            newsItemClone.querySelector('.news__description-title').textContent = item.title;
            newsItemClone.querySelector('.news__description-source').textContent = item.source.name;
            newsItemClone.querySelector('.news__description-content').textContent = item.description;
            newsItemClone.querySelector('.news__read-more a').setAttribute('href', item.url);

            fragment.append(newsItemClone);
        });

        document.querySelector('.news').innerHTML = '';
        document.querySelector('.news').appendChild(fragment);
    }
}

export default News;
