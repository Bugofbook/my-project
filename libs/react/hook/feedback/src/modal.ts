import { useReducer, useCallback } from "react";
import { modalReducer, initializeModalState, createModalAction, ModalInitialProps, ModalSetProps, ModalState } from '@bugofbook/react/reducer/feedback'


export function useModal<T extends Record<string, unknown>>(initState: ModalInitialProps<T>): {
    state: ModalState<T>,
    onOpen: (config?: ModalSetProps<T>) => void,
    onClose: () => void,
    onClearConfig: () => void,
} {
    const [state, dispatch] = useReducer<modalReducer<T>>(modalReducer, initializeModalState<T>(initState));
    const onOpen = useCallback((config?: ModalSetProps<T>) => {
        if (config) {
            dispatch(createModalAction.setConfig(config));
        }
        requestAnimationFrame(() => {
            dispatch(createModalAction.open());
        });
    }, []);
    const onClose = useCallback(() => {
        dispatch(createModalAction.clearConfig());
    }, []);
    const onClearConfig = useCallback(() => {
        dispatch(createModalAction.clearConfig());
    }, []);
    return {
        state,
        onOpen,
        onClose,
        onClearConfig,
    }
}
