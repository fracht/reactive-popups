import { callIfPromiseReturned } from '../../src/utils/callIfPromiseReturned';

describe('callIfPromiseReturned', () => {
    it('should not call callback when return value is not promise', () => {
        const getPossiblePromise = () => {
            return undefined;
        };

        const callback = jest.fn();

        callIfPromiseReturned(getPossiblePromise, callback);

        expect(callback).not.toBeCalled();
    });

    it('should call callback when return value is promise 1', () => {
        const getPossiblePromise = () => {
            return new Promise<void>((res) => res());
        };

        const callback = jest.fn();

        callIfPromiseReturned(getPossiblePromise, callback);

        setTimeout(() => {
            expect(callback).toBeCalled();
        });
    });

    it('should call callback when return value is promise 2', () => {
        const getPossiblePromise = async () => {
            return undefined;
        };

        const callback = jest.fn();

        callIfPromiseReturned(getPossiblePromise, callback);

        setTimeout(() => {
            expect(callback).toBeCalled();
        });
    });
});
