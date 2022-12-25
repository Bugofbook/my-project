import { createContext, useReducer, PropsWithChildren, FunctionComponent, useCallback } from 'react';
import { modalReducer, initializeModalState, createModalAction, ModalInitialProps, ModalSetProps, ModalState } from '@bugofbook/react/reducer/feedback'

export type ModalComponentProps<T extends Record<string, unknown>> = ModalState<T> & {
    onClose: (prop: unknown) => unknown,
}

type ModalContextProps<T extends Record<string, unknown>> = {
    modal: FunctionComponent<ModalComponentProps<T>>,
}
export function createModalContext<T extends Record<string, unknown>>({modal}: ModalContextProps<T>) {
    const ModalComponent = modal
    const OpenModalContext = createContext<(prop?: ModalSetProps<T>) => void>(() => {return;});
    const ModalProvider = ({children, initState}: PropsWithChildren<{initState: ModalInitialProps<T>}>) => {
        const [state, dispatch] = useReducer<modalReducer<T>>(modalReducer, initializeModalState<T>(initState));
        const open = useCallback((config?: ModalSetProps<T>) => {
            if (config) {
                dispatch(createModalAction.setConfig(config));
            }
            requestAnimationFrame(() => {
                dispatch(createModalAction.open());
            });
        }, [dispatch]);
        const close = useCallback(() => {
            dispatch(createModalAction.clearConfig());
            requestAnimationFrame(() => {
                dispatch(createModalAction.close());
            });
        }, [dispatch]);
        return (
            <OpenModalContext.Provider value={open}>
                {children}
                <ModalComponent {...state} onClose={close} />
            </OpenModalContext.Provider>
        )
    }
    return {
        ModalProvider,
        OpenModalContext,
    }
}