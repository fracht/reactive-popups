import { useContext } from 'react';
import { Stock } from 'stocked';
import invariant from 'tiny-invariant';

import { PopupsRegistryContext } from '../PopupsRegistryContext';
import { PopupsRegistry } from '../types/PopupsRegistry';

export const usePopupsRegistryContext = (): Stock<PopupsRegistry> => {
    const context = useContext(PopupsRegistryContext);

    invariant(
        context,
        'PopupsContext was not found. Please, wrap your application with PopupsContextProvider.'
    );

    return context;
};
