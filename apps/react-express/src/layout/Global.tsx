import { useContext, useEffect } from "react"
import { useNavigate, useNavigation } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles'
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container'
import { Outlet } from "react-router-dom";
import theme from '../theme/global'
import CssBaseline from '@mui/material/CssBaseline'

// import { AuthContent, AuthDispatchContent, AuthCreateAction, OpenLoadingDropContent, CloseLoadingDropContent } from "@ez-admin/custom/content";
const LayoutContainer = styled(Container, {name: 'LayoutContainer'})(({ theme }) => ({
    height: '100%',
    minHeight: '100%'
}));
const Layout = () => {
    // const navigate = useNavigate()
    // const navigation = useNavigation()
    // const auth = useContext(AuthContent)
    // const authDispatch = useContext(AuthDispatchContent)
    // const openLoadingDrop = useContext(OpenLoadingDropContent)
    // const closeLoadingDrop = useContext(CloseLoadingDropContent)
    // useEffect(() => {
    //     if (navigation.state === 'loading') {
    //         openLoadingDrop()
    //     } else {
    //         closeLoadingDrop()
    //     }
    // // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [navigation.state])
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <LayoutContainer maxWidth={false} disableGutters sx={{overflowY: 'scroll'}}>
                <Outlet />
            </LayoutContainer>
        </ThemeProvider>
    )
}

export default Layout;