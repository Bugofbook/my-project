import { cloneElement, useEffect, useCallback, useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import ModalDialog from '@mui/joy/ModalDialog';
import Button from '@mui/joy/Button';
import Alert from '@mui/joy/Alert';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import ReportIcon from '@mui/icons-material/Report';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { ColorPaletteProp } from '@mui/joy/styles';
import { AlertToastComponent } from '@bugofbook/react/context/portal';

// const items: {
//     title: string;
//     color: ColorPaletteProp;
//     icon: React.ReactElement;
//   }[] = [
//     { title: 'Success', color: 'success', icon: <CheckCircleIcon /> },
//     { title: 'Warning', color: 'warning', icon: <WarningIcon /> },
//     { title: 'Error', color: 'danger', icon: <ReportIcon /> },
//     { title: 'Info', color: 'info', icon: <InfoIcon /> },
//   ];
type Item = {
    color: ColorPaletteProp;
    Icon: React.ReactElement;
}
const items: {
    [key: string]: Item;
} = {
    'success': {
        color: 'success',
        Icon: (<CheckCircleIcon />),
    },
    'warning': {
        color: 'warning',
        Icon: (<WarningIcon />),
    },
    'error': {
        color: 'danger',
        Icon: (<ReportIcon />),
    },
    'info': {
        color: 'info',
        Icon: (<InfoIcon />),
    },
}

const Content = ({title, content}: {title?: string, content?: string}) => {
    if (content) {
        return (
            <Box>
                <Typography fontWeight="lg" mt={0.25}>
                    {title ? title : "Alert Toast Title"}
                </Typography>
                <Typography fontSize="sm" sx={{ opacity: 0.8 }}>
                    {content}
                </Typography>
            </Box>
        )
    } else {
        return (
            <Box>
                <Typography fontWeight="lg" mt={0.25}>
                    {title ? title : "Alert Toast Title"}
                </Typography>
            </Box>
        )
    }
}

export function AlertToastComponent({open, onClose, title, content, toastType}: AlertToastComponent<Record<string, never>>) {
    const {color, Icon} = items[toastType || 'info'];
    const handleClose=useCallback((event: unknown, reason: string) => {
        if (onClose) {
            onClose()
        }
    },[onClose])
    useEffect(() => {
        let timer: null | NodeJS.Timeout = null
        if (open) {
            timer = setTimeout(() => {
                handleClose(undefined, 'timeout')
                timer = null
            }, 5000);
        }
        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [handleClose, open])
    return (
        <Modal open={open} onClose={handleClose}>
            <Alert
                startDecorator={cloneElement(Icon, {
                    sx: { mt: '2px', mx: '4px' },
                    fontSize: 'xl2',
                })}
                variant="soft"
                color={color}
            >
                <Content title={title} content={content} />
            </Alert>
        </Modal>
    );
}