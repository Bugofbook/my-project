import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import ModalDialog from '@mui/joy/ModalDialog';
import Button from '@mui/joy/Button';
import { YesnocancelDialogComponent } from '@bugofbook/react/context/portal';
export function YesnocancelDialogComponent({open, onClose, onYes, onNo, onCancel, title, content, yesText, noText, cancelText}: YesnocancelDialogComponent<Record<string, never>>) {
    const handleClose=(event: unknown, reason: string) => {
        if (onClose) {
            onClose()
        }
    }
    const handleYes=(prop: unknown) => {
        if (onYes) {
            onYes(prop)
        }
    }
    const handleNo=(prop: unknown) => {
        if (onNo) {
            onNo(prop)
        }
    }
    const handleCancel=(prop: unknown) => {
        if (onCancel) {
            onCancel(prop)
        }
    }
    return (
        <Modal open={open} onClose={handleClose}>
            <ModalDialog>
                <ModalClose />
                <Box sx={{p: 2}}>
                    <Typography>{ title ? title : 'Yesnocancel Dialog Title'}</Typography>
                </Box>
                <Box sx={{p: 2}}>
                    { content ? content : 'Yesnocancel Dialog Content' }
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
                    <Button color="info" onClick={handleYes}>
                        { yesText ? yesText : 'Yes' }
                    </Button>
                    <Button color="info" onClick={handleNo}>
                        { noText ? noText : 'No' }
                    </Button>
                    <Button color="info" onClick={handleCancel}>
                        { cancelText ? cancelText : 'Cancel' }
                    </Button>
                </Box>
            </ModalDialog>
        </Modal>
    );
}