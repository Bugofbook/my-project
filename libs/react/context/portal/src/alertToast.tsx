import { createContext, useReducer, PropsWithChildren, FunctionComponent, useCallback } from 'react';
import { alertToastState, initializeAlertToastState, alertToastReducer, alertInitialStateProps, AlertToastSetProps, createAlertToastAction } from '@bugofbook/react/reducer/feedback';

export type AlertToastComponent<T extends Record<string, unknown>> = alertToastState<T> & {
    onClose?: () => unknown,
}

type AlertToastContextProps<T extends Record<string, unknown>> = {
    modal: FunctionComponent<AlertToastComponent<T>>,
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
        }, [])
        const close = useCallback(() => {
            dispatch(createAlertToastAction.close());
            requestAnimationFrame(() => {
                dispatch(createAlertToastAction.clearConfig());
            });
        }, [])
        return (
            <OpenAlertToastContext.Provider value={open}>
                { children}
                <AlertToastComponent {...state} onClose={close} />
            </OpenAlertToastContext.Provider>
        )
    }
    return ({
        OpenAlertToastContext,
        AlertToastProvider,
    })
}