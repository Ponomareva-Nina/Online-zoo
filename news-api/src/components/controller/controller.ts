import { NewsItem, SourceItem } from '../../types/interfaces';
import { Endpoints } from '../../types/types';
import AppLoader from './appLoader';

class AppController extends AppLoader {
    getSources(callback: (arg?: SourceItem[]) => void) {
        super.getResp(
            {
                endpoint: Endpoints.sources,
            },
            callback
        );
    }

    getNews(e: Event, callback: (arg?: NewsItem[]) => void) {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id') as string;
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: Endpoints.everything,
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;
