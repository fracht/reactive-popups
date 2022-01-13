import { useContext } from 'react';
import invariant from 'tiny-invariant';

import { PopupsContext } from '../PopupsContext';
import { PopupProps } from '../types/PopupProps';
import { PopupsContextType } from '../types/PopupsContextType';

export const usePopupsContext = <
    P extends PopupProps = PopupProps
>(): PopupsContextType<P> => {
    const context = useContext(PopupsContext);

    invariant(
        context,
        'PopupsContext was not found. Please, wrap your application with PopupsContextProvider.'
    );

    return context as PopupsContextType<P>;
};
