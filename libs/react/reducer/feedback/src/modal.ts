import { Reducer } from "react";
import { State, OpenAction, CloseAction, SetConfigAction, ClearConfigAction, InitialProps, SetProps} from './core'

type ModalAction<T extends Record<string, unknown>> = OpenAction | CloseAction | SetConfigAction<T> | ClearConfigAction;
export type ModalState<T extends Record<string, unknown>> = State<T>;
export type modalReducer<T extends Record<string, unknown>> = Reducer<State<T>, ModalAction<T>>;
export function modalReducer<T extends Record<string, unknown>>(state: State<T>, action: ModalAction<T>): State<T> {
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
export type ModalInitialProps<T extends Record<string, unknown>> = InitialProps<T>
export function initializeModalState<T extends Record<string, unknown>>(prop: ModalInitialProps<T>): ModalState<T> {
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
export type ModalSetProps<T extends Record<string, unknown>> = SetProps<T>
function createSetConfigAction<T extends Record<string, unknown>>(config: ModalSetProps<T>): SetConfigAction<T> {
    return ({
        type: 'setConfig',
        ...config,
    })
}
function createClearConfigAction(): ClearConfigAction {
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