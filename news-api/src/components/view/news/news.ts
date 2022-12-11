import './news.css';
import { NewsItem } from '../../../types/interfaces';
import { NullableElement } from '../../../types/types';

class News {
    public draw(data: NewsItem[]) {
        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment();

        const newsItemTemplate: NullableElement<HTMLTemplateElement> = document.querySelector('#newsItemTemp');

        if (newsItemTemplate) {
            news.forEach((item, idx) => {
                const newsClone = newsItemTemplate.content.cloneNode(true) as HTMLDivElement;

                if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');

                (newsClone.querySelector('.news__meta-photo') as HTMLElement).style.backgroundImage = `url(${
                    item.urlToImage || './assets/news-placeholder.jpg'
                })`;
                (newsClone.querySelector('.news__meta-author') as HTMLElement).textContent =
                    item.author || item.source.name;
                (newsClone.querySelector('.news__meta-date') as HTMLElement).textContent = item.publishedAt
                    .slice(0, 10)
                    .split('-')
                    .reverse()
                    .join('-');

                const descriptionTitle: NullableElement<HTMLDivElement> = newsClone.querySelector(
                    '.news__description-title'
                );
                if (descriptionTitle) {
                    descriptionTitle.textContent = item.title;
                }

                (newsClone.querySelector('.news__description-source') as HTMLElement).textContent = item.source.name;
                (newsClone.querySelector('.news__description-content') as HTMLElement).textContent = item.description;
                (newsClone.querySelector('.news__read-more a') as HTMLElement).setAttribute('href', item.url);

                fragment.append(newsClone);
            });
        }

        (document.querySelector('.news') as HTMLElement).innerHTML = '';
        (document.querySelector('.news') as HTMLElement).appendChild(fragment);
    }
}

export default News;
