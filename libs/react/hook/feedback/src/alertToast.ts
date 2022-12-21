import { useReducer, useMemo } from "react";
import { alertToastReducer, initAlertToastState, createAlertToastAction, alertToastState, useProps } from '@bugofbook/react/reducer/feedback'

export function useAlertToast<T extends Record<string, any>>({initOpen}: useProps): [alertToastState<T>, {open: (config: T) => void, close: () => void}] {
    const [state, dispatch] =  useReducer<alertToastReducer<T>>(alertToastReducer, initAlertToastState(initOpen));
    const action = useMemo(() => {
        const open = ({config, toastType, title, content}: {config?: T, toastType?: string, title?:string, content?:string } = {}) => {
            dispatch(createAlertToastAction.setConfig({config, toastType, title, content}));
            requestAnimationFrame(() => {
                dispatch(createAlertToastAction.open());
            });
        }
        const close = () => {
            dispatch(createAlertToastAction.clearConfig());
            requestAnimationFrame(() => {
                dispatch(createAlertToastAction.close());
            });
        }
        return {
            open,
            close,
        }
    }, []);
    return [state, action]
}