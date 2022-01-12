import { useState } from 'react';

export const useForceUpdate = () => {
    const [, setState] = useState<boolean>(false);
    return () => setState((val) => !val);
};
