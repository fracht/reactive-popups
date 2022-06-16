import React, { useCallback, useEffect, useState } from 'react';
import { useCloseHandler, usePopupsFactory } from 'reactive-popups';
import {
    Alert,
    AlertColor,
    AlertProps,
    Collapse,
    Slide,
    SlideProps,
} from '@mui/material';

import { SnackbarGroup } from '.';

export const DEFAULT_AUTOHIDE_DURATION = 4000;

export type AlertPopupProps = {
    slideProps?: SlideProps;
    autoHideDuration?: number;
    message: string;
} & AlertProps;

export const AlertPopup: React.FunctionComponent<AlertPopupProps> = ({
    slideProps,
    message,
    autoHideDuration = DEFAULT_AUTOHIDE_DURATION,
    ...alertProps
}) => {
    const [open, setOpen] = useState(true);

    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    const unmount = useCloseHandler(handleClose);

    useEffect(() => {
        setTimeout(handleClose, autoHideDuration);
    }, [autoHideDuration, handleClose]);

    return (
        <Collapse in={open} enter={false} orientation="vertical">
            <Slide
                {...slideProps}
                direction="right"
                in={open}
                onExited={unmount}
            >
                <Alert
                    {...alertProps}
                    onClose={handleClose}
                    style={{
                        margin: 5,
                    }}
                >
                    {message}
                </Alert>
            </Slide>
        </Collapse>
    );
};

export const useAlert = () => {
    const enqueueAlert = usePopupsFactory(AlertPopup, {}, SnackbarGroup);

    const showAlert = useCallback(
        (message: string, severity: AlertColor) => {
            enqueueAlert({
                severity,
                message,
            });
        },
        [enqueueAlert]
    );

    return showAlert;
};

export const AlertTrigger = () => {
    const showAlert = useAlert();

    return (
        <button
            onClick={() => {
                showAlert('hello', 'success');
            }}
            style={{ marginLeft: 500 }}
        >
            show alert
        </button>
    );
};
