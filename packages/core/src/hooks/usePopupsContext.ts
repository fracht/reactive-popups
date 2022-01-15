import { useContext } from 'react';
import invariant from 'tiny-invariant';

import { CONTEXT_NOT_FOUND_ERROR } from '../constants';
import { PopupsContext } from '../PopupsContext';
import { PopupsBag } from '../types/PopupsBag';

export const usePopupsContext = (): PopupsBag => {
    const context = useContext(PopupsContext);

    invariant(context, CONTEXT_NOT_FOUND_ERROR);

    return context;
};
