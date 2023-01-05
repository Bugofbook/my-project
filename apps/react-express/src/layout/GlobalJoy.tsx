import { CssVarsProvider } from '@mui/joy/styles';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container'
import { Outlet } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline'
import { ModalComponentPropsContext, AlertDialogComponentPropsContext, AlertToastComponentPropsContext, YesnoDialogComponentPropsContext, OpenYesnocancelDialogComponentContext} from '../context/Global'
// import { ModalComponent, AlertDialogComponent, AlertToastComponent, YesnoDialogComponent, YesnocancelDialogComponent } from "@bugofbook/mui/joy/feedback";

const LayoutContainer = styled(Container, {name: 'LayoutContainer'})(({ theme }) => ({
    height: '100%',
    minHeight: '100%'
}));
const Layout = () => {
    return (
        <CssVarsProvider>
            <CssBaseline />
            <LayoutContainer maxWidth={false} disableGutters sx={{overflowY: 'scroll'}}>
                <Outlet />
            </LayoutContainer>
        </CssVarsProvider>
    )
}

export default Layout;