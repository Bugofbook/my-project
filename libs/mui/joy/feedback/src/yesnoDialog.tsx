import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import ModalDialog from '@mui/joy/ModalDialog';
import Button from '@mui/joy/Button';
import { YesnoDialogComponent } from '@bugofbook/react/context/portal';
export function YesnoDialogComponent({open, onClose, onYes, onNo, title, content, yesText, noText}: YesnoDialogComponent<Record<string, never>>) {
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
    return (
        <Modal open={open} onClose={handleClose}>
            <ModalDialog>
                <ModalClose />
                <Box sx={{p: 2}}>
                    <Typography>{ title ? title : 'Yesno Dialog Title'}</Typography>
                </Box>
                <Box sx={{p: 2}}>
                    { content ? content : 'Yesno Dialog Content' }
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end'}}>
                    <Button color="info" onClick={handleYes}>
                        { yesText ? yesText : 'Yes' }
                    </Button>
                    <Button color="info" onClick={handleNo}>
                        { noText ? noText : 'No' }
                    </Button>
                </Box>
            </ModalDialog>
        </Modal>
    );
}