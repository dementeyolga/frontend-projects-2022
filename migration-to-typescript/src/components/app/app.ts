import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { INewsOutput } from '../types/types';

class App {
    private controller;
    private view;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        const sourcesBlock = document.querySelector('.sources');
        sourcesBlock &&
            sourcesBlock.addEventListener('click', (e) => {
                this.controller.getNews(e as MouseEvent, (data) => this.view.drawNews(data));
            });
        this.controller.getSources((data: INewsOutput) => this.view.drawSources(data));
    }
}

export default App;
