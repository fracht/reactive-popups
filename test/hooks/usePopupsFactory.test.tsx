import React from 'react';
import { act, renderHook, screen } from '@testing-library/react';

import { group, TestHookWrapper } from './TestHookWrapper';
import { usePopupsFactory } from '../../src/hooks/usePopupsFactory';

const SimplePopupComponent: React.FC = jest.fn(() => <div>simple popup</div>);
const PopupComponentWithProps: React.FC<{
    prop1: number;
    prop2: string;
}> = jest.fn(() => <div>popup with props</div>);

describe('usePopupsFactory', () => {
    it('should render one popup', async () => {
        const { result } = renderHook(
            () => usePopupsFactory(SimplePopupComponent, {}, group),
            {
                wrapper: TestHookWrapper,
            }
        );

        act(() => {
            result.current();
        });

        const element = await screen.findByText('simple popup');
        expect(element).toBeDefined();
    });

    it('should render multiple popups', async () => {
        const { result } = renderHook(
            () => usePopupsFactory(SimplePopupComponent, {}, group),
            {
                wrapper: TestHookWrapper,
            }
        );

        act(() => {
            result.current();
            result.current();
            result.current();
        });

        const elements = await screen.findAllByText('simple popup');
        expect(elements.length).toBe(3);
    });

    it('should merge props', () => {
        const { result } = renderHook(
            () =>
                usePopupsFactory(PopupComponentWithProps, { prop1: 42 }, group),
            {
                wrapper: TestHookWrapper,
            }
        );

        act(() => {
            result.current({ prop2: 'hello' });
        });

        expect(
            (PopupComponentWithProps as jest.Mock).mock.calls[0][0]
        ).toStrictEqual({
            prop1: 42,
            prop2: 'hello',
        });
    });
});
