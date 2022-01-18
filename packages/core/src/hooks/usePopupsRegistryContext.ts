import { useContext } from 'react';
import { Stock } from 'stocked';
import invariant from 'tiny-invariant';

import { CONTEXT_NOT_FOUND_ERROR } from '../constants';
import { PopupsRegistryContext } from '../PopupsRegistryContext';
import { PopupsRegistry } from '../types/PopupsRegistry';

export const usePopupsRegistryContext = (): Stock<PopupsRegistry> => {
    const context = useContext(PopupsRegistryContext);

    invariant(context, CONTEXT_NOT_FOUND_ERROR);

    return context;
};
