import { useReducer, useMemo } from "react";
import { yesnoDialogReducer, initYesnoDialogState, createYesnoDialogAction, yesnoDialogState, useProps } from '@bugofbook/react/reducer/feedback'

export function useYesnoDialog<T extends Record<string, any>>({initOpen}: useProps): [yesnoDialogState<T>, {open: (config: T) => void, close: () => void}] {
    const [state, dispatch] =  useReducer<yesnoDialogReducer<T>>(yesnoDialogReducer, initYesnoDialogState(initOpen));
    const action = useMemo(() => {
        const open = (prop: T) => {
            dispatch(createYesnoDialogAction.setConfig(prop));
            requestAnimationFrame(() => {
                dispatch(createYesnoDialogAction.open());
            });
        }
        const close = () => {
            dispatch(createYesnoDialogAction.clearConfig());
            requestAnimationFrame(() => {
                dispatch(createYesnoDialogAction.close());
            });
        }
        return {
            open,
            close,
        }
    }, []);
    return [state, action]
}