import { Reducer } from "react";
import { state, openAction, closeAction, setConfigAction, clearConfigAction} from './core'

type modalAction<T extends Record<string, any>> = openAction | closeAction | setConfigAction<T> | clearConfigAction;
export type modalState<T extends Record<string, any>> = state<T>;
export type modalReducer<T extends Record<string, any>> = Reducer<state<T>, modalAction<T>>;
export function modalReducer<T extends Record<string, any>>(state: state<T>, action: modalAction<T>): state<T> {
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

export function initModalState<T extends Record<string, any>>(initOpen: boolean): state<T> {
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
function createSetConfigAction<T extends Record<string, any>>(config: T): setConfigAction<T> {
    return ({
        type: 'setConfig',
        config,
    })
}
function createClearConfigAction(): clearConfigAction {
    return ({
        type: 'clearConfig',
    })
}
export const createModalAction = {
    open: createOpenAction,
    close: createCloseAction,
    setConfig: createSetConfigAction,
    clearConfig: createClearConfigAction
}