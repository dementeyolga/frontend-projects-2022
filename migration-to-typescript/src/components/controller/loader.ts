import { INewsOutput, ErrorCodes, HTTPMethods, IOptions } from '../../types/types';

class Loader {
    readonly baseLink: string;
    readonly options: IOptions;

    constructor(baseLink: string, options: IOptions) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp(
        { endpoint, options = {} }: { endpoint: string; options?: IOptions },
        callback: (data: INewsOutput) => void = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load(HTTPMethods.GET, endpoint, callback, options);
    }

    public errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === ErrorCodes.Unauthorized || res.status === ErrorCodes.NotFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    public makeUrl(options: IOptions, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key): void => {
            const value: string | undefined = urlOptions[key];
            url += `${key}=${value}&`;
        });

        return url.slice(0, -1);
    }

    public load(
        method: HTTPMethods,
        endpoint: string,
        callback: (data: INewsOutput) => void,
        options: IOptions = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response) => res.json())
            .then((data: INewsOutput) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
