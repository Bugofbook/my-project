import { useReducer, useMemo } from "react";
import { modalReducer, initModalState, createModalAction, useProps, modalState } from '@bugofbook/react/reducer/feedback'



export function useModal<T extends Record<string, any>>({initOpen}: useProps): [modalState<T>, {open: (config: T) => void, close: () => void}] {
    const [state, dispatch] = useReducer<modalReducer<T>>(modalReducer, initModalState<T>(initOpen));
    const action = useMemo(() => {
        const open = (config: T) => {
            dispatch(createModalAction.setConfig(config));
            requestAnimationFrame(() => {
                dispatch(createModalAction.open());
            });
        }
        const close = () => {
            dispatch(createModalAction.clearConfig());
            requestAnimationFrame(() => {
                dispatch(createModalAction.close());
            });
        }
        return {
            open,
            close,
        }
    }, []);
    return [state, action]
}
