import './news.css';
import { INewsItem } from '../../types/types';

class News {
    draw(data: INewsItem[]) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLMetaElement;

        news.forEach((item: INewsItem, idx: number): void => {
            const newsItemContent = (newsItemTemp.content as unknown) as HTMLElement;
            const newsItemClone = newsItemContent.cloneNode(true) as HTMLElement;

            const newsItem = newsItemClone.querySelector('.news__item');
            if (idx % 2) {
                newsItem && newsItem.classList.add('alt');
            }

            const metaPhoto = newsItemClone.querySelector('.news__meta-photo') as HTMLDivElement;
            metaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;

            const metaAuthor = newsItemClone.querySelector('.news__meta-author');
            metaAuthor && (metaAuthor.textContent = item.author || item.source.name);

            const metaData = newsItemClone.querySelector('.news__meta-date');
            metaData && (metaData.textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-'));

            const newsDescriptionTitle = newsItemClone.querySelector('.news__description-title');
            newsDescriptionTitle && (newsDescriptionTitle.textContent = item.title);

            const newsDescriptionSource = newsItemClone.querySelector('.news__description-source');
            newsDescriptionSource && (newsDescriptionSource.textContent = item.source.name);

            const newsDescriptionContent = newsItemClone.querySelector('.news__description-content');
            newsDescriptionContent && (newsDescriptionContent.textContent = item.description);

            const newsReadMoreLink = newsItemClone.querySelector('.news__read-more a');
            newsReadMoreLink && newsReadMoreLink.setAttribute('href', item.url);

            fragment.append(newsItemClone);
        });

        const newsBlock = document.querySelector('.news');
        if (newsBlock) {
            newsBlock.innerHTML = '';
            newsBlock.appendChild(fragment);
        }
    }
}

export default News;
