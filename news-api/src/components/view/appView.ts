import { NewsInterface, SourcesInterface } from '../../types/interfaces';
import News from './news/news';
import Sources from './sources/sources';
import Footer from './footer/footer';

export class AppView {
    private news: News;
    private sources: Sources;
    private footer: Footer;

    constructor() {
        this.news = new News();
        this.sources = new Sources();
        this.footer = new Footer();
    }

    public drawNews(data: NewsInterface) {
        const values = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    public drawSources(data: SourcesInterface) {
        const values = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }

    public drawFooter() {
        this.footer.createFooter();
    }
}

export default AppView;
