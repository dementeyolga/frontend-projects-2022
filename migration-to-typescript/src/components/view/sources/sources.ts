import './sources.css';
import { ICategory } from '../../types/types';

class Sources {
    draw(data: ICategory[]) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp');

        data.forEach((item: ICategory) => {
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
