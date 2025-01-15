import React from 'react';
import { createPopupGroup, usePopup } from "reactive-popups"

const NestedGroup = createPopupGroup();

const NestedPopup = () => {
    return <div>POPUP</div>;
}

const NestedPopupTrigger = () => {
    const [open, close] = usePopup(NestedPopup, {}, NestedGroup);
    return <>
        <button onClick={() => {
            open();
        }}>
            open nested popup
        </button>
        <button onClick={() => {
            close();
        }}>
            close nested popup
        </button>
    </>
}

export const NestedGroupRoot = () => {
    return <div>
        <div style={{ background: '#ababab', padding: 16 }}>
            <NestedGroup />
            <NestedPopupTrigger />
        </div>

        <NestedGroup.Root>
            <div style={{ background: '#ededed', padding: 16 }}>

                <NestedGroup />
                <NestedPopupTrigger />
            </div>
        </NestedGroup.Root>
    </div>
}