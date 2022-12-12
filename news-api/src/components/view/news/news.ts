import './news.css';
import { NewsItem } from '../../../types/interfaces';
import { NullableElement } from '../../../types/types';
import placeholder from '../../../assets/news-placeholder.jpg';

class News {
    newsContainer: NullableElement<HTMLElement>;

    constructor() {
        this.newsContainer = document.querySelector('.news');
    }

    private createPlaceholder() {
        if (this.newsContainer) {
            this.newsContainer.innerHTML = 'Sorry, this channel have no news for today!';
        }
    }

    public draw(data: NewsItem[]) {
        if (data.length === 0) {
            this.createPlaceholder();
            return;
        }

        const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;
        const fragment = document.createDocumentFragment();
        const newsItemTemplate: NullableElement<HTMLTemplateElement> = document.querySelector('#newsItemTemp');

        if (newsItemTemplate) {
            news.forEach((item, idx) => {
                const newsClone = newsItemTemplate.content.cloneNode(true) as HTMLDivElement;

                if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');

                (newsClone.querySelector('.news__meta-photo') as HTMLElement).style.backgroundImage = `url(${
                    item.urlToImage || placeholder
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
        if (this.newsContainer) {
            this.newsContainer.innerHTML = '';
            this.newsContainer.appendChild(fragment);
        }
    }
}

export default News;
