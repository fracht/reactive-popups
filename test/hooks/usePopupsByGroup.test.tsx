import React, { useEffect } from 'react';
import { renderHook } from '@testing-library/react';

import { group, TestHookWrapper } from './TestHookWrapper';
import { usePopupsByGroup } from '../../src/hooks/usePopupsByGroup';
import { usePopupsFactory } from '../../src/hooks/usePopupsFactory';

describe('usePopupsByGroup', () => {
    it('should return popups', () => {
        const PopupComponent: React.FunctionComponent = jest.fn();

        const { result } = renderHook(
            () => {
                const create = usePopupsFactory(PopupComponent, {}, group);

                useEffect(() => {
                    for (let i = 0; i < 4; i++) {
                        create();
                    }
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                }, []);

                return usePopupsByGroup(group);
            },
            {
                wrapper: TestHookWrapper,
            }
        );

        expect(result.current.length).toBe(4);
    });
});
