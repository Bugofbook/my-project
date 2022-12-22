import { Outlet } from 'react-router-dom';

import { createModalContext, createAlertDialogContext, createAlertToastContext, createYesnoDialogContext, createYesnocancelDialogContext } from "@bugofbook/react/context/portal";

const ModalContext = createModalContext();
const ModalProvider = ModalContext.ModalProvider;
export const ModalStateContext = ModalContext.ModalStateContext
export const ModalMethodsContext = ModalContext.ModalMethodsContext
const AlertDialogContext = createAlertDialogContext();
const AlertDialogProvider = AlertDialogContext.AlertDialogProvider;
export const AlertDialogStateContext = AlertDialogContext.AlertDialogStateContext
export const AlertDialogMethodsContext = AlertDialogContext.AlertDialogMethodsContext
const AlertToastContext = createAlertToastContext();
const AlertToastProvider = AlertToastContext.AlertToastProvider;
export const AlertToastStateContext = AlertToastContext.AlertToastStateContext
export const AlertToastMethodsContext = AlertToastContext.AlertToastMethodsContext
const YesnoDialogContext = createYesnoDialogContext();
const YesnoDialogProvider = YesnoDialogContext.YesnoDialogProvider;
export const YesnoDialogStateContext = YesnoDialogContext.YesnoDialogStateContext
export const YesnoDialogMethodsContext = YesnoDialogContext.YesnoDialogMethodsContext
const YesnocancelDialogContext = createYesnocancelDialogContext();
const YesnocancelDialogProvider = YesnocancelDialogContext.YesnocancelDialogProvider;
export const YesnocancelDialogStateContext = YesnocancelDialogContext.YesnocancelDialogStateContext
export const YesnocancelDialogMethodsContext = YesnocancelDialogContext.YesnocancelDialogMethodsContext

export const GlobalProvider = () => {
    return (
        <ModalProvider>
            <AlertDialogProvider>
                <AlertToastProvider>
                    <YesnoDialogProvider>
                        <YesnocancelDialogProvider>
                            <Outlet />
                        </YesnocancelDialogProvider>
                    </YesnoDialogProvider>
                </AlertToastProvider>
            </AlertDialogProvider>
        </ModalProvider>
    )
}