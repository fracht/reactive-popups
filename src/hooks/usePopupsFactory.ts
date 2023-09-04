import { nanoid } from 'nanoid/non-secure';
import { ComponentType, useId } from 'react';

import { useEvent } from './useEvent';
import { usePopupsContext } from './usePopupsContext';
import { PopupGroup } from '../components/PopupGroup';
import { DefaultPopup } from '../types/DefaultPopup';
import { OptionalParamFunction as OptionalParameterFunction } from '../types/OptionalParamFunction';
import { PopupIdentifier } from '../types/PopupIdentifier';

export type UsePopupsFactoryBag<P, K extends keyof P> = OptionalParameterFunction<
	Omit<P, K>,
	() => void,
	[id?: string]
>;

export const usePopupsFactory = <P, K extends keyof P>(
	PopupComponent: ComponentType<P>,
	properties: Pick<P, K>,
	group: PopupGroup,
): UsePopupsFactoryBag<P, K> => {
	const { mount, unmount } = usePopupsContext();

	const factoryId = useId();

	const create = useEvent((omittedProperties?: Omit<P, K>, id: string = nanoid()) => {
		const popupIdentifier: PopupIdentifier = {
			id: `${factoryId}:${id}`,
			groupId: group.groupId,
		};

		const defaultClose = () => {
			unmount(popupIdentifier);
		};

		const popup = new DefaultPopup(
			PopupComponent,
			{
				...properties,
				...omittedProperties,
			} as P,
			popupIdentifier,
			defaultClose,
		);

		mount<P>(popup);

		return () => {
			unmount(popupIdentifier);
		};
	});

	return create;
};
