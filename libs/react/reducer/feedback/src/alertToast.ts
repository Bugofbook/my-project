import { Reducer } from "react";
import { state, openAction, closeAction, setConfigAction, clearConfigAction} from './core'

type alertToastAppendKey = 'toastType'| 'title' | 'content'
export type alertToastState<T extends Record<string, any>> = state<T> & Partial<Record<alertToastAppendKey, string>>
type openAlertToastAction = openAction
type closeAlertToastAction = closeAction;
type setConfigAlertToastAction<T extends Record<string, any>> = setConfigAction<T> & Partial<Record<alertToastAppendKey, string>>
type clearConfigAlertToastAction = clearConfigAction;
type alertToastAction<T extends Record<string, any>> = openAlertToastAction | closeAlertToastAction | setConfigAlertToastAction<T> | clearConfigAlertToastAction;
export type alertToastReducer<T extends Record<string, any>> = Reducer<alertToastState<T>, alertToastAction<T>>;
export function alertToastReducer<T extends Record<string, any>>(state: alertToastState<T>, action: alertToastAction<T>): alertToastState<T> {
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
                toastType: action.toastType,
                title: action.title,
                content: action.content,
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
export function initAlertToastState<T extends Record<string, any>>(initOpen: boolean): alertToastState<T> {
    return ({
        open: initOpen,
    })
}
function createOpenAction(): openAlertToastAction {
    return ({
        type: 'open',
    }) 
}
function createCloseAction(): closeAlertToastAction {
    return ({
        type: 'close',
    })
}
function createSetConfigAction<T extends Record<string, any>>({config, toastType, title, content}: {config?: T, toastType?: string, title?: string, content?: string}): setConfigAlertToastAction<T> {
    return ({
        type: 'setConfig',
        config,
        toastType,
        title,
        content,
    })
}
function createClearConfigAction(): clearConfigAlertToastAction {
    return ({
        type: 'clearConfig',
    })
}
export const createAlertToastAction = {
    open: createOpenAction,
    close: createCloseAction,
    setConfig: createSetConfigAction,
    clearConfig: createClearConfigAction,
}