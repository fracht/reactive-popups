import React, { ComponentType, FunctionComponent } from 'react';

import { PopupsRenderer } from './PopupsRenderer';

export type PopupGroup = ComponentType<{}> & {
    groupId: symbol;
};

export const createPopupGroup = (): PopupGroup => {
    const group: PopupGroup = (() => {
        return <PopupsRenderer group={group} />;
    }) as FunctionComponent<{}> as PopupGroup;

    group.groupId = Symbol();

    return group;
};
