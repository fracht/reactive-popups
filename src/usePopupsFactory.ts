import { type ComponentType, useId } from 'react';
import { useSafeContext } from '@sirse-dev/safe-context';
import { nanoid } from 'nanoid';

import type { PopupGroup } from './PopupGroup';
import { type PopupIdentifier, PopupsContext } from './PopupsContext';
import { useEvent } from './useEvent';
import type { DefaultPopup, OptionalParamFunction } from './usePopup';

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
