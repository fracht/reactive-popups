import React, { useEffect } from 'react';

import { useAlert } from './Alert';

export const TestComponent = () => {
    const show = useAlert();

    useEffect(() => {
        show('hello', 'error');
    }, [show]);

    return <div>test</div>;
};
