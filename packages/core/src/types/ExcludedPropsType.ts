import { PopupProps } from './PopupProps';

export type ExcludedPropsType<K extends object, P extends K> = Omit<
    P,
    keyof K | keyof PopupProps
>;
