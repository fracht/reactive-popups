/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { useStockContext } from 'stocked';

import { PopupsContextProvider, PopupsRenderer, usePopup } from '../../src';
import { INITIAL_ID } from '../../src/constants';
import type { PopupsRegistry } from '../../src/types/PopupsRegistry';

const renderUsePopup = () => {
    const PopupComponent = jest.fn(() => null);

    const callback = () => {
        const { getValue, paths } = useStockContext<PopupsRegistry>();
        const [open, close] = usePopup(PopupComponent, {});

        return {
            getValue,
            paths,
            open,
            close,
        };
    };

    return renderHook(callback, {
        wrapper: ({ children }) => (
            <PopupsContextProvider>
                {children}
                <PopupsRenderer />
            </PopupsContextProvider>
        ),
    });
};

let id = INITIAL_ID - 1;

beforeEach(() => {
    id++;
});

describe('usePopup', () => {
    it('should add (on mount) and remove (on unmount) popup from registry', async () => {
        const { result, unmount } = renderUsePopup();

        expect(
            result.current.getValue(result.current.paths.popups[id])
        ).toBeDefined();

        act(() => {
            unmount();
        });

        expect(
            result.current.getValue(result.current.paths.popups[id])
        ).toBeUndefined();
    });

    it('should change popup visible state with open and close functions', () => {
        const { result } = renderUsePopup();

        expect(
            result.current.getValue(result.current.paths.popups[id].visible)
        ).toBe(false);

        act(() => {
            result.current.open();
        });

        expect(
            result.current.getValue(result.current.paths.popups[id].visible)
        ).toBe(true);

        act(() => {
            result.current.close();
        });

        expect(
            result.current.getValue(result.current.paths.popups[id].visible)
        ).toBe(false);
    });
});
