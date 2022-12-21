import { Reducer } from "react";
import { state, openAction, closeAction, setConfigAction, clearConfigAction} from './core'

type alertDialogAppendKey = 'title' | 'content' | 'confirmText';
type alertDialogMethod = (prop: string) => void;
export type alertDialogState<T extends Record<string, any>> = state<T> & Partial<Record<alertDialogAppendKey, string>> & {
    onConfirm?: alertDialogMethod;
}
type openAlertDialogAction = openAction
type closeAlertDialogAction = closeAction;
type setConfigAlertDialogAction<T extends Record<string, any>> = setConfigAction<T> & Partial<Record<alertDialogAppendKey, string>> & {
    onConfirm?: alertDialogMethod;
}
type clearConfigAlertDialogAction = clearConfigAction;
type alertDialogAction<T extends Record<string, any>> = openAlertDialogAction | closeAlertDialogAction | setConfigAlertDialogAction<T> | clearConfigAlertDialogAction;
export type alertDialogReducer<T extends Record<string, any>> = Reducer<alertDialogState<T>, alertDialogAction<T>>;
export function alertDialogReducer<T extends Record<string, any>>(state: alertDialogState<T>, action: alertDialogAction<T>): alertDialogState<T> {
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
            return ({
                ...state,
                config: action.config,
                title: action.title,
                content: action.content,
                confirmText: action.confirmText,
                onConfirm: action.onConfirm,
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
export function initAlertDialogState<T extends Record<string, any>>(initOpen: boolean): alertDialogState<T> {
    return ({
        open: initOpen,
    })
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
function createSetConfigAction<T extends Record<string, any>>({title, content, confirmText, onConfirm, config}: {title?: string, content?: string, confirmText?: string, onConfirm?: alertDialogMethod, config?: T}): setConfigAlertDialogAction<T> {
    if (config) {
        return ({
            type: 'setConfig',
            title,
            content,
            confirmText,
            onConfirm,
            config
        })
    } else {
        return ({
            type: 'setConfig',
            title,
            content,
            confirmText,
            onConfirm,
        })
    }
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
