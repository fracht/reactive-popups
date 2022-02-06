import React from 'react';

import { PopupProps } from './PopupProps';

export type PopupComponent<P> = React.ComponentType<P & PopupProps>;
