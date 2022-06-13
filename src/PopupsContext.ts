import { createSafeContext } from '@sirse-dev/safe-context';

import { PopupsBag } from './types/PopupsBag';

export const PopupsContext = createSafeContext<PopupsBag>();
