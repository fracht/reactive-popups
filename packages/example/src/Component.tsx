import React, { useMemo, useState } from 'react';
import { PopupProps, usePopup } from '@reactive-popups/core';

const mockServer = async (name: string, amount: number): Promise<void> => {
    return new Promise<void>((res) => {
        setTimeout(() => {
            console.log('Manipulations on server:', name, amount);
            res();
        }, 2000);
    });
};

type SubscriptionFormPopupProps = {
    userId: number;
} & PopupProps;

const SubscriptionFormPopup = ({
    userId,
    id,
    close,
}: SubscriptionFormPopupProps) => {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState(0);

    const submit = () => {
        mockServer(name, amount).then(close);
    };

    return (
        <div style={{ background: 'white', width: 300, height: 300 }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button style={{ margin: 10 }} onClick={close}>
                    CLOSE
                </button>
            </div>
            <form>
                <label htmlFor="name">User name:</label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="amount">Amount of donation ($):</label>
                <input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(+e.target.value)}
                />

                <div>Popup id: {id}</div>
                <div>User id: {userId}</div>
            </form>
            <div>
                <button style={{ margin: 10 }} onClick={submit}>
                    Submit
                </button>
            </div>
        </div>
    );
};

type ComponentProps = {
    userId: number;
};

export const Component = ({ userId }: ComponentProps) => {
    const popupProps = useMemo(() => ({ userId }), [userId]);
    const [open] = usePopup(SubscriptionFormPopup, popupProps);

    return (
        <div>
            <button onClick={open}>Subscribe</button>
        </div>
    );
};
