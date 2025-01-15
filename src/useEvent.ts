import { useCallback, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useEvent = <F extends (...args: any[]) => any>(func?: F): F => {
	const ref = useRef<F | undefined>(func);

	ref.current = func;

	const callback = useCallback((...args: Parameters<F>) => ref.current?.(...args), []);

	return callback as F;
};
