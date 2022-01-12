import { createContext } from 'react';

import { OmittedProps } from './types/OmittedProps';
import { PopupsContextType } from './types/PopupsContextType';

export const PopupsContext = createContext<
    PopupsContextType<OmittedProps> | undefined
>(undefined);
