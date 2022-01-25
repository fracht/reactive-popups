import { ComponentType } from 'react';

import { ExcludedPropsType } from './ExcludedPropsType';
import { PopupProps } from './PopupProps';
import { PopupsRegistry } from './PopupsRegistry';

export type PopupsBag = {
    popups: PopupsRegistry;
    add: <K extends object, P extends K & PopupProps>(
        PopupComponent: ComponentType<P>,
        props: K
    ) => number;
    open: <K extends object, P extends K>(
        id: number,
        excludedProps?: ExcludedPropsType<K, P>
    ) => void;
    remove: (id: number) => void;
    close: (id: number) => void;
    empty: () => boolean;
};
