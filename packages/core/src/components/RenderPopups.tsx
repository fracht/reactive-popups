import React, { ComponentType, PropsWithChildren } from 'react';
import { useStockValue } from 'stocked';

import { PopupProps } from '../types/PopupProps';
import { PopupsBag } from '../types/PopupsBag';

type RenderPopupsProps<P extends PopupProps> = {
    PopupsWrapper?: ComponentType<PropsWithChildren<{}>>;
} & Pick<PopupsBag<P>, 'stock'>;

export const RenderPopups = <P extends PopupProps>({
    PopupsWrapper = React.Fragment,
    stock,
}: RenderPopupsProps<P>) => {
    const popups = useStockValue(stock.paths.popups, stock);

    return popups.length > 0 ? (
        <PopupsWrapper>
            {popups.map(({ PopupComponent, props, id, visible }) => {
                return (
                    visible && (
                        <PopupComponent {...(props as P)} key={id} id={id} />
                    )
                );
            })}
        </PopupsWrapper>
    ) : null;
};
