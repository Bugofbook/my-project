import { createContext, useReducer, PropsWithChildren, FunctionComponent, useCallback } from 'react';
import { alertDialogState, initializeAlertDialogState, alertDialogReducer, AlertDialogInitialProps, AlertDialogSetProps, createAlertDialogAction } from '@bugofbook/react/reducer/feedback';
export type AlertDialogprops<T extends Record<string, unknown>> = alertDialogState<T> & {
    onClose?: () => unknown,
    onClearConfig?: () => unknown,
    onConfirm?: (prop: unknown) => unknown,
}

type AlertDialogContextProps<T extends Record<string, unknown>> = {
    modal: FunctionComponent<AlertDialogprops<T>>,
}

export function createAlertDialogContext<T extends Record<string, unknown>>({modal}: AlertDialogContextProps<T>) {
    const AlertDialogComponent = modal
    const OpenAlertDialogContext = createContext((prop: AlertDialogSetProps<T>) => {return;})
    const AlertDialogProvider = ({children, initState}: PropsWithChildren<{initState: AlertDialogInitialProps<T>}>) => {
        const [state, dispatch] = useReducer(alertDialogReducer, initializeAlertDialogState<T>(initState))
        const open = useCallback((config: AlertDialogSetProps<T>) => {
            dispatch(createAlertDialogAction.setConfig(config));
            requestAnimationFrame(() => {
                dispatch(createAlertDialogAction.open());
            });
        }, [dispatch])
        const close = useCallback(() => {
            dispatch(createAlertDialogAction.close());
        }, [dispatch])
        const clearConfig = useCallback(() => {
            dispatch(createAlertDialogAction.clearConfig());
        }, [dispatch])
        const confirm = useCallback((prop: unknown) => {
            if (state.onConfirm) {
                state.onConfirm(prop)
            }
            close()
        }, [state, close])
        return (
            <OpenAlertDialogContext.Provider value={open}>
                { children}
                <AlertDialogComponent {...state} onConfirm={confirm} onClose={close} onClearConfig={clearConfig} />
            </OpenAlertDialogContext.Provider>
        )
    }
    return ({
        AlertDialogProvider,
        OpenAlertDialogContext,
    })
}