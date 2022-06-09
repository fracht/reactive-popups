export const isPromise = (p: void | Promise<void>): p is Promise<void> =>
    typeof p === 'object' &&
    typeof p.then === 'function' &&
    typeof p.catch === 'function' &&
    typeof p.finally === 'function';
