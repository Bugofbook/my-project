import { createContext, useReducer, PropsWithChildren, FunctionComponent, useCallback } from 'react';
import { yesnocancelDialogState, initializeYesnocancelDialogState, yesnocancelDialogReducer, YesnocancelDialogInitialProps, YesnocancelDialogSetProps, createYesnocancelDialogAction } from "@bugofbook/react/reducer/feedback";
export type YesnocancelDialogComponent<T extends Record<string, unknown>> = yesnocancelDialogState<T> & {
    onClose?: () => unknown,
    onClearConfig?: () => unknown,
    onYes?: (prop: unknown) => unknown,
    onNo?: (prop: unknown) => unknown,
    onCancel?: (prop: unknown) => unknown,
}
type YesnocancelDialogContextProps<T extends Record<string, unknown>> = {
    modal: FunctionComponent<YesnocancelDialogComponent<T>>,
}
export function createYesnocancelDialogContext<T extends Record<string, unknown>>({ modal }: YesnocancelDialogContextProps<T>) {
    const YesnocancelDialogComponent = modal
    const OpenYesnocancelDialogContext = createContext((prop: YesnocancelDialogSetProps<T>) => { return; })
    const YesnocancelDialogProvider = ({ children, initialState }: PropsWithChildren<{initialState: YesnocancelDialogInitialProps<T>}>) => {
        const [state, dispatch] = useReducer(yesnocancelDialogReducer, initializeYesnocancelDialogState<T>(initialState))
        const open = useCallback((config: YesnocancelDialogSetProps<T>) => {
            dispatch(createYesnocancelDialogAction.setConfig(config));
            requestAnimationFrame(() => {
                dispatch(createYesnocancelDialogAction.open());
            });
        }, [dispatch])
        const close = useCallback(() => {
            dispatch(createYesnocancelDialogAction.close());
            requestAnimationFrame(() => {
                dispatch(createYesnocancelDialogAction.clearConfig());
            });
        }, [dispatch])
        const clearConfig = useCallback(() => {
            dispatch(createYesnocancelDialogAction.clearConfig());
        }, [dispatch])
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
        const cancel = useCallback((prop: unknown) => {
            if (state.onCancel) {
                state.onCancel(prop)
            }
            close()
        }, [state, close])
        return (
            <OpenYesnocancelDialogContext.Provider value={open}>
                { children}
                <YesnocancelDialogComponent {...state} onYes={yes} onNo={no} onCancel={cancel} onClose={close} onClearConfig={clearConfig} />
            </OpenYesnocancelDialogContext.Provider>
        )
    }
    return ({
        YesnocancelDialogProvider,
        OpenYesnocancelDialogContext,
    })
}