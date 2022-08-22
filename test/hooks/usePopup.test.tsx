import React from 'react';
import { act, render, renderHook, screen } from '@testing-library/react';

import { group, TestHookWrapper } from './TestHookWrapper';
import { useCloseHandler } from '../../src/hooks/useCloseHandler';
import { usePopup } from '../../src/hooks/usePopup';

const SimplePopupComponent: React.FC = jest.fn(() => {
    const unmount = useCloseHandler(() => {
        unmount();
    });

    return <div>simple popup</div>;
});

const CustomizablePopupComponent: React.FC<{ message: string }> = jest.fn(
    ({ message }) => <div>{message}</div>
);

const PopupComponentWithProps: React.FC<{
    prop1: number;
    prop2: string;
}> = jest.fn(() => <div>popup with props</div>);

describe('usePopup', () => {
    it('should render only one popup', () => {
        const { result } = renderHook(
            () => usePopup(SimplePopupComponent, {}, group),
            {
                wrapper: TestHookWrapper,
            }
        );

        act(() => {
            result.current[0]();
        });

        expect(screen.getByText('simple popup')).toBeDefined();

        act(() => {
            result.current[0]();
        });

        expect(screen.getAllByText('simple popup').length).toBe(1);
    });

    it('should close popup', () => {
        const { result } = renderHook(
            () => usePopup(SimplePopupComponent, {}, group),
            {
                wrapper: TestHookWrapper,
            }
        );

        act(() => {
            result.current[0]();
        });

        expect(screen.getByText('simple popup')).toBeDefined();

        act(() => {
            result.current[1]();
        });

        expect(() => screen.getByText('simple popup')).toThrow();
    });

    it('should update popup', () => {
        const initialMessage = 'initial message';
        const updatedMessage = 'updated message';

        const { result } = renderHook(
            () => usePopup(CustomizablePopupComponent, {}, group),
            { wrapper: TestHookWrapper }
        );

        act(() => {
            result.current[0]({ message: initialMessage });
        });

        expect(screen.getByText(initialMessage)).toBeDefined();

        act(() => {
            result.current[0]({ message: updatedMessage });
        });

        expect(screen.queryByText(initialMessage)).toBeNull();

        expect(screen.getByText(updatedMessage)).toBeDefined();
    });

    it('should merge props', () => {
        const { result } = renderHook(
            () => usePopup(PopupComponentWithProps, { prop1: 42 }, group),
            {
                wrapper: TestHookWrapper,
            }
        );

        act(() => {
            result.current[0]({ prop2: 'hello' });
        });

        expect(
            (PopupComponentWithProps as jest.Mock).mock.calls[0][0]
        ).toStrictEqual({
            prop1: 42,
            prop2: 'hello',
        });
    });
});
