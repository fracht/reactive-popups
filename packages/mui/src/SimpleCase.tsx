import React from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';
import { PopupProps, usePopup } from '@reactive-popups/core';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

type MyDialogProps = {
    data: string;
} & PopupProps;

const MyDialog = ({ visible, hide, data, unmountPopup }: MyDialogProps) => {
    console.log(data);

    return (
        <Modal open={visible} onClose={hide} draggable>
            <Box sx={style}>
                <Typography>hello world</Typography>
                <Button onClick={hide}>hide</Button>
                <Button onClick={unmountPopup}>unmount</Button>
            </Box>
        </Modal>
    );
};

const props = { data: 'hello' };
export const SimpleCase = () => {
    const [open] = usePopup(MyDialog, props);

    return <Button onClick={open}>open modal</Button>;
};
