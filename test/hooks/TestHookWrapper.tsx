import React from 'react';
import { PropsWithChildren } from 'react';

import { createPopupGroup } from '../../src/components/PopupGroup';
import { PopupsContextProvider } from '../../src/components/PopupsContextProvider';
import { PopupsRenderer } from '../../src/components/PopupsRenderer';

export const group = createPopupGroup();

export const TestHookWrapper = ({ children }: PropsWithChildren<{}>) => (
    <PopupsContextProvider>
        {children}
        <PopupsRenderer group={group} />
    </PopupsContextProvider>
);
