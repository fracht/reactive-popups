import { useSafeContext } from '@sirse-dev/safe-context';

import { PopupsContext } from '../PopupsContext';
import { PopupsBag } from '../types/PopupsBag';

export const usePopupsContext = (): PopupsBag => {
	return useSafeContext(PopupsContext);
};
