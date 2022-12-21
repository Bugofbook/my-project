import { Reducer } from "react";
import { state, openAction, closeAction, setConfigAction, clearConfigAction} from './core'

type yesnocancelDialogAppendKey = 'title' | 'content' | 'yesText' | 'cancelText' | 'noText';
type yesDialogMethod = (prop: 'yes') => void;
type noDialogMethod = (prop: 'no') => void;
type cancelDialogMethod = (prop: 'cancel') => void;
export type yesnocancelDialogState<T extends Record<string, any>> = state<T> & Partial<Record<yesnocancelDialogAppendKey, string>> & {
    onYes?: yesDialogMethod;
    onNo?: noDialogMethod;
    onCancel?: cancelDialogMethod;
}
type openYesnocancelDialogAction = openAction
type closeYesnocancelDialogAction = closeAction;
type setConfigYesnocancelDialogAction<T extends Record<string, any>> = setConfigAction<T> & Partial<Record<yesnocancelDialogAppendKey, string>> & {
    onYes?: yesDialogMethod;
    onNo?: noDialogMethod;
    onCancel?: cancelDialogMethod;
}
type clearConfigYesnocancelDialogAction = clearConfigAction;
type yesnocancelDialogAction<T extends Record<string, any>> = openYesnocancelDialogAction | closeYesnocancelDialogAction | setConfigYesnocancelDialogAction<T> | clearConfigYesnocancelDialogAction;
export type yesnocancelDialogReducer<T extends Record<string, any>> = Reducer<yesnocancelDialogState<T>, yesnocancelDialogAction<T>>;
export function yesnocancelDialogReducer<T extends Record<string, any>>(state: yesnocancelDialogState<T>, action: yesnocancelDialogAction<T>): yesnocancelDialogState<T> {
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
                yesText: action.yesText,
                cancelText: action.cancelText,
                noText: action.noText,
                onYes: action.onYes,
                onNo: action.onNo,
                onCancel: action.onCancel,
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
export function initYesnocancelDialogState<T extends Record<string, any>>(initOpen: boolean): yesnocancelDialogState<T> {
    return ({
        open: initOpen,
    })
}
function createOpenAction(): openAction {
    return ({
        type: 'open',
    })
}
function createCloseAction(): closeAction {
    return ({
        type: 'close',
    })
}
function createSetConfigAction<T extends Record<string, any>>({config, title, content, yesText, cancelText, noText, onYes, onNo, onCancel}: {config: T, title?: string, content?: string, yesText?: string, cancelText?: string, noText?: string, onYes?: yesDialogMethod, onNo?: noDialogMethod, onCancel?: cancelDialogMethod}): setConfigYesnocancelDialogAction<T> {
    return ({
        type: 'setConfig',
        config,
        title,
        content,
        yesText,
        cancelText,
        noText,
        onYes,
        onNo,
        onCancel,
    })
}
function createClearConfigAction(): clearConfigYesnocancelDialogAction {
    return ({
        type: 'clearConfig',
    })
}
export const createYesnocancelDialogAction = {
    open: createOpenAction,
    close: createCloseAction,
    setConfig: createSetConfigAction,
    clearConfig: createClearConfigAction,
}