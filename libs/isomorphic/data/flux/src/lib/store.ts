type ListenerCallback = () => void;
type Action<Type extends string = string> = {
    type: Type,
}
interface AnyAction extends Action {
    payload: any
}
interface UnknowAction extends Action {
    payload: unknown
}
type Reducer<State, A extends Action = UnknowAction> = (state: State, action: A, initState: State) => State;

export function createStore<State, A extends Action<string>>(reducer: Reducer<State, A>, initState: State) {
    const listeners: Set<ListenerCallback> = new Set();
    let store = initState
    const dispatch = (action: A) => {
        store = reducer(store, action, initState);
        listeners.forEach((cb) => cb());
    }
    const subscribe = (cb: ListenerCallback) => {
        listeners.add(cb);
        return () => {
            listeners.delete(cb);
        }
    }
    const getStore = () => {
        return store;
    }
    return {
        dispatch,
        subscribe,
        getStore,
    }
}
