import { createContext } from 'react';

import { PopupProps } from './types/PopupProps';
import { PopupsContextType } from './types/PopupsContextType';

export const PopupsContext = createContext<
    PopupsContextType<PopupProps> | undefined
>(undefined);
