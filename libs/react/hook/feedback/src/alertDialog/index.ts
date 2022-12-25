import { useReducer, useCallback } from "react";
import { alertDialogReducer, initializeAlertDialogState, createAlertDialogAction, alertToastState, alertDialogState } from '@bugofbook/react/reducer/feedback'

export function useAlertDialog<T extends Record<string, unknown>>(prop: alertToastState<T>): {
    state: alertDialogState<T>,
    onOpen: (config?: T) => void,
    onClose: () => void,
    onConfirm: (prop?: unknown) => void,
} {
    const [state, dispatch] =  useReducer<alertDialogReducer<T>>(alertDialogReducer, initializeAlertDialogState(prop));
    const onOpen = useCallback((config?: T) => {
        if (config) {
            dispatch(createAlertDialogAction.setConfig(config));
        }
        requestAnimationFrame(() => {
            dispatch(createAlertDialogAction.open());
        });
    }, []);
    const onClose = useCallback(() => {
        dispatch(createAlertDialogAction.close());
        requestAnimationFrame(() => {
            dispatch(createAlertDialogAction.clearConfig());
        });
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
        onConfirm,
    })
}