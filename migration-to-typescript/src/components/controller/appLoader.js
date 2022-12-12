import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: 'a198a99f52de4edf8084d422ea4af96a', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;
