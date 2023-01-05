import { createContext } from 'react'
import { Outlet } from 'react-router-dom'
import {
    useModal,
    useAlertDialog,
    useAlertToast,
    useYesnoDialog,
    useYesnocancelDialog
} from '@bugofbook/react/hook/feedback'
import {
    initializeModalState,
    initializeAlertDialogState,
    initializeAlertToastState,
    initializeYesnoDialogState,
    initializeYesnocancelDialogState,
    ModalSetProps,
    AlertDialogSetProps,
    AlertToastSetProps,
    SetConfigYesnoDialogProps,
    YesnocancelDialogSetProps
} from '@bugofbook/react/reducer/feedback'

export const ModalComponentPropsContext = createContext({
    ...initializeModalState({ open: false }),
    onClose: () => {
        return
    },
    onClearConfig: () => {
        return
    }
})
export const OpenModalComponentContext = createContext(
    (prop?: ModalSetProps<Record<string, unknown>>) => {
        return
    }
)
export const AlertDialogComponentPropsContext = createContext({
    ...initializeAlertDialogState({ open: false }),
    onClose: () => {
        return
    },
    onClearConfig: () => {
        return
    },
    onConfirm: () => {
        return
    }
})
export const OpenAlertDialogComponentContext = createContext(
    (prop?: AlertDialogSetProps<Record<string, unknown>>) => {
        return
    }
)
export const AlertToastComponentPropsContext = createContext({
    ...initializeAlertToastState({ open: false }),
    onClose: () => {
        return
    },
    onClearConfig: () => {
        return
    }
})
export const OpenAlertToastComponentContext = createContext(
    (prop?: AlertToastSetProps<Record<string, unknown>>) => {
        return
    }
)
export const YesnoDialogComponentPropsContext = createContext({
    ...initializeYesnoDialogState({ open: false }),
    onClose: () => {
        return
    },
    onClearConfig: () => {
        return
    },
    onYes: () => {
        return
    },
    onNo: () => {
        return
    }
})
export const OpenYesnoDialogComponentContext = createContext(
    (prop?: SetConfigYesnoDialogProps<Record<string, unknown>>) => {
        return
    }
)
export const YesnocancelDialogComponentPropsContext = createContext({
    ...initializeYesnocancelDialogState({ open: false }),
    onClose: () => {
        return
    },
    onClearConfig: () => {
        return
    },
    onYes: () => {
        return
    },
    onNo: () => {
        return
    },
    onCancel: () => {
        return
    }
})
export const OpenYesnocancelDialogComponentContext = createContext(
    (prop?: YesnocancelDialogSetProps<Record<string, unknown>>) => {
        return
    }
)
export const GlobalProvider = () => {
    const {
        state: modalState,
        onOpen: modalOnOpen,
        onClose: modalOnClose,
        onClearConfig: modalOnClearConfig
    } = useModal({ open: false })
    const {
        state: alertDialogState,
        onOpen: alertDialogOnOpen,
        onClose: alertDialogOnClose,
        onClearConfig: alertDialogOnClearConfig,
        onConfirm: alertDialogOnConfirm
    } = useAlertDialog({ open: false })
    const {
        state: alertToastState,
        onOpen: alertToastOnOpen,
        onClose: alertToastOnClose,
        onClearConfig: alertToastOnClearConfig
    } = useAlertToast({ open: false })
    const {
        state: yesnoDialogState,
        onOpen: yesnoDialogOnOpen,
        onClose: yesnoDialogOnClose,
        onClearConfig: yesnoDialogOnClearConfig,
        onYes: yesnoDialogOnYes,
        onNo: yesnoDialogOnNo
    } = useYesnoDialog({ open: false })
    const {
        state: yesnocancelDialogState,
        onOpen: yesnocancelDialogOnOpen,
        onClose: yesnocancelDialogOnClose,
        onClearConfig: yesnocancelDialogOnClearConfig,
        onYes: yesnocancelDialogOnYes,
        onNo: yesnocancelDialogOnNo,
        onCancel: yesnocancelDialogOnCancel
    } = useYesnocancelDialog({ open: false })
    return (
        <ModalComponentPropsContext.Provider
            value={{
                ...modalState,
                onClose: modalOnClose,
                onClearConfig: modalOnClearConfig
            }}
        >
            <OpenModalComponentContext.Provider value={modalOnOpen}>
                <AlertDialogComponentPropsContext.Provider value={{
                    ...alertDialogState,
                    onClose: alertDialogOnClose,
                    onClearConfig: alertDialogOnClearConfig,
                    onConfirm: alertDialogOnConfirm
                }}>
                    <OpenAlertDialogComponentContext.Provider value={alertDialogOnOpen}>
                        <AlertToastComponentPropsContext.Provider value={{
                            ...alertToastState,
                            onClose: alertToastOnClose,
                            onClearConfig: alertToastOnClearConfig
                        }}>
                            <OpenAlertToastComponentContext.Provider value={alertToastOnOpen}>
                                <YesnoDialogComponentPropsContext.Provider value={{
                                    ...yesnoDialogState,
                                    onClose: yesnoDialogOnClose,
                                    onClearConfig: yesnoDialogOnClearConfig,
                                    onYes: yesnoDialogOnYes,
                                    onNo: yesnoDialogOnNo
                                }}>
                                    <OpenYesnoDialogComponentContext.Provider value={yesnoDialogOnOpen}>
                                        <YesnocancelDialogComponentPropsContext.Provider value={{
                                            ...yesnocancelDialogState,
                                            onClose: yesnocancelDialogOnClose,
                                            onClearConfig: yesnocancelDialogOnClearConfig,
                                            onYes: yesnocancelDialogOnYes,
                                            onNo: yesnocancelDialogOnNo,
                                            onCancel: yesnocancelDialogOnCancel
                                        }}>
                                            <OpenYesnocancelDialogComponentContext.Provider value={yesnocancelDialogOnOpen}>
                                                <Outlet />
                                            </OpenYesnocancelDialogComponentContext.Provider>
                                        </YesnocancelDialogComponentPropsContext.Provider>
                                    </OpenYesnoDialogComponentContext.Provider>
                                </YesnoDialogComponentPropsContext.Provider>
                            </OpenAlertToastComponentContext.Provider>
                        </AlertToastComponentPropsContext.Provider>
                    </OpenAlertDialogComponentContext.Provider>
                </AlertDialogComponentPropsContext.Provider>
            </OpenModalComponentContext.Provider>
        </ModalComponentPropsContext.Provider>
    )
}
