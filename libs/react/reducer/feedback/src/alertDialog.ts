import { Reducer } from "react";
import { State, OpenAction, CloseAction, SetConfigAction, ClearConfigAction, InitialProps, SetProps} from './core'

type alertDialogAppendKey = 'title' | 'content' | 'confirmText';
type alertDialogMethod = (prop: unknown) => unknown;
export type alertDialogState<T extends Record<string, unknown>> = State<T> & Partial<Record<alertDialogAppendKey, string>> & {
    onConfirm?: alertDialogMethod;
}
type openAlertDialogAction = OpenAction
type closeAlertDialogAction = CloseAction;
type setConfigAlertDialogAction<T extends Record<string, unknown>> = SetConfigAction<T> & Partial<Record<alertDialogAppendKey, string>> & {
    onConfirm?: alertDialogMethod;
}
type clearConfigAlertDialogAction = ClearConfigAction;
type alertDialogAction<T extends Record<string, unknown>> = openAlertDialogAction | closeAlertDialogAction | setConfigAlertDialogAction<T> | clearConfigAlertDialogAction;
export type alertDialogReducer<T extends Record<string, unknown>> = Reducer<alertDialogState<T>, alertDialogAction<T>>;
export function alertDialogReducer<T extends Record<string, unknown>>(state: alertDialogState<T>, action: alertDialogAction<T>): alertDialogState<T> {
    switch (action.type) {
        case 'open': {
            return ({
                ...state,
                open: true,
            })
        }
        case 'close': {
            return ({
                ...state,
                open: false,
            })
        }
        case 'setConfig': {
            const {type, ...others} = action
            return ({
                ...state,
                ...others,
            })
        }
        case 'clearConfig': {
            return ({
                open: state.open,
            })
        }
        default: {
            return state
        }
    }
}
export type AlertDialogInitialProps<T extends Record<string, unknown>> = InitialProps<T> & Partial<Record<alertDialogAppendKey, string>> & {
    onConfirm?: alertDialogMethod;
}
export function initializeAlertDialogState<T extends Record<string, unknown>>(prop: AlertDialogInitialProps<T>): alertDialogState<T> {
    return prop
}
function createOpenAction(): openAlertDialogAction {
    return ({
        type: 'open',
    }) 
}
function createCloseAction(): closeAlertDialogAction {
    return ({
        type: 'close',
    })
}
export type AlertDialogSetProps<T extends Record<string, unknown>> = SetProps<T> & Partial<Record<alertDialogAppendKey, string>>
function createSetConfigAction<T extends Record<string, unknown>>(prop: AlertDialogSetProps<T>): setConfigAlertDialogAction<T> {
    return ({
        type: 'setConfig',
        ...prop,
    })
}
function createClearConfigAction(): clearConfigAlertDialogAction {
    return ({
        type: 'clearConfig',
    })
}

export const createAlertDialogAction = {
    open: createOpenAction,
    close: createCloseAction,
    setConfig: createSetConfigAction,
    clearConfig: createClearConfigAction,
}
