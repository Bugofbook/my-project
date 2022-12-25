import { Reducer } from "react";
import { State, OpenAction, CloseAction, SetConfigAction, ClearConfigAction, InitialProps, SetProps} from './core'

type yesnoDialogAppendKey = 'title' | 'content' | 'yesText' | 'noText';
type yesDialogMethod = (prop: unknown) => unknown;
type noDialogMethod = (prop: unknown) => unknown;
export type YesnoDialogState<T extends Record<string, unknown>> = State<T> & Partial<Record<yesnoDialogAppendKey, string>> & {
    onYes?: yesDialogMethod;
    onNo?: noDialogMethod;
}
type openYesnoDialogAction = OpenAction
type closeYesnoDialogAction = CloseAction;
type setConfigYesnoDialogAction<T extends Record<string, unknown>> = SetConfigAction<T> & Partial<Record<yesnoDialogAppendKey, string>> & {
    onYes?: yesDialogMethod;
    onNo?: noDialogMethod;
}
type clearConfigYesnoDialogAction = ClearConfigAction;
type yesnoDialogAction<T extends Record<string, unknown>> = openYesnoDialogAction | closeYesnoDialogAction | setConfigYesnoDialogAction<T> | clearConfigYesnoDialogAction;
export type yesnoDialogReducer<T extends Record<string, unknown>> = Reducer<YesnoDialogState<T>, yesnoDialogAction<T>>;
export function yesnoDialogReducer<T extends Record<string, unknown>>(state: YesnoDialogState<T>, action: yesnoDialogAction<T>): YesnoDialogState<T> {
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
export type YesnoDialogInitialProps<T extends Record<string, unknown>> = InitialProps<T> & Partial<Record<yesnoDialogAppendKey, string>> & {
    onYes?: yesDialogMethod;
    onNo?: noDialogMethod;
}
export function initializeYesnoDialogState<T extends Record<string, unknown>>(prop: InitialProps<T>): YesnoDialogState<T> {
    return prop
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
export type SetConfigYesnoDialogProps<T extends Record<string, unknown>> = SetProps<T> & Partial<Record<yesnoDialogAppendKey, string>> & {
    onYes?: yesDialogMethod;
    onNo?: noDialogMethod;
}
function createSetConfigAction<T extends Record<string, unknown>>(prop: SetConfigYesnoDialogProps<T>): setConfigYesnoDialogAction<T> {
    return ({
        type: 'setConfig',
        ...prop
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