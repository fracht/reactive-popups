import { useContext } from 'react';
import invariant from 'tiny-invariant';

import { PopupsContext } from '../PopupsContext';
import { PopupsContextType } from '../types/PopupsContextType';

export const usePopupsContext = (): PopupsContextType => {
    const context = useContext(PopupsContext);

    invariant(
        context,
        'PopupsContext was not found. Please, wrap your application with PopupsContextProvider.'
    );

    return context;
};
