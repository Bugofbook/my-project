// state pattern store
type StateItem<StateName extends string> = {
  state: StateName;
} & Record<string, unknown>;

type ChangeStateFunction<StateName extends string> = (originState: StateItem<StateName>, props: unknown) => StateItem<StateName>;

type StateConfigItem<StateName extends string, HandleName extends string> = {
  name: StateName;
  handle: Record<HandleName, ChangeStateFunction<StateName>>;
}


type StatePatternStoreProps<StateName extends string, HandleName extends string> = {
  initState: StateItem<StateName>,
  stateConfigItems: Array<StateConfigItem<StateName, HandleName>>,
  stateNameList: Array<StateName>,
  handleNameList: Array<HandleName>,
}

function createStatePatternStore<StateName extends string, HandleName extends string>(props: StatePatternStoreProps<StateName, HandleName>) {
  let state: StateItem<StateName> = props.initState;
  const listerSet: Set<() => void> = new Set();
  async function handleWithName(handleName: HandleName, option: unknown) {
    if (!props.handleNameList.includes(handleName)) {
      throw new TypeError(`handle name ${name} not in handle name list`);
    }
    const currentStateName = state.state;
    const currentHandleFunction = props.stateConfigItems.find((item) => item.name === currentStateName)?.handle[handleName];
    if (!currentHandleFunction) {
      return;
    }
    const newState = await currentHandleFunction(state, option);
    if (!props.stateNameList.includes(newState.state)) {
      throw new TypeError(`state name ${newState.state} not in state name list`);
    }
    state = newState;
    listerSet.forEach((cb) => cb());
  }
  function changeState(newState: StateItem<StateName>) {
    if (!props.stateNameList.includes(newState.state)) {
      throw new TypeError(`state name ${newState.state} not in state name list`);
    }
    state = newState;
    listerSet.forEach((cb) => cb());
  }
  function subscribe(callbackFn: () => void) {
    listerSet.add(callbackFn);
    return () => {
      listerSet.delete(callbackFn);
    }
  }
  function getState() {
    return state;
  }
  return {
    handleWithName,
    changeState,
    subscribe,
    getState,
  }
}
export default createStatePatternStore;
