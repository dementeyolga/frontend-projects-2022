import './sources.css';
import { ISource } from '../../../types/types';

class Sources {
    public draw(data: ISource[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        data.forEach((item: ISource): void => {
            const sourceCloneElement = sourceItemTemp;
            const sourceCloneContent = sourceCloneElement.content;
            const sourceClone = sourceCloneContent.cloneNode(true) as HTMLElement;

            const itemName = sourceClone.querySelector('.source__item-name') as HTMLSpanElement;
            itemName.textContent = item.name;

            const itemElement = sourceClone.querySelector('.source__item') as HTMLDivElement;
            itemElement.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        const sourcesBlock = document.querySelector('.sources') as HTMLDivElement;
        sourcesBlock.append(fragment);
    }
}

export default Sources;
