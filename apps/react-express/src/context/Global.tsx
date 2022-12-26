import { Outlet } from 'react-router-dom';
import { createModalContext, createAlertDialogContext, createAlertToastContext, createYesnoDialogContext, createYesnocancelDialogContext } from "@bugofbook/react/context/portal";
import { ModalComponent, AlertDialogComponent, AlertToastComponent, YesnoDialogComponent, YesnocancelDialogComponent } from "@bugofbook/mui/joy/feedback";

const ModalContext = createModalContext({modal: ModalComponent});
const ModalProvider = ModalContext.ModalProvider;
export const OpenModalContext = ModalContext.OpenModalContext
const AlertDialogContext = createAlertDialogContext({modal: AlertDialogComponent});
const AlertDialogProvider = AlertDialogContext.AlertDialogProvider;
export const OpenAlertDialogContext = AlertDialogContext.OpenAlertDialogContext
const AlertToastContext = createAlertToastContext({modal: AlertToastComponent});
const AlertToastProvider = AlertToastContext.AlertToastProvider;
export const OpenAlertToastContext = AlertToastContext.OpenAlertToastContext
const YesnoDialogContext = createYesnoDialogContext({modal: YesnoDialogComponent});
const YesnoDialogProvider = YesnoDialogContext.YesnoDialogProvider;
export const OpenYesnoDialogStateContext = YesnoDialogContext.OpenYesnoDialogContext
const YesnocancelDialogContext = createYesnocancelDialogContext({modal: YesnocancelDialogComponent});
const YesnocancelDialogProvider = YesnocancelDialogContext.YesnocancelDialogProvider;
export const OpenYesnocancelDialogStateContext = YesnocancelDialogContext.OpenYesnocancelDialogContext

export const GlobalProvider = () => {
    return (
        <ModalProvider initState={{open: false}}>
            <AlertDialogProvider initState={{open: false}}>
                <AlertToastProvider initialState={{open: false}}>
                    <YesnoDialogProvider initialState={{open: false}}>
                        <YesnocancelDialogProvider initialState={{open: false}}>
                            <Outlet />
                        </YesnocancelDialogProvider>
                    </YesnoDialogProvider>
                </AlertToastProvider>
            </AlertDialogProvider>
        </ModalProvider>
    )
}