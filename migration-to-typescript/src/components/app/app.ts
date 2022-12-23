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

    public start(): void {
        const sourcesBlock: HTMLElement | null = document.querySelector('.sources');
        if (sourcesBlock instanceof HTMLDivElement) {
            sourcesBlock.addEventListener('click', (e: Event) => {
                this.controller.getNews(e as MouseEvent, (data) => this.view.drawNews(data));
            });
        }

        this.controller.getSources((data: INewsOutput) => this.view.drawSources(data));
    }
}

export default App;
