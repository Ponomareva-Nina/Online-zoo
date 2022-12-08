import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '50c95b2697574c248fdb1871f00d7ff7', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
