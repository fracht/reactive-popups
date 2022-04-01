import { createContext } from 'react';

import { PopupsBag } from './types/PopupsBag';

export const PopupsContext = createContext<PopupsBag | undefined>(undefined);
