import React from 'react';
import { act, renderHook, screen } from '@testing-library/react';

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
        const initialProps = {};
        const { result } = renderHook(
            () => usePopup(SimplePopupComponent, initialProps, group),
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
        const initialProps = {};
        const { result } = renderHook(
            () => usePopup(SimplePopupComponent, initialProps, group),
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

    it('should reopen popup with new props', () => {
        const initialMessage = 'initial message';
        const updatedMessage = 'updated message';

        const initialProps = {};
        const { result } = renderHook(
            () => usePopup(CustomizablePopupComponent, initialProps, group),
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
        const initialProps = { prop1: 42 };
        const { result } = renderHook(
            () => usePopup(PopupComponentWithProps, initialProps, group),
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

    it('should update popup when props changing', () => {
        const { result, rerender } = renderHook(
            (props: { message: string }) =>
                usePopup(CustomizablePopupComponent, props, group),
            {
                wrapper: TestHookWrapper,
                initialProps: {
                    message: 'initial',
                },
            }
        );

        act(() => {
            result.current[0]();
        });

        expect(screen.getByText('initial')).toBeDefined();

        rerender({
            message: 'updated',
        });

        expect(screen.getByText('updated')).toBeDefined();
    });
});
