import { type ComponentType, useCallback, useEffect, useRef } from 'react';
import { useSafeContext } from '@sirse-dev/safe-context';
import { nanoid } from 'nanoid/non-secure';
import shallowEqual from 'shallowequal';

import type { DefaultPopup } from './DefaultPopup';
import { type PopupGroup } from './PopupGroup';
import { type PopupIdentifier, PopupsContext } from './PopupsContext';
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

	const defaultClose = useCallback(() => {
		unmount(popupIdentifier.current);
	}, [unmount]);

	const open = useEvent<OptionalParamFunction<Omit<P, K>, void>>((omittedProps?: Omit<P, K>) => {
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
