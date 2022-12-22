import { Reducer } from "react";
import { state, openAction, closeAction, setConfigAction, clearConfigAction} from './core'

type yesnoDialogAppendKey = 'title' | 'content' | 'yesText' | 'noText';
type yesDialogMethod = (prop: 'yes') => void;
type noDialogMethod = (prop: 'no') => void;
export type yesnoDialogState<T extends Record<string, any>> = state<T> & Partial<Record<yesnoDialogAppendKey, string>> & {
    onYes?: yesDialogMethod;
    onNo?: noDialogMethod;
}
type openYesnoDialogAction = openAction
type closeYesnoDialogAction = closeAction;
type setConfigYesnoDialogAction<T extends Record<string, any>> = setConfigAction<T> & Partial<Record<yesnoDialogAppendKey, string>> & {
    onYes?: yesDialogMethod;
    onNo?: noDialogMethod;
}
type clearConfigYesnoDialogAction = clearConfigAction;
type yesnoDialogAction<T extends Record<string, any>> = openYesnoDialogAction | closeYesnoDialogAction | setConfigYesnoDialogAction<T> | clearConfigYesnoDialogAction;
export type yesnoDialogReducer<T extends Record<string, any>> = Reducer<yesnoDialogState<T>, yesnoDialogAction<T>>;
export function yesnoDialogReducer<T extends Record<string, any>>(state: yesnoDialogState<T>, action: yesnoDialogAction<T>): yesnoDialogState<T> {
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
                noText: action.noText,
                onYes: action.onYes,
                onNo: action.onNo,
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
export function initYesnoDialogState<T extends Record<string, any>>(initOpen: boolean): yesnoDialogState<T> {
    return ({
        open: initOpen,
    })
}
function createOpenAction(): openYesnoDialogAction {
    return ({
        type: 'open',
    }) 
}
function createCloseAction(): closeYesnoDialogAction {
    return ({
        type: 'close',
    })
}
function createSetConfigAction<T extends Record<string, any>>({config, title, content, yesText, noText, onYes, onNo}: {config?: T, title?: string, content?: string, yesText?: string, noText?: string, onYes?: yesDialogMethod, onNo?: noDialogMethod}): setConfigYesnoDialogAction<T> {
    return ({
        type: 'setConfig',
        config,
        title,
        content,
        yesText,
        noText,
        onYes,
        onNo,
    })
}
function createClearConfigAction(): clearConfigYesnoDialogAction {
    return ({
        type: 'clearConfig',
    })
}
export const createYesnoDialogAction = {
    open: createOpenAction,
    close: createCloseAction,
    setConfig: createSetConfigAction,
    clearConfig: createClearConfigAction,
}