export type state<T extends Record<string, any>> = {
    open: boolean;
    config?: T;
}

export interface useProps {
    initOpen: boolean;
}
export type openAction = {
    type: 'open';
}

export type closeAction = {
    type: 'close';
}

export type setConfigAction<T extends Record<string, any>> = {
    type: 'setConfig';
    config?: T;
}
export type clearConfigAction = {
    type: 'clearConfig';
}