import { Reducer } from "react";
import { State, OpenAction, CloseAction, SetConfigAction, ClearConfigAction, InitialProps, SetProps} from './core'

type alertToastAppendKey = 'toastType'| 'title' | 'content'
export type alertToastState<T extends Record<string, unknown>> = State<T> & Partial<Record<alertToastAppendKey, string>>
type openAlertToastAction = OpenAction
type closeAlertToastAction = CloseAction;
type setConfigAlertToastAction<T extends Record<string, unknown>> = SetConfigAction<T> & Partial<Record<alertToastAppendKey, string>>
type clearConfigAlertToastAction = ClearConfigAction;
type alertToastAction<T extends Record<string, unknown>> = openAlertToastAction | closeAlertToastAction | setConfigAlertToastAction<T> | clearConfigAlertToastAction;
export type alertToastReducer<T extends Record<string, unknown>> = Reducer<alertToastState<T>, alertToastAction<T>>;
export function alertToastReducer<T extends Record<string, unknown>>(state: alertToastState<T>, action: alertToastAction<T>): alertToastState<T> {
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
export type alertInitialStateProps<T extends Record<string, unknown>> = InitialProps<T> & Partial<Record<alertToastAppendKey, string>>
export function initializeAlertToastState<T extends Record<string, unknown>>(prop: InitialProps<T>): alertToastState<T> {
    return prop
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
export type AlertToastSetProps<T extends Record<string, unknown>> = SetProps<T> & Partial<Record<alertToastAppendKey, string>>
function createSetConfigAction<T extends Record<string, unknown>>(prop: AlertToastSetProps<T>): setConfigAlertToastAction<T> {
    return ({
        type: 'setConfig',
        ...prop,
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