import './sources.css';
import { ISource } from '../../types/types';

class Sources {
    public draw(data: ISource[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp');

        data.forEach((item: ISource) => {
            const sourceCloneElement = sourceItemTemp as HTMLMetaElement;
            const sourceCloneContent = (sourceCloneElement.content as unknown) as HTMLElement;
            const sourceClone = sourceCloneContent.cloneNode(true) as HTMLElement;

            const itemName = sourceClone.querySelector('.source__item-name');
            itemName && (itemName.textContent = item.name);

            const itemElement = sourceClone.querySelector('.source__item');
            itemElement && itemElement.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        const sourcesBlock = document.querySelector('.sources');
        sourcesBlock && sourcesBlock.append(fragment);
    }
}

export default Sources;
