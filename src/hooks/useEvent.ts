import { useCallback, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useEvent = <F extends (...arguments_: any[]) => any>(function_?: F): F => {
	const reference = useRef<F | undefined>(function_);

	reference.current = function_;

	const callback = useCallback((...arguments_: Parameters<F>) => reference.current?.(...arguments_), []);

	return callback as F;
};
