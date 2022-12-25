import { createContext, useReducer, PropsWithChildren, FunctionComponent, useCallback } from 'react';
import { alertDialogState, initializeAlertDialogState, alertDialogReducer, AlertDialogInitialProps, AlertDialogSetProps, createAlertDialogAction } from '@bugofbook/react/reducer/feedback';
export type AlertDialogComponent<T extends Record<string, unknown>> = alertDialogState<T> & {
    onClose?: () => unknown,
    onConfirm?: (prop: unknown) => unknown,
}

type AlertDialogContextProps<T extends Record<string, unknown>> = {
    modal: FunctionComponent<AlertDialogComponent<T>>,
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
        }, [])
        const close = useCallback(() => {
            dispatch(createAlertDialogAction.close());
            requestAnimationFrame(() => {
                dispatch(createAlertDialogAction.clearConfig());
            });
        }, [])
        const confirm = useCallback((prop: unknown) => {
            if (state.onConfirm) {
                state.onConfirm(prop)
            }
            close()
        }, [state, close])
        return (
            <OpenAlertDialogContext.Provider value={open}>
                { children}
                <AlertDialogComponent {...state} onConfirm={confirm} onClose={close} />
            </OpenAlertDialogContext.Provider>
        )
    }
    return ({
        AlertDialogProvider,
        OpenAlertDialogContext,
    })
}