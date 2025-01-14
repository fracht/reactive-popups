import React, { type ComponentType, useCallback, useEffect, useRef } from 'react';
import { useSafeContext } from '@sirse-dev/safe-context';
import { nanoid } from 'nanoid/non-secure';
import shallowEqual from 'shallowequal';

import { useIdentifier } from './IdentifierContext';
import { createPopupGroup, type PopupGroup } from './PopupGroup';
import { type Popup, type PopupIdentifier, PopupsContext, type PopupsState } from './PopupsContext';
import { useEvent } from './useEvent';

export type OptionalParamFunction<
	TFirstParameter,
	TReturnType,
	TAdditionalParameters extends unknown[] = [],
> = keyof TFirstParameter extends never
	? (props?: undefined, ...additional: TAdditionalParameters) => TReturnType
	: Partial<TFirstParameter> extends TFirstParameter
		? (props?: TFirstParameter, ...additional: TAdditionalParameters) => TReturnType
		: (props: TFirstParameter, ...additional: TAdditionalParameters) => TReturnType;

export interface DefaultPopup<P> extends Popup<P> {
	type: 'default';
}

const isDefaultPopup = <P,>(popup: Popup<P>): popup is DefaultPopup<P> => popup.type === 'default';

export type UsePopupBag<P, K extends keyof P> = [open: OptionalParamFunction<Omit<P, K>, void>, close: () => void];

export const usePopup = <P, K extends keyof P>(
	PopupComponent: ComponentType<P>,
	props: Pick<P, K>,
	group: PopupGroup,
): UsePopupBag<P, K> => {
	const { mount, close: closePopup, unmount, update } = useSafeContext(PopupsContext);

	const popupIdentifier = useRef<PopupIdentifier>({
		id: nanoid(),
		groupId: group.groupId,
	});

	const open = useEvent<OptionalParamFunction<Omit<P, K>, void>>((omittedProps?: Omit<P, K>) => {
		const defaultClose = () => {
			unmount(popupIdentifier.current);
		};

		const popup: DefaultPopup<P> = {
			PopupComponent,
			props: { ...props, ...omittedProps } as P,
			popupIdentifier: popupIdentifier.current,
			close: defaultClose,
			type: 'default',
		};

		mount(popup);
	});

	const close = useCallback(() => {
		closePopup(popupIdentifier.current);
	}, [closePopup]);

	const oldPropsRef = useRef(props);

	useEffect(() => {
		if (!shallowEqual(props, oldPropsRef.current)) {
			update(popupIdentifier.current, props);
		}

		oldPropsRef.current = props;
	});

	return [open, close];
};

export const useCloseHandler = (close?: () => void | Promise<void>): (() => void) => {
	const { getPopup, unmount } = useSafeContext(PopupsContext);

	const popupIdentifier = useIdentifier();

	const unmountPopup = useCallback(() => {
		unmount(popupIdentifier);
	}, [popupIdentifier, unmount]);

	useEffect(() => {
		const popup = getPopup(popupIdentifier);

		if (popup === null || !isDefaultPopup(popup)) {
			throw new Error('useCloseHandler hook must be used only in popups created with usePopupsFactory.');
		}

		if (close) {
			popup.close = close;
		}
	}, [popupIdentifier, close, getPopup]);

	return unmountPopup;
};

import { act, renderHook } from '@testing-library/react';

if (import.meta.vitest) {
	const { describe, it, expect, vi } = import.meta.vitest;

	const createMockPopupsContext = (popupsState: PopupsState) => {
		const close = vi.fn();
		const mount = vi.fn();
		const unmount = vi.fn();
		const getPopup = vi.fn();
		const update = vi.fn();

		return {
			close,
			mount,
			unmount,
			getPopup,
			update,
			popupsState,
		};
	};

	describe('usePopup', () => {
		it('should call mount function with the same popupIdentifier', () => {
			const MockComponent = vi.fn();
			const MyGroup = createPopupGroup();
			const context = createMockPopupsContext({ popups: {} });
			const { result } = renderHook(() => usePopup(MockComponent, {}, MyGroup), {
				wrapper: ({ children }) => (
					<PopupsContext.Provider value={context}>
						<MyGroup />
						{children}
					</PopupsContext.Provider>
				),
			});

			const [open] = result.current;

			act(() => {
				open();
			});

			const firstId = context.mount.mock.calls[0][0].popupIdentifier;

			act(() => {
				open();
			});

			const secondId = context.mount.mock.calls[1][0].popupIdentifier;

			expect(firstId).toStrictEqual(secondId);
		});

		it('should call close', () => {
			const MockComponent = vi.fn();
			const MyGroup = createPopupGroup();
			const context = createMockPopupsContext({ popups: {} });
			const { result } = renderHook(() => usePopup(MockComponent, {}, MyGroup), {
				wrapper: ({ children }) => (
					<PopupsContext.Provider value={context}>
						<MyGroup />
						{children}
					</PopupsContext.Provider>
				),
			});

			const [open, close] = result.current;

			act(() => {
				open();
			});

			const id = context.mount.mock.calls[0][0].popupIdentifier;

			act(() => {
				close();
			});

			expect(context.close).toBeCalledWith(id);
		});

		it('should rerender component with new props', () => {
			type MockComponentProps = {
				message: string;
			};
			const MockComponent = vi.fn(({ message }: MockComponentProps) => <div>{message}</div>);
			const MyGroup = createPopupGroup();
			const context = createMockPopupsContext({ popups: {} });
			const { result } = renderHook(() => usePopup(MockComponent, {}, MyGroup), {
				wrapper: ({ children }) => (
					<PopupsContext.Provider value={context}>
						<MyGroup />
						{children}
					</PopupsContext.Provider>
				),
			});

			const [open] = result.current;

			act(() => {
				open({ message: 'first' });
			});

			expect(context.mount.mock.calls[0][0].props.message).toBe('first');

			act(() => {
				open({ message: 'second' });
			});

			expect(context.mount.mock.calls[1][0].props.message).toBe('second');
		});

		it('should merge props', () => {
			type MockComponentProps = {
				age: number;
				message: string;
			};
			const MockComponent = vi.fn(({ message, age }: MockComponentProps) => <div>{message + age}</div>);
			const MyGroup = createPopupGroup();
			const context = createMockPopupsContext({ popups: {} });
			const { result } = renderHook(() => usePopup(MockComponent, { age: 42 }, MyGroup), {
				wrapper: ({ children }) => (
					<PopupsContext.Provider value={context}>
						<MyGroup />
						{children}
					</PopupsContext.Provider>
				),
			});

			const [open] = result.current;

			act(() => {
				open({ message: 'first' });
			});

			expect(context.mount.mock.calls[0][0].props).toStrictEqual({
				message: 'first',
				age: 42,
			});
		});

		it('should update popup when props change', () => {
			type MockComponentProps = {
				message: string;
			};
			const MockComponent = vi.fn(({ message }: MockComponentProps) => <div>{message}</div>);
			const MyGroup = createPopupGroup();
			const context = createMockPopupsContext({ popups: {} });
			const { result, rerender } = renderHook(
				(props: MockComponentProps) => usePopup(MockComponent, props, MyGroup),
				{
					wrapper: ({ children }) => (
						<PopupsContext.Provider value={context}>
							<MyGroup />
							{children}
						</PopupsContext.Provider>
					),
					initialProps: {
						message: 'first',
					},
				},
			);

			const [open] = result.current;

			act(() => {
				open();
			});

			const id = context.mount.mock.calls[0][0].popupIdentifier;
			expect(context.mount.mock.calls[0][0].props.message).toBe('first');

			rerender({
				message: 'second',
			});

			expect(context.update).toBeCalledTimes(1);
			expect(context.update.mock.calls[0][0]).toStrictEqual(id);
			expect(context.update.mock.calls[0][1]).toStrictEqual({
				message: 'second',
			});
		});

		it('should make shallow compare on values in props before calling update', () => {
			type MockComponentProps = {
				message: string;
				value: {
					hello: number;
				};
			};
			const MockComponent = vi.fn(({ message }: MockComponentProps) => <div>{message}</div>);
			const MyGroup = createPopupGroup();
			const context = createMockPopupsContext({ popups: {} });

			const initialValue = {
				hello: 42,
			};

			const { result, rerender } = renderHook(
				(props: MockComponentProps) => usePopup(MockComponent, props, MyGroup),
				{
					wrapper: ({ children }) => (
						<PopupsContext.Provider value={context}>
							<MyGroup />
							{children}
						</PopupsContext.Provider>
					),
					initialProps: {
						message: 'first',
						value: initialValue,
					},
				},
			);

			const [open] = result.current;

			act(() => {
				open();
			});

			// change nothing
			rerender({
				message: 'first',
				value: initialValue,
			});

			expect(context.update).toBeCalledTimes(0);

			// change message
			rerender({
				message: 'second',
				value: initialValue,
			});

			expect(context.update).toBeCalledTimes(1);

			// add new key 'test'
			rerender({
				message: 'second',
				value: initialValue,
				test: 'asdf',
			} as MockComponentProps);

			expect(context.update).toBeCalledTimes(2);

			// change object value
			rerender({
				message: 'second',
				value: {
					hello: 12,
				},
				test: 'asdf',
			} as MockComponentProps);

			expect(context.update).toBeCalledTimes(3);
		});
	});
}
