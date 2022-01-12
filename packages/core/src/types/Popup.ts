import { ComponentType } from 'react';

import { OmittedProps } from './OmittedProps';

export type Popup<P extends OmittedProps> = {
    PopupComponent: ComponentType<P>;
    props: Omit<P, 'id'>;
    id: number;
};
