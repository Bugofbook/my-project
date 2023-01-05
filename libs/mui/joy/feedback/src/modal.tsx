import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import ModalDialog from '@mui/joy/ModalDialog';
import type { ModalComponentProps } from '@bugofbook/react/context/portal';
export function ModalComponent({open, onClose}: ModalComponentProps<Record<string, unknown>>) {
  const handleClose=(event: unknown, reason: string) => {
    onClose(reason)
  }
  return (
    <Modal open={open} onClose={handleClose}>
        <ModalDialog>
          <ModalClose />
          <Typography>Modal title</Typography>
        </ModalDialog>
    </Modal>
  );
}