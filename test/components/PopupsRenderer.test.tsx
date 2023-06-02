import React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { createPopupGroup, PopupGroup } from '../../src/components/PopupGroup';
import { PopupsContextProvider } from '../../src/components/PopupsContextProvider';
import { PopupsRenderer } from '../../src/components/PopupsRenderer';
import { usePopupsFactory } from '../../src/hooks/usePopupsFactory';

const PopupComponent = () => {
    return <div>This is simple popup</div>;
};

const App = ({ group }: { group: PopupGroup }) => {
    const create = usePopupsFactory(PopupComponent, {}, group);

    return <button onClick={() => create()}>open</button>;
};

describe('PopupsRenderer', () => {
    it('should render one popup', async () => {
        const group = createPopupGroup();

        const { getByRole, getByText } = render(
            <PopupsContextProvider>
                <PopupsRenderer group={group} />
                <App group={group} />
            </PopupsContextProvider>
        );

        fireEvent.click(getByRole('button'));

        expect(getByText('This is simple popup')).toBeDefined();
    });

    it('should render multiple popups', () => {
        const group = createPopupGroup();

        const { getByRole, getAllByText } = render(
            <PopupsContextProvider>
                <PopupsRenderer group={group} />
                <App group={group} />
            </PopupsContextProvider>
        );

        fireEvent.click(getByRole('button'));
        fireEvent.click(getByRole('button'));
        fireEvent.click(getByRole('button'));

        expect(getAllByText('This is simple popup').length).toBe(3);
    });
});
