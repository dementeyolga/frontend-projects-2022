import './news.css';
import { INewsItem } from '../../../types/types';

class News {
    public draw(data: INewsItem[]): void {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

        news.forEach((item: INewsItem, idx: number): void => {
            const newsItemContent = newsItemTemp.content;

            const newsItemClone = newsItemContent.cloneNode(true) as HTMLDivElement;

            const newsItem = newsItemClone.querySelector('.news__item') as HTMLDivElement;

            if (idx % 2) {
                newsItem.classList.add('alt');
            }

            const metaPhoto = newsItemClone.querySelector('.news__meta-photo') as HTMLDivElement;
            metaPhoto.style.backgroundImage = `url(${item.urlToImage || '../../../assets/placeholder-img.jpg'})`;

            const metaAuthor = newsItemClone.querySelector('.news__meta-author') as HTMLDivElement;
            metaAuthor.textContent = item.author || item.source.name;

            const metaData = newsItemClone.querySelector('.news__meta-date') as HTMLDivElement;
            metaData.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

            const newsDescriptionTitle = newsItemClone.querySelector('.news__description-title') as HTMLDivElement;
            newsDescriptionTitle.textContent = item.title;

            const newsDescriptionSource = newsItemClone.querySelector('.news__description-source') as HTMLDivElement;
            newsDescriptionSource.textContent = item.source.name;

            const newsDescriptionContent = newsItemClone.querySelector('.news__description-content') as HTMLDivElement;
            newsDescriptionContent.textContent = item.description;

            const newsReadMoreLink = newsItemClone.querySelector('.news__read-more a') as HTMLDivElement;
            newsReadMoreLink.setAttribute('href', item.url);

            fragment.append(newsItemClone);
        });

        const newsBlock = document.querySelector('.news') as HTMLDivElement;
        newsBlock.innerHTML = '';
        newsBlock.appendChild(fragment);
    }
}

export default News;
