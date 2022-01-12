import { OmittedProps } from './OmittedProps';
import { PopupsBag } from './PopupsBag';

export type PopupsContextType<P extends OmittedProps> = Omit<
    PopupsBag<P>,
    'popups' | 'visiblePopups'
>;
