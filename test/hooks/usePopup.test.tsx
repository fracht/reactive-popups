import React from 'react';
import { act, renderHook, screen } from '@testing-library/react';

import { group, TestHookWrapper } from './TestHookWrapper';
import { useCloseHandler } from '../../src/hooks/useCloseHandler';
import { usePopup } from '../../src/hooks/usePopup';
import { PopupsContext } from '../../src/PopupsContext';
import { PopupsBag } from '../../src/types/PopupsBag';

const SimplePopupComponent: React.FC = jest.fn(() => {
    const unmount = useCloseHandler(() => {
        unmount();
    });

    return <div>simple popup</div>;
});

const CustomizablePopupComponent: React.FC<{ message: string }> = jest.fn(
    ({ message }) => <div>{message}</div>
);

type ComplexPopupComponentProps = {
    a: { value: string };
    b: string;
};

const ComplexPopupComponent: React.FC<ComplexPopupComponentProps> = ({
    a,
    b,
}) => {
    return (
        <div>
            <span>{a.value}</span>
            <span>{b}</span>
        </div>
    );
};

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

    it('should reopen popup with new props', () => {
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

    it.only('should make shallow copy on values in props when updating popup', () => {
        const initialA = {
            value: 'A',
        };

        const mount = jest.fn();
        const unmount = jest.fn();
        const close = jest.fn();
        const update = jest.fn();

        const { result, rerender } = renderHook(
            (props: ComplexPopupComponentProps) =>
                usePopup(ComplexPopupComponent, props, group),
            {
                wrapper: ({ children }) => (
                    <PopupsContext.Provider
                        value={
                            {
                                mount,
                                unmount,
                                close,
                                update,
                            } as unknown as PopupsBag
                        }
                    >
                        {children}
                    </PopupsContext.Provider>
                ),
                initialProps: {
                    a: initialA,
                    b: 'B',
                },
            }
        );

        act(() => {
            result.current[0]();
        });

        expect(mount).toBeCalled();

        rerender({
            a: initialA,
            b: 'B',
        });

        expect(update).toBeCalledTimes(0);

        rerender({
            a: initialA,
            b: 'C',
        });

        expect(update).toBeCalledTimes(1);

        rerender({
            a: initialA,
            b: 'C',
            c: 'HELLO',
        } as unknown as ComplexPopupComponentProps);

        expect(update).toBeCalledTimes(2);

        rerender({
            a: {
                value: 'A',
            },
            b: 'C',
            c: 'HELLO',
        } as unknown as ComplexPopupComponentProps);

        expect(update).toBeCalledTimes(3);
    });
});
