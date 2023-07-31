import { createStore } from './store';

// const createSubject = <T>() => {

//   return {

//   }
// }
type Action = {
  type: 'add',
  payload: number,
} | {
  type: 'minus',
  payload: number,
} | {
  type: 'reset',
}
const reducer = (state: number, action: Action, initState: number) => {
  switch (action.type) {
    case 'add':
      return state + action.payload;
    case 'minus':
      return state - action.payload;
    case 'reset':
      return initState;
    default:
      return state;
  }
}
function createSubject<T>(subjectName: string, initValue: T) {
  let value = initValue;
  return {
    setValue: (newValue: T) => {
      value = newValue;
    },
    getValue: () => {
      return value
    },
    getContext: () => {
      return `${subjectName}: ${value}`
    }
  }
}
describe('store', () => {
  it('Subject1', () => {
    const store = createStore(reducer, 0);
    const subject1 = createSubject<number>('subject1', 0);
    const onChange = () => {
      subject1.setValue(store.getStore());
    }
    const unsubscribesubject1 = store.subscribe(onChange);
    store.dispatch({
      type: 'add',
      payload: 1,
    })
    expect(subject1.getContext()).toEqual('subject1: 1');
    store.dispatch({
      type: 'minus',
      payload: 1,
    });
    expect(subject1.getContext()).toEqual('subject1: 0');
    unsubscribesubject1();
  });
  it('Subject2', () => {
    const store = createStore(reducer, 0);
    const subjetc1 = createSubject('subject1', 0);
    const subject2 = createSubject('subject2', 0);
    const onChange1 = () => {
      subjetc1.setValue(store.getStore());
    }
    const onChange2 = () => {
      subject2.setValue(store.getStore());
    }
    const unsubscribesubject1 = store.subscribe(onChange1);
    const unsubscribesubject2 = store.subscribe(onChange2);
    store.dispatch({
      type: 'add',
      payload: 2,
    })
    unsubscribesubject1();
    store.dispatch({
      type: 'add',
      payload: 3,
    });
    expect(subjetc1.getContext()).toEqual('subject1: 2');
    expect(subject2.getContext()).toEqual('subject2: 5');
    unsubscribesubject2();
  })
});
