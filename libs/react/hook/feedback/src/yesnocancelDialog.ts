import { useReducer, useCallback } from "react";
import { yesnocancelDialogReducer, initializeYesnocancelDialogState, createAlertToastAction, yesnocancelDialogState, SetConfigYesnoDialogProps } from "@bugofbook/react/reducer/feedback";

export function useYesnocancelDialog<T extends Record<string, unknown>>(initialProp: yesnocancelDialogState<T>): {
    state: yesnocancelDialogState<T>,
    onOpen: (config?: SetConfigYesnoDialogProps<T>) => void,
    onClose: () => void,
    onClearConfig: () => void,
    onYes: (prop?: unknown) => void,
    onNo: (prop?: unknown) => void,
    onCancel: (prop?: unknown) => void,
} {
    const [state, dispatch] =  useReducer<yesnocancelDialogReducer<T>>(yesnocancelDialogReducer, initializeYesnocancelDialogState(initialProp));
    const onOpen = useCallback((config?: SetConfigYesnoDialogProps<T>) => {
        if (config) {
            dispatch(createAlertToastAction.setConfig(config));
        }
        requestAnimationFrame(() => {
            dispatch(createAlertToastAction.open());
        });
    }, []);
    const onClose = useCallback(() => {
        dispatch(createAlertToastAction.close());
    }, []);
    const onClearConfig = useCallback(() => {
        dispatch(createAlertToastAction.clearConfig());
    }, []);
    const onYes = useCallback((prop?: unknown) => {
        if (state.onYes) {
            state.onYes(prop);
        }
        onClose()
    }, [state, onClose]);
    const onNo = useCallback((prop?: unknown) => {
        if (state.onNo) {
            state.onNo(prop);
        }
        onClose()
    }, [state, onClose]);
    const onCancel = useCallback((prop?: unknown) => {
        if (state.onCancel) {
            state.onCancel(prop);
        }
        onClose()
    }, [state, onClose]);
    return ({
        state,
        onOpen,
        onClose,
        onClearConfig,
        onYes,
        onNo,
        onCancel,
    })
}