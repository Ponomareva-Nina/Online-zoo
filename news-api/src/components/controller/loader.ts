import { NewsInterface, SourcesInterface, Options } from '../../types/interfaces';
import { Endpoints, GetResponse } from '../../types/types';

class Loader {
    private baseLink: string;
    private options: Partial<Options>;

    constructor(baseLink: string, options: Partial<Options>) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp(
        { endpoint, options = {} }: GetResponse,
        callback = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load('GET', endpoint, callback, options);
    }

    private errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }
        return res;
    }

    private makeUrl(options: Partial<Options>, endpoint: Endpoints) {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key as keyof Options]}&`;
        });

        return url.slice(0, -1);
    }

    public load(
        method: string,
        endpoint: Endpoints,
        callback: (data: NewsInterface | SourcesInterface) => void,
        options = {}
    ) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json() as Promise<NewsInterface | SourcesInterface>)
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
