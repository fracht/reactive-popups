import React, { useEffect } from 'react';

import { useAlert } from './Alert';

export const TestComponent = () => {
    const show = useAlert();

    useEffect(() => {
        show('Show this message on mount!', 'success');
    }, [show]);

    return <div>test</div>;
};
