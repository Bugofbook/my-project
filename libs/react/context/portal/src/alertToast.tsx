import { createContext, useReducer, PropsWithChildren, FunctionComponent, useCallback } from 'react';
import { alertToastState, initializeAlertToastState, alertToastReducer, alertInitialStateProps, AlertToastSetProps, createAlertToastAction } from '@bugofbook/react/reducer/feedback';

export type AlertToastProps<T extends Record<string, unknown>> = alertToastState<T> & {
    onClose?: () => unknown,
    onClearConfig?: () => unknown,
}

type AlertToastContextProps<T extends Record<string, unknown>> = {
    modal: FunctionComponent<AlertToastProps<T>>,
}
export function createAlertToastContext<T extends Record<string, unknown>>({modal}: AlertToastContextProps<T>) {
    const AlertToastComponent = modal
    const OpenAlertToastContext = createContext((prop: AlertToastSetProps<T>) => {return;})
    const AlertToastProvider = ({children, initialState}: PropsWithChildren<{initialState: alertInitialStateProps<T>}>) => {
        const [state, dispatch] = useReducer(alertToastReducer, initializeAlertToastState<T>(initialState))
        const open = useCallback((config: AlertToastSetProps<T>) => {
            dispatch(createAlertToastAction.setConfig(config));
            requestAnimationFrame(() => {
                dispatch(createAlertToastAction.open());
            });
        }, [dispatch])
        const close = useCallback(() => {
            dispatch(createAlertToastAction.close());
        }, [dispatch])
        const clearConfig = useCallback(() => {
            dispatch(createAlertToastAction.clearConfig());
        }, [dispatch])
        return (
            <OpenAlertToastContext.Provider value={open}>
                { children}
                <AlertToastComponent {...state} onClose={close} onClearConfig={clearConfig} />
            </OpenAlertToastContext.Provider>
        )
    }
    return ({
        OpenAlertToastContext,
        AlertToastProvider,
    })
}