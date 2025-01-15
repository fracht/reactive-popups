import React, { type ComponentType, useId } from 'react';
import { useSafeContext } from '@sirse-dev/safe-context';
import { nanoid } from 'nanoid';

import type { DefaultPopup } from './DefaultPopup';
import { createPopupGroup, type PopupGroup } from './PopupGroup';
import { type PopupIdentifier, PopupsContext, type PopupsState } from './PopupsContext';
import { useEvent } from './useEvent';
import type { OptionalParamFunction } from './usePopup';

export type UsePopupsFactoryBag<P, K extends keyof P> = OptionalParamFunction<Omit<P, K>, () => void, [id?: string]>;

export const usePopupsFactory = <P, K extends keyof P>(
	PopupComponent: ComponentType<P>,
	props: Pick<P, K>,
	group: PopupGroup,
): UsePopupsFactoryBag<P, K> => {
	const { mount, unmount } = useSafeContext(PopupsContext);

	const factoryId = useId();

	const create = useEvent((omittedProps?: Omit<P, K>, id: string = nanoid()) => {
		const popupIdentifier: PopupIdentifier = {
			id: `${factoryId}:${id}`,
			groupId: group.groupId,
		};

		const defaultClose = () => {
			unmount(popupIdentifier);
		};

		const popup: DefaultPopup<P> = {
			PopupComponent,
			props: { ...props, ...omittedProps } as P,
			popupIdentifier,
			close: defaultClose,
			type: 'default',
		};

		mount<P>(popup);

		return () => {
			unmount(popupIdentifier);
		};
	});

	return create;
};

import { renderHook } from '@testing-library/react';
if (import.meta.vitest) {
	const { it, expect, vi } = import.meta.vitest;

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

	it('should call mount', () => {
		const MyGroup = createPopupGroup();
		const MockComponent = vi.fn();
		const context = createMockPopupsContext({ popups: {} });

		const { result } = renderHook(() => usePopupsFactory(MockComponent, {}, MyGroup), {
			wrapper: ({ children }) => <PopupsContext.Provider value={context}>{children}</PopupsContext.Provider>,
		});

		result.current();
		expect(context.mount).toBeCalled();
	});

	it('should call mount multiple times with different ids', () => {
		const MyGroup = createPopupGroup();
		const MockComponent = vi.fn();
		const context = createMockPopupsContext({ popups: {} });

		const { result } = renderHook(() => usePopupsFactory(MockComponent, {}, MyGroup), {
			wrapper: ({ children }) => <PopupsContext.Provider value={context}>{children}</PopupsContext.Provider>,
		});

		result.current();
		result.current();
		result.current();

		expect(context.mount).toBeCalledTimes(3);
		expect(new Set(context.mount.mock.calls.map((call) => call[0].popupIdentifier.id)).size).toBe(3);
	});

	it('should merge props', () => {
		const MyGroup = createPopupGroup();
		type MockComponentProps = {
			message: string;
			age: number;
		};
		const MockComponent = vi.fn(({ message, age }: MockComponentProps) => <div>{message + age}</div>);
		const context = createMockPopupsContext({ popups: {} });

		const { result } = renderHook(() => usePopupsFactory(MockComponent, { message: 'asdf' }, MyGroup), {
			wrapper: ({ children }) => <PopupsContext.Provider value={context}>{children}</PopupsContext.Provider>,
		});

		result.current({ age: 42 });

		expect(context.mount.mock.calls[0][0].props).toStrictEqual({ message: 'asdf', age: 42 });
	});
}
