import React from 'react';
import { usePopupsFactory, useResponseHandler } from 'reactive-popups';

import { DefaultPopupGroup } from '.';

const Popup = () => {
    const errorBehaviour = useResponseHandler();

    return <div>hello</div>;
};

export const FalsyResponsePopup = () => {
    const create = usePopupsFactory(Popup, {}, DefaultPopupGroup);

    return <button onClick={create}>test error behaviour</button>;
};
