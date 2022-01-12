import { createContext } from 'react';

import { PopupsContextType } from './types/PopupsContextType';

export const PopupsContext = createContext<PopupsContextType | undefined>(
    undefined
);
