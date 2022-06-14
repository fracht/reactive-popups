import React, { useReducer } from 'react';
import { act, renderHook } from '@testing-library/react';

import { createPopupGroup, PopupGroup } from '../../src/components/PopupGroup';
import { DefaultPopup } from '../../src/types/DefaultPopup';
import { Popup } from '../../src/types/Popup';
import { PopupIdentifier } from '../../src/types/PopupIdentifier';
import { popupsReducer } from '../../src/utils/popupsReducer';
import { uuid } from '../../src/utils/uuid';

const group = createPopupGroup();
const getNewPopupIdentifier = (): PopupIdentifier => ({
    id: uuid(),
    groupId: group.groupId,
});

const PopupComponent: React.FC = () => {
    return <div>simple popup</div>;
};

describe('State reducer of popups', () => {
    it('should mount popup', () => {
        const { result } = renderHook(() =>
            useReducer(popupsReducer, { popups: {} })
        );

        const [state, dispatch] = result.current;

        const popupIdentifier = getNewPopupIdentifier();
        const popup = new DefaultPopup(PopupComponent, {}, popupIdentifier);

        act(() => {
            dispatch({
                type: 'mount',
                payload: {
                    popup,
                },
            });
        });

        expect(state.popups[popupIdentifier.groupId][popupIdentifier.id]).toBe(
            popup
        );
    });

    it('should unmount popup', () => {
        const { result } = renderHook(() =>
            useReducer(popupsReducer, {
                popups: {
                    [group.groupId]: {
                        0: {} as Popup<unknown>,
                        1: {} as Popup<unknown>,
                        2: {} as Popup<unknown>,
                    },
                },
            })
        );

        const [state, dispatch] = result.current;

        act(() => {
            dispatch({
                type: 'unmount',
                payload: {
                    popupIdentifier: {
                        groupId: group.groupId,
                        id: 1,
                    },
                },
            });
        });

        const popupsKeys = Object.keys(state.popups[group.groupId]);
        expect(popupsKeys.length).toBe(2);
        expect(popupsKeys.includes('1')).toBeFalsy();
    });
});
