import { useContext } from 'react';
import invariant from 'tiny-invariant';

import { PopupsContext } from '../PopupsContext';
import { PopupsBag } from '../types/PopupsBag';

export const usePopupsContext = (): PopupsBag => {
    const context = useContext(PopupsContext);

    invariant(
        context,
        'PopupsContext was not found. Please, wrap your application with PopupsContextProvider.'
    );

    return context;
};
