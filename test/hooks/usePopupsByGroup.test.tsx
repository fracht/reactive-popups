import React from 'react';
import { fireEvent, renderHook, screen } from '@testing-library/react';

import { group, TestHookWrapper } from './TestHookWrapper';
import { usePopupsByGroup } from '../../src/hooks/usePopupsByGroup';
import { usePopupsFactory } from '../../src/hooks/usePopupsFactory';

describe('usePopupsByGroup', () => {
    it('should return popups', () => {
        const PopupComponent: React.FunctionComponent = () => <div>hello</div>;

        const TriggerComponent: React.FunctionComponent = () => {
            const create = usePopupsFactory(PopupComponent, {}, group);

            return <button onClick={create}>trigger</button>;
        };

        renderHook(() => usePopupsByGroup(group), {
            wrapper: ({ children }) => (
                <TestHookWrapper>
                    {children}
                    <TriggerComponent />
                </TestHookWrapper>
            ),
        });

        fireEvent.click(screen.getByText('trigger'));
        fireEvent.click(screen.getByText('trigger'));

        expect(screen.getAllByText('hello').length).toBe(2);
    });
});
