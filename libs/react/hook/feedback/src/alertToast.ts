import { useReducer, useCallback } from "react";
import { alertToastReducer, initializeAlertToastState, createAlertToastAction, alertToastState, AlertToastSetProps } from '@bugofbook/react/reducer/feedback'

export function useAlertToast<T extends Record<string, unknown>>(prop: alertToastState<T>): {
    state: alertToastState<T>,
    onOpen: (config?: AlertToastSetProps<T>) => void,
    onClose: () => void,
} {
    const [state, dispatch] =  useReducer<alertToastReducer<T>>(alertToastReducer, initializeAlertToastState(prop));
    const onOpen = useCallback((config?: AlertToastSetProps<T>) => {
        if (config) {
            dispatch(createAlertToastAction.setConfig(config));
        }
        requestAnimationFrame(() => {
            dispatch(createAlertToastAction.open());
        });
    }, []);
    const onClose = useCallback(() => {
        dispatch(createAlertToastAction.clearConfig());
        requestAnimationFrame(() => {
            dispatch(createAlertToastAction.close());
        });
    }, []);
    return ({
        state,
        onOpen,
        onClose,
    })
}