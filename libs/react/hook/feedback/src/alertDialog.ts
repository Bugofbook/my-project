import { useReducer, useCallback } from "react";
import { alertDialogReducer, initializeAlertDialogState, createAlertDialogAction, alertToastState, alertDialogState, AlertDialogSetProps } from '@bugofbook/react/reducer/feedback'

export function useAlertDialog<T extends Record<string, unknown>>(prop: alertToastState<T>): {
    state: alertDialogState<T>,
    onOpen: (config?: AlertDialogSetProps<T>) => void,
    onClose: () => void,
    onClearConfig: () => void,
    onConfirm: (prop?: unknown) => void,
} {
    const [state, dispatch] =  useReducer<alertDialogReducer<T>>(alertDialogReducer, initializeAlertDialogState(prop));
    const onOpen = useCallback((config?: AlertDialogSetProps<T>) => {
        if (config) {
            dispatch(createAlertDialogAction.setConfig(config));
        }
        requestAnimationFrame(() => {
            dispatch(createAlertDialogAction.open());
        });
    }, []);
    const onClose = useCallback(() => {
        dispatch(createAlertDialogAction.close());
    }, []);
    const onClearConfig = useCallback(() => {
        dispatch(createAlertDialogAction.clearConfig());
    }, []);
    const onConfirm = useCallback((prop?: unknown) => {
        if (state.onConfirm) {
            state.onConfirm(prop);
        }
        onClose()
    }, [state, onClose]);
    return ({
        state,
        onOpen,
        onClose,
        onClearConfig,
        onConfirm,
    })
}