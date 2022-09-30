import React, { useCallback, useEffect, useState } from 'react';
import { useCloseHandler, usePopupsFactory } from 'reactive-popups';
import { Alert, AlertColor, AlertProps, Collapse, Slide } from '@mui/material';

import { SnackbarGroup } from '.';

const DEFAULT_AUTOHIDE_DURATION = 4000;

type SnackbarPopupTemplateProps = {
    autoHideDuration?: number;
    children: (handleClose: () => void) => React.ReactElement;
};

const SnackbarPopupTemplate: React.FunctionComponent<
    SnackbarPopupTemplateProps
> = ({ autoHideDuration = DEFAULT_AUTOHIDE_DURATION, children }) => {
    const [slided, setSlided] = useState(true);
    const [collapsed, setCollapsed] = useState(true);

    const handleClose = useCallback(() => {
        setSlided(false);
    }, []);

    const handleCollapse = useCallback(() => {
        setCollapsed(false);
    }, []);

    const unmount = useCloseHandler(handleClose);

    useEffect(() => {
        setTimeout(handleClose, autoHideDuration);
    }, [autoHideDuration, handleClose]);

    return (
        <Collapse
            in={collapsed}
            enter={false}
            orientation="vertical"
            onExited={unmount}
        >
            <Slide direction="right" in={slided} onExited={handleCollapse}>
                {children(handleClose)}
            </Slide>
        </Collapse>
    );
};

type AlertPopupProps = {
    message: string;
} & AlertProps &
    Omit<SnackbarPopupTemplateProps, 'children'>;

const AlertPopup: React.FunctionComponent<AlertPopupProps> = ({
    message,
    autoHideDuration,
    ...alertProps
}) => (
    <SnackbarPopupTemplate autoHideDuration={autoHideDuration}>
        {(handleClose) => (
            <Alert
                {...alertProps}
                onClose={handleClose}
                style={{
                    margin: '5px 0',
                }}
            >
                {message}
            </Alert>
        )}
    </SnackbarPopupTemplate>
);

const props = {};
export const useAlert = () => {
    const enqueueAlert = usePopupsFactory(AlertPopup, props, SnackbarGroup);

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
