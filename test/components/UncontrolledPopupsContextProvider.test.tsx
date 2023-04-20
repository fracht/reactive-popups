import React from 'react';
import { renderHook } from '@testing-library/react';

import { UncontrolledPopupsContextProvider } from '../../src/components/UncontrolledPopupsContextProvider';
import { usePopupIdentifier } from '../../src/utils/PopupIdentifierContext';

describe('UncontrolledPopupsContextProvider', () => {
    it('should provide correct PopupIdentifierContext', () => {
        const unmount = jest.fn();

        const { result } = renderHook(() => usePopupIdentifier(), {
            wrapper: ({ children }) => (
                <UncontrolledPopupsContextProvider unmount={unmount}>
                    {children}
                </UncontrolledPopupsContextProvider>
            ),
        });

        expect(result.current).toStrictEqual({
            type: 'uncontrolled',
            unmount,
        });
    });
});
