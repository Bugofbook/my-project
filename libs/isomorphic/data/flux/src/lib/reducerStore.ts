interface Action<Type extends string = string> {
    type: Type;
}
interface UnknownAction<Type extends string = string> extends Action<Type> {
    payload?: unknown;
    meta?: unknown;
}
type Reducer<State, A extends Action = UnknownAction<string>> = (state: State, action: A, initialState: State) => State;

export default function createReducerStore<State, A extends UnknownAction<string>>(reducer: Reducer<State, A>, initialState: State) {
    let store = initialState;
    const dispatch = (action: A) => {
        store = reducer(store, action, initialState);
    };
    const getStore = () => store;
    const getStoreSnapshot = <T>(selector: (currentStore: State) => T) => {
        return () => selector(store);
    };
    return {
        dispatch,
        getStore,
        getStoreSnapshot,
    };
}
