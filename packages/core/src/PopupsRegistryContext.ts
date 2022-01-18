import { createContext } from 'react';
import { Stock } from 'stocked';

import { PopupsRegistry } from './types/PopupsRegistry';

export const PopupsRegistryContext = createContext<
    Stock<PopupsRegistry> | undefined
>(undefined);
