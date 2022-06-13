import { isPromise } from '../../src/utils/isPromise';

describe('isPromise utility', () => {
    it('should identify promise', () => {
        const promise = new Promise<undefined>((res) => setTimeout(res, 2000));
        expect(isPromise(promise)).toBeTruthy();
    });

    it('should return false when value is not promise', () => {
        const a1 = {
            then: () => {
                //
            },
            catch: () => {
                //
            },
            finally: 42,
        };
        expect(isPromise(a1 as unknown as Promise<void>)).toBeFalsy();

        const a2 = [];
        expect(isPromise(a2 as unknown as Promise<void>)).toBeFalsy();
    });
});
