import React, { type ComponentType, Fragment, type FunctionComponent } from 'react';
import { useSafeContext } from '@sirse-dev/safe-context';

import { IdentifierContextProvider } from './IdentifierContext';
import { type Popup, type PopupIdentifier, PopupsContext, type PopupsState } from './PopupsContext';

export const usePopupsByGroup = (group: PopupGroup): Popup<object>[] => {
	const { popupsState } = useSafeContext(PopupsContext);

	if (!popupsState.popups[group.groupId]) {
		return [];
	}

	return Object.values(popupsState.popups[group.groupId]);
};

type PopupsRendererProps = {
	group: PopupGroup;
};

const PopupsRenderer: FunctionComponent<PopupsRendererProps> = ({ group }) => {
	const popups = usePopupsByGroup(group);

	return (
		<Fragment>
			{popups.map(({ PopupComponent, props, popupIdentifier }) => (
				<IdentifierContextProvider key={popupIdentifier.id} popupIdentifier={popupIdentifier}>
					<PopupComponent {...(props as object)} />
				</IdentifierContextProvider>
			))}
		</Fragment>
	);
};

export type PopupGroup = ComponentType & {
	groupId: symbol;
};

export const createPopupGroup = (): PopupGroup => {
	const group: PopupGroup = () => {
		return <PopupsRenderer group={group} />;
	};

	group.groupId = Symbol();

	return group;
};

import { render, renderHook } from '@testing-library/react';
if (import.meta.vitest) {
	const { it, vi, describe, expect } = import.meta.vitest;

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
		});
	});
}
