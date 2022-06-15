import { isPromise } from './isPromise';

export const callIfPromiseReturned = (
    getPossiblePromise: () => void | Promise<void>,
    callback: () => void
) => {
    const possiblePromise = getPossiblePromise();

    if (isPromise(possiblePromise)) {
        possiblePromise.then(callback);
    }
};
