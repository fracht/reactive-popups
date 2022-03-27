import React, { useMemo, useRef } from 'react';
import {
    PopupProps,
    PopupsRenderer,
    usePopup,
    usePopupsContext,
} from '@reactive-popups/core';

const ANCHORED_GROUP = Symbol();

const isMutableRefObject = <T,>(
    ref: React.ForwardedRef<T>
): ref is React.MutableRefObject<T | null> => Boolean(ref && 'current' in ref);

type OptionsListProps = PopupProps;

const width = 200,
    height = 300;
const OptionsList = React.forwardRef<HTMLElement, OptionsListProps>(
    (_props: OptionsListProps, ref: React.ForwardedRef<HTMLElement>) => {
        if (!isMutableRefObject(ref) || !ref.current) {
            return null;
        }

        console.log(ref);

        return (
            <div
                style={{
                    border: '1px solid black',
                    position: 'absolute',
                    width,
                    height,
                    top: ref.current.offsetTop + ref.current.offsetHeight,
                    left:
                        ref.current.offsetLeft -
                        (width - ref.current.offsetWidth),
                }}
            >
                <ul>
                    <li>hello</li>
                    <li>hello</li>
                    <li>hello</li>
                </ul>
            </div>
        );
    }
);

export const PopupWithAnchor = () => {
    const ref = useRef<HTMLButtonElement | null>(null);

    const props = useMemo(() => ({ ref }), []);
    const [open] = usePopup(OptionsList, props, ANCHORED_GROUP);

    return (
        <div
            style={{
                width: 500,
                height: 500,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <button ref={ref} onClick={open}>
                OK
            </button>

            <AnchoredPopupsWrapper>
                <PopupsRenderer group={ANCHORED_GROUP} />
            </AnchoredPopupsWrapper>
        </div>
    );
};

const AnchoredPopupsWrapper = ({ children }: React.PropsWithChildren<{}>) => {
    const { empty } = usePopupsContext();

    if (empty(ANCHORED_GROUP)) {
        return null;
    }

    return <React.Fragment>{children}</React.Fragment>;
};
