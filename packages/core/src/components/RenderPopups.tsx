import React, { ComponentType, PropsWithChildren } from 'react';
import { useStockValue } from 'stocked';

import { PopupProps } from '../types/PopupProps';
import { PopupsBag } from '../types/PopupsBag';

type RenderPopupsProps<P extends PopupProps> = {
    PopupsWrapper?: ComponentType<PropsWithChildren<{}>>;
} & Pick<PopupsBag<P>, 'stock' | 'isPopupVisible'>;

export const RenderPopups = <P extends PopupProps>({
    PopupsWrapper = React.Fragment,
    stock,
    isPopupVisible,
}: RenderPopupsProps<P>) => {
    const popups = useStockValue(stock.paths.popups, stock);

    return (
        <PopupsWrapper>
            {popups
                .filter((popup) => isPopupVisible(popup.id))
                .map(({ PopupComponent, props, id }) => {
                    return (
                        <PopupComponent {...(props as P)} key={id} id={id} />
                    );
                })}
        </PopupsWrapper>
    );
};
