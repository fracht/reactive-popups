import { ExcludedPropsType } from './ExcludedPropsType';

export type PopupController<K extends object, P extends K> = [
    open: (excludedProps?: ExcludedPropsType<K, P>) => void,
    close: () => void
];
