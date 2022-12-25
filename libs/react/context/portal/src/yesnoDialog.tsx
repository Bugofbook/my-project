import { createContext, useReducer, PropsWithChildren, FunctionComponent, useCallback } from 'react';
import { YesnoDialogState, initializeYesnoDialogState, yesnoDialogReducer, YesnoDialogInitialProps, createYesnoDialogAction } from "@bugofbook/react/reducer/feedback";
export type YesnoDialogComponent<T extends Record<string, unknown>> = YesnoDialogState<T> & {
    onClose?: () => unknown,
    onYes?: (prop: unknown) => unknown,
    onNo?: (prop: unknown) => unknown,
}
type YesnoDialogContextProps<T extends Record<string, unknown>> = {
    modal: FunctionComponent<YesnoDialogComponent<T>>,
}
export function createYesnoDialogContext<T extends Record<string, unknown>>({modal}: YesnoDialogContextProps<T>) {
    const YesnoDialogComponent = modal
    const OpenYesnoDialogContext = createContext((prop: YesnoDialogInitialProps<T>) => { return; })
    const YesnoDialogProvider = ({ children, initialState}: PropsWithChildren<{initialState: YesnoDialogInitialProps<T>}>) => {
        const [state, dispatch] = useReducer(yesnoDialogReducer, initializeYesnoDialogState<T>(initialState))
        const open = useCallback((config: YesnoDialogInitialProps<T>) => {
            dispatch(createYesnoDialogAction.setConfig(config));
            requestAnimationFrame(() => {
                dispatch(createYesnoDialogAction.open());
            });
        }, [])
        const close = useCallback(() => {
            dispatch(createYesnoDialogAction.close());
            requestAnimationFrame(() => {
                dispatch(createYesnoDialogAction.clearConfig());
            });
        }, [])
        const yes = useCallback((prop: unknown) => {
            if (state.onYes) {
                state.onYes(prop)
            }
            close()
        }, [state, close])
        const no = useCallback((prop: unknown) => {
            if (state.onNo) {
                state.onNo(prop)
            }
            close()
        }, [state, close])
        return (
            <OpenYesnoDialogContext.Provider value={open}>
                { children}
                <YesnoDialogComponent {...state} onYes={yes} onNo={no} onClose={close} />
            </OpenYesnoDialogContext.Provider>
        )        
    };
    return ({
        YesnoDialogProvider,
        OpenYesnoDialogContext,
    })

}