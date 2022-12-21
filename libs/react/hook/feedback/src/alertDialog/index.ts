import { useReducer, useMemo } from "react";
import { alertDialogReducer, initAlertDialogState, createAlertDialogAction, useProps, alertDialogState } from '@bugofbook/react/reducer/feedback'

export function useAlertDialog<T extends Record<string, any>>({initOpen}: useProps): [alertDialogState<T>, {open: (config: T) => void, close: () => void}] {
    const [state, dispatch] =  useReducer<alertDialogReducer<T>>(alertDialogReducer, initAlertDialogState(initOpen));
    const action = useMemo(() => {
        const open = (config: T) => {
            dispatch(createAlertDialogAction.setConfig(config));
            requestAnimationFrame(() => {
                dispatch(createAlertDialogAction.open());
            });
        }
        const close = () => {
            dispatch(createAlertDialogAction.clearConfig());
            requestAnimationFrame(() => {
                dispatch(createAlertDialogAction.close());
            });
        }
        return {
            open,
            close,
        }
    }, []);
    return [state, action]
}