import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://nodenews.up.railway.app/', {
            apiKey: 'a198a99f52de4edf8084d422ea4af96a', // News API key
        });
    }
}

export default AppLoader;
