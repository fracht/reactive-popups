import { PopupComponent } from './PopupComponent';
import { PopupsRegistry } from './PopupsRegistry';

export type PopupsBag = {
    popups: PopupsRegistry;
    add: <P>(PopupComponent: PopupComponent<P>, props: P) => number;
    open: (id: number) => void;
    remove: (id: number) => void;
    close: (id: number) => void;
    empty: () => boolean;
};
