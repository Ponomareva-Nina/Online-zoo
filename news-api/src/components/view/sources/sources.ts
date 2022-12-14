import './sources.css';
import { SourceItem } from '../../../types/interfaces';
import { NullableElement } from '../../../types/types';

class Sources {
    scrollbar: NullableElement<HTMLInputElement>;
    currentTranslate: string;

    constructor() {
        this.scrollbar = document.querySelector('.scrollbar');
        this.currentTranslate = '0px';
    }

    private slideSources(SourcesNumber: number) {
        const sourcesTrack = document.querySelector('.sources') as HTMLElement;
        const sourceItem = document.querySelector('.source__item') as HTMLElement;
        const TranslateValue = sourcesTrack.scrollWidth / SourcesNumber;
        const visibleSourcesNum = Math.floor(sourcesTrack.offsetWidth / sourceItem.offsetWidth);
        this.scrollbar?.setAttribute('max', (SourcesNumber - visibleSourcesNum).toString());

        if (this.scrollbar) {
            let newTranslate = '';
            const previousValue = this.currentTranslate;
            newTranslate = `translateX(-${Number(this.scrollbar.value) * TranslateValue}px)`;
            const animation = [{ transform: previousValue }, { transform: newTranslate }];

            sourcesTrack.animate(animation, { duration: 500 });
            this.currentTranslate = newTranslate;
            sourcesTrack.style.transform = this.currentTranslate;
        }
    }

    public draw(data: SourceItem[]) {
        const sources = data.length >= 50 ? data.filter((_item, idx) => idx < 50) : data;
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        sources.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;

            (sourceClone.querySelector('.source__item-name') as HTMLElement).textContent = item.name;
            (sourceClone.querySelector('.source__item') as HTMLElement).setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        (document.querySelector('.sources') as HTMLElement).append(fragment);

        if (this.scrollbar) {
            this.scrollbar.addEventListener('input', () => {
                this.slideSources(sources.length);
            });
        }

        window.addEventListener('resize', () => {
            this.slideSources(sources.length);
        });
    }
}

export default Sources;
