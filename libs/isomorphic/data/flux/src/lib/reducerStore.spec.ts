import createReducerStore from './reducerStore'
type Action = {
  type: 'add-type1',
  payload: number,
} | {
  type: 'minus-type1',
  payload: number,
} | {
  type: 'add-type2',
  payload: number,
} | {
  type: 'minus-type2',
  payload: number,
} | {
  type: 'add',
  payload: {
    type1: number,
    type2: number,
  },
} | {
  type: 'minus',
  payload: {
    type1: number,
    type2: number,
  },
} | {
  type: 'set',
  payload: {
    type1: number,
    type2: number,
  },
} | {
  type: 'reset',
}

type State = {
  type1: number,
  type2: number,
}

const reducer = (state: State, action: Action, initState: State) => {
  switch (action.type) {
    case 'add-type1':
      return {
        ...state,
        type1: state.type1 + action.payload,
      }
    case 'minus-type1': {
      return {
        ...state,
        type1: state.type1 - action.payload,
      }
    }
    case 'add-type2': {
      return {
        ...state,
        type2: state.type2 + action.payload,
      }
    }
    case 'minus-type2': {
      return {
        ...state,
        type2: state.type2 - action.payload,
      }
    }
    case 'add': {
      return {
        type1: state.type1 + action.payload.type1,
        type2: state.type2 + action.payload.type2,
      }
    }
    case 'minus': {
      return {
        type1: state.type1 - action.payload.type1,
        type2: state.type2 - action.payload.type2,
      }
    }
    case 'set': {
      return {
        type1: action.payload.type1,
        type2: action.payload.type2,
      }
    }
    case 'reset':
      return initState;
    default:
      return state;
  }
}
describe('reducerStore', () => {
  const store = createReducerStore(reducer, {
    type1: 0,
    type2: 0,
  });
  it('case1', () => {
    store.dispatch({
      type: 'set',
      payload: {
        type1: 1,
        type2: 0,
      },
    })
    expect(store.getStore()).toEqual({
      type1: 1,
      type2: 0,
    })
  });
  it('case2', () => {
    function getStoreSnapshotType1() {
      return store.getStoreSnapshot((currentStore) => {
        return currentStore.type1;
      })
    }
    store.dispatch({
      type: 'reset',
    })
    store.dispatch({
      type: 'add-type1',
      payload: 3,
    })
    store.dispatch({
      type: 'minus-type1',
      payload: 1,
    })
    store.dispatch({
      type: 'add-type2',
      payload: 3,
    })
    expect(getStoreSnapshotType1()()).toEqual(2);
  });
  it('case3', () => {
    function getStoreSnapshotTypeTotal() {
      return store.getStoreSnapshot((currentStore) => {
        return currentStore.type2 + currentStore.type1;
      })
    }
    store.dispatch({
      type: 'reset',
    })
    store.dispatch({
      type: 'add-type1',
      payload: 3,
    })
    store.dispatch({
      type: 'minus-type1',
      payload: 1,
    })
    store.dispatch({
      type: 'add-type2',
      payload: 3,
    })
    store.dispatch({
      type: 'minus-type2',
      payload: 1,
    })
    expect(getStoreSnapshotTypeTotal()()).toEqual(4);
  });
  it('case4', () => {
    store.dispatch({
      type: 'reset',
    })
    store.dispatch({
      type: 'add',
      payload: {
        type1: 3,
        type2: 5,
      }
    })
    store.dispatch({
      type: 'minus',
      payload: {
        type1: 1,
        type2: 2,
      }
    })
    expect(store.getStore()).toEqual({
      type1: 2,
      type2: 3,
    })
  })
});
