import { INewsOutput, ErrorsEnum } from '../types/types';

class Loader {
    readonly baseLink: string;
    readonly options: { [key: string]: string };

    constructor(baseLink: string, options: { [key: string]: string }) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp(
        { endpoint, options = {} }: { endpoint: string; options?: { [key: string]: string } },
        callback: (data: INewsOutput) => void = (): void => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    public errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === ErrorsEnum.Unauthorized || res.status === ErrorsEnum.NotFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    public makeUrl(options: { [key: string]: string }, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key): void => {
            const value: string | undefined = urlOptions[key];
            url += `${key}=${value}&`;
        });

        return url.slice(0, -1);
    }

    public load(
        method: string,
        endpoint: string,
        callback: (data: INewsOutput) => void,
        options: { sources?: string } = {}
    ): void {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res: Response) => res.json())
            .then((data: INewsOutput) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
