import { useContext } from 'react'
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import { createModalContext } from "@bugofbook/react/context/portal";
import { ModalComponent } from "@bugofbook/mui/joy/feedback";
const ModalContext = createModalContext({ modal: ModalComponent });
export const ModalProvider = ModalContext.ModalProvider;
const OpenModalContext = ModalContext.OpenModalContext

export function ModalSection() {
    const openLocalModal = useContext(OpenModalContext)
    return (
        <Card variant="outlined">
            <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
                Modal Component
            </Typography>
            <Box sx={{ display: 'flex' }}>
                <Button
                    variant="solid"
                    size="sm"
                    color="primary"
                    aria-label="Openg Modal"
                    onClick={() => openLocalModal({title: 'Modal', content: 'This is the modal:context'})}
                    >
                    Openg Modal: Context
                </Button>
            </Box>
        </Card>
    )
}
