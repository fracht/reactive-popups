import React from 'react';
import { renderHook } from '@testing-library/react';

import { UncontrolledPopupsContextProvider } from '../../src/components/UncontrolledPopupsContextProvider';
import { useCloseHandler } from '../../src/hooks/useCloseHandler';

describe('useCloseHandler', () => {
    it('should return unmount function that calls unmount from PopupIdentifierContext (uncontrolled case)', () => {
        const unmount = jest.fn();

        const { result } = renderHook(() => useCloseHandler(), {
            wrapper: ({ children }) => (
                <UncontrolledPopupsContextProvider unmount={unmount}>
                    {children}
                </UncontrolledPopupsContextProvider>
            ),
        });

        // Call unmount
        result.current();

        expect(unmount).toBeCalledTimes(1);
    });
});
