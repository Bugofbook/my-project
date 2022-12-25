type BasicModalKey = 'open'
type BasicReducerKey = 'type'
type BasicConfigExcludeKey = BasicModalKey | BasicReducerKey
type OpenActionKey = 'open'
type CloseActionKey = 'close'
type SetConfigActionKey = 'setConfig'
type ClearConfigActionKey = 'clearConfig'


export type BasicState = Record<BasicModalKey, boolean>
export type State<T extends Record<string, unknown>> = BasicState & T | BasicState

export type UseProps = {
    initOpen: boolean;
}
export type InitialProps<T extends Omit<Record<string, unknown>, BasicReducerKey>> = Record<BasicModalKey, boolean> & T | Record<BasicModalKey, boolean>
export type SetProps<T extends Record<string, unknown>> = Partial<Omit<T, BasicModalKey | BasicReducerKey>>
export type OpenAction = Readonly<Record<BasicReducerKey, OpenActionKey>>
export type CloseAction = Readonly<Record<BasicReducerKey, CloseActionKey>>
export type SetConfigAction<T extends Record<string, unknown>> = Readonly<Record<BasicReducerKey, SetConfigActionKey>> & Omit<T, BasicConfigExcludeKey> | Readonly<Record<BasicReducerKey, SetConfigActionKey>>
export type ClearConfigAction = Readonly<Record<BasicReducerKey, ClearConfigActionKey>>
