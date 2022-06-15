import React from 'react';
import { act, renderHook, screen } from '@testing-library/react';

import { group, TestHookWrapper } from './TestHookWrapper';
import { useResponsePopup } from '../../src/hooks/useResponsePopup';
import { isPromise } from '../../src/utils/isPromise';

const ConfirmPopup: React.FC = jest.fn(() => <div>Confirm popup</div>);

const ConfirmPopupWithProps: React.FC<{ message: string; variant: string }> =
    jest.fn(() => <div>Confirm popup</div>);

describe('useResponsePopup', () => {
    it('should return promise function', () => {
        const { result } = renderHook(
            () => useResponsePopup(ConfirmPopup, {}, group),
            {
                wrapper: TestHookWrapper,
            }
        );

        act(() => {
            expect(isPromise(result.current() as unknown as void)).toBeTruthy();
        });
    });

    it('should render popup', async () => {
        const { result } = renderHook(
            () => useResponsePopup(ConfirmPopup, {}, group),
            {
                wrapper: TestHookWrapper,
            }
        );

        act(() => {
            result.current();
        });

        const element = await screen.getByText('Confirm popup');
        expect(element).toBeDefined();
    });

    it('should merge props', () => {
        const { result } = renderHook(
            () =>
                useResponsePopup(
                    ConfirmPopupWithProps,
                    { message: 'hello' },
                    group
                ),
            {
                wrapper: TestHookWrapper,
            }
        );

        act(() => {
            result.current({ variant: 'info' });
        });

        expect(
            (ConfirmPopupWithProps as jest.Mock).mock.calls[0][0]
        ).toStrictEqual({
            message: 'hello',
            variant: 'info',
        });
    });
});
