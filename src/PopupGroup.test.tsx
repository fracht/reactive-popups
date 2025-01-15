import React, { createElement, isValidElement } from 'react';
import { render, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { createPopupGroup, usePopupsByGroup } from './PopupGroup';
import { type Popup, type PopupIdentifier, PopupsContext, type PopupsState } from './PopupsContext';

const createMockPopup = (): Popup<object> => {
	const close = vi.fn();
	const PopupComponent = vi.fn();
	const popupIdentifier: PopupIdentifier = {
		groupId: Symbol(),
		id: 'mock',
	};
	const props = {};
	return {
		close,
		PopupComponent,
		popupIdentifier,
		props,
		type: 'mock',
	};
};

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

describe('usePopupsByGroup', () => {
	it('should return popups', () => {
		const group = createPopupGroup();
		const mockPopup = createMockPopup();
		const popupsState: PopupsState = {
			popups: {
				[group.groupId]: {
					asdf: mockPopup,
				},
			},
		};

		const context = createMockPopupsContext(popupsState);

		const { result } = renderHook(() => usePopupsByGroup(group), {
			wrapper: ({ children }) => <PopupsContext.Provider value={context}>{children}</PopupsContext.Provider>,
		});

		expect(result.current).toStrictEqual([mockPopup]);
	});

	it('should return empty array', () => {
		const group = createPopupGroup();

		const context = createMockPopupsContext({ popups: {} });

		const { result } = renderHook(() => usePopupsByGroup(group), {
			wrapper: ({ children }) => <PopupsContext.Provider value={context}>{children}</PopupsContext.Provider>,
		});

		expect(result.current).toStrictEqual([]);
	});
});

describe('createPopupGroup', () => {
	it('should return valid react component with groupId property', () => {
		const context = createMockPopupsContext({ popups: {} });
		const MyGroup = createPopupGroup();

		render(<MyGroup />, {
			wrapper: ({ children }) => <PopupsContext.Provider value={context}>{children}</PopupsContext.Provider>,
		});

		expect(MyGroup.groupId).toBeDefined();
		expect(isValidElement(createElement(MyGroup)));
	});
});
