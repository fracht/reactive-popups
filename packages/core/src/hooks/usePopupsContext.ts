import { useContext } from 'react';
import invariant from 'tiny-invariant';

import { PopupsContext } from '../PopupsContext';
import { OmittedProps } from '../types/OmittedProps';
import { PopupsContextType } from '../types/PopupsContextType';

export const usePopupsContext = <
    P extends OmittedProps = OmittedProps
>(): PopupsContextType<P> => {
    const context = useContext(PopupsContext);

    invariant(
        context,
        'PopupsContext was not found. Please, wrap your application with PopupsContextProvider.'
    );

    return context as PopupsContextType<P>;
};
