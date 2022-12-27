import { useReducer, useCallback } from "react";
import { yesnoDialogReducer, initializeYesnoDialogState, createYesnoDialogAction, YesnoDialogState, SetConfigYesnoDialogProps } from '@bugofbook/react/reducer/feedback'

export function useYesnoDialog<T extends Record<string, unknown>>(initialProps: YesnoDialogState<T>): {
    state: YesnoDialogState<T>,
    onOpen: (props?: SetConfigYesnoDialogProps<T>) => void,
    onClose: () => void,
    onClearConfig: () => void,
    onYes: (prop?: unknown) => void,
    onNo: (prop?: unknown) => void,
} {
    const [state, dispatch] =  useReducer<yesnoDialogReducer<T>>(yesnoDialogReducer, initializeYesnoDialogState(initialProps));
    const onOpen = useCallback((props?: SetConfigYesnoDialogProps<T>) => {
        if (props) {
            dispatch(createYesnoDialogAction.setConfig(props));
        }
        requestAnimationFrame(() => {
            dispatch(createYesnoDialogAction.open());
        });
    }, []);
    const onClose = useCallback(() => {
        dispatch(createYesnoDialogAction.close());
    }, []);
    const onClearConfig = useCallback(() => {
        dispatch(createYesnoDialogAction.clearConfig());
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
    return ({
        state,
        onOpen,
        onClose,
        onClearConfig,
        onYes,
        onNo,
    })
}