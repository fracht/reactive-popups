import { ReactElement } from 'react';

import { PopupIdentifierProvider } from './PopupIdentifierContext';
import { Popup } from '../types/Popup';

export const renderPopups = (popups: Popup<object>[]): ReactElement[] =>
	popups.map(({ PopupComponent, props, popupIdentifier }) => (
		<PopupIdentifierProvider key={popupIdentifier.id} popupIdentifier={popupIdentifier}>
			<PopupComponent {...(props as object)} />
		</PopupIdentifierProvider>
	));
