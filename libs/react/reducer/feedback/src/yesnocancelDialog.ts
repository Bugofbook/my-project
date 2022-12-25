import { Reducer } from "react";
import { State, OpenAction, CloseAction, SetConfigAction, ClearConfigAction, InitialProps, SetProps} from './core'

type yesnocancelDialogAppendKey = 'title' | 'content' | 'yesText' | 'cancelText' | 'noText';
type yesDialogMethod = (prop: unknown) => void;
type noDialogMethod = (prop: unknown) => void;
type cancelDialogMethod = (prop: unknown) => void;
export type yesnocancelDialogState<T extends Record<string, unknown>> = State<T> & Partial<Record<yesnocancelDialogAppendKey, string>> & {
    onYes?: yesDialogMethod;
    onNo?: noDialogMethod;
    onCancel?: cancelDialogMethod;
}
type openYesnocancelDialogAction = OpenAction
type closeYesnocancelDialogAction = CloseAction;
type setConfigYesnocancelDialogAction<T extends Record<string, unknown>> = SetConfigAction<T> & Partial<Record<yesnocancelDialogAppendKey, string>> & {
    onYes?: yesDialogMethod;
    onNo?: noDialogMethod;
    onCancel?: cancelDialogMethod;
}
type clearConfigYesnocancelDialogAction = ClearConfigAction;
type yesnocancelDialogAction<T extends Record<string, unknown>> = openYesnocancelDialogAction | closeYesnocancelDialogAction | setConfigYesnocancelDialogAction<T> | clearConfigYesnocancelDialogAction;
export type yesnocancelDialogReducer<T extends Record<string, unknown>> = Reducer<yesnocancelDialogState<T>, yesnocancelDialogAction<T>>;
export function yesnocancelDialogReducer<T extends Record<string, unknown>>(state: yesnocancelDialogState<T>, action: yesnocancelDialogAction<T>): yesnocancelDialogState<T> {
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
export type YesnocancelDialogInitialProps<T extends Record<string, unknown>> = InitialProps<T> & Partial<Record<yesnocancelDialogAppendKey, string>> & {
    onYes?: yesDialogMethod;
    onNo?: noDialogMethod;
    onCancel?: cancelDialogMethod;
}
export function initializeYesnocancelDialogState<T extends Record<string, unknown>>(prop: InitialProps<T>): yesnocancelDialogState<T> {
    return prop
}
function createOpenAction(): OpenAction {
    return ({
        type: 'open',
    })
}
function createCloseAction(): CloseAction {
    return ({
        type: 'close',
    })
}
export type YesnocancelDialogSetProps<T extends Record<string, unknown>> = SetProps<T> & Partial<Record<yesnocancelDialogAppendKey, string>> & {
    onYes?: yesDialogMethod;
    onNo?: noDialogMethod;
    onCancel?: cancelDialogMethod;
}
function createSetConfigAction<T extends Record<string, unknown>>(prop: YesnocancelDialogSetProps<T>): setConfigYesnocancelDialogAction<T> {
    return ({
        type: 'setConfig',
        ...prop
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