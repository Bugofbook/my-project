import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import ModalDialog from '@mui/joy/ModalDialog';
import Button from '@mui/joy/Button';
import { AlertDialogComponent } from '@bugofbook/react/context/portal';
export function AlertDialogComponent({open, onClose, onConfirm, title, content, confirmText}: AlertDialogComponent<Record<string, never>>) {
    const handleClose=(event: unknown, reason: string) => {
        if (onClose) {
            onClose()
        }
    }
    const handleConfirm=(prop: unknown) => {
        if (onConfirm) {
            onConfirm(prop)
        }
    }
    return (
        <Modal open={open} onClose={handleClose}>
            <ModalDialog>
                <ModalClose />
                <Box sx={{p: 2}}>
                    <Typography>{ title ? title : 'Alert Dialog Title'}</Typography>
                </Box>
                <Box sx={{p: 2}}>
                    { content ? content : 'Alert Dialog Content' }
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
                    <Button color="info" onClick={handleConfirm}>
                        { confirmText ? confirmText : 'Confirm' }
                    </Button>
                </Box>
            </ModalDialog>
        </Modal>
    );
}