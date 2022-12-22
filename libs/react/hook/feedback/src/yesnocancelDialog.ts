import { useReducer, useMemo } from "react";
import { yesnocancelDialogReducer, initYesnocancelDialogState, createAlertToastAction, yesnocancelDialogState, useProps } from "@bugofbook/react/reducer/feedback";

export function useYesnocancelDialog<T extends Record<string, any>>({initOpen}: useProps): [yesnocancelDialogState<T>, {open: (config: T) => void, close: () => void}] {
    const [state, dispatch] =  useReducer<yesnocancelDialogReducer<T>>(yesnocancelDialogReducer, initYesnocancelDialogState(initOpen));
    const action = useMemo(() => {
        const open = (prop: T) => {
            dispatch(createAlertToastAction.setConfig(prop));
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