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
        const TranslateValue = (sourcesTrack.scrollWidth - sourcesTrack.clientWidth) / SourcesNumber;
        this.scrollbar?.setAttribute('max', SourcesNumber.toString());

        if (this.scrollbar) {
            let newTranslate = '';
            const previousValue = this.currentTranslate;
            newTranslate = `translateX(-${Number(this.scrollbar.value) * TranslateValue}px)`;
            const animation = [{ transform: previousValue }, { transform: newTranslate }];

            sourcesTrack.animate(animation, { duration: 1000 });
            this.currentTranslate = newTranslate;
            sourcesTrack.style.transform = this.currentTranslate;
        }
    }

    public draw(data: SourceItem[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;

            (sourceClone.querySelector('.source__item-name') as HTMLElement).textContent = item.name;
            (sourceClone.querySelector('.source__item') as HTMLElement).setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        (document.querySelector('.sources') as HTMLElement).append(fragment);

        if (this.scrollbar) {
            this.scrollbar.addEventListener('input', () => {
                this.slideSources(data.length);
            });
        }
    }
}

export default Sources;
