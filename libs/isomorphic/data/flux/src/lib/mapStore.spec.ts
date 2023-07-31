import { createMapStore } from './mapStore';

type Entity = {
  id: string,
  name: string,
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
function createIdsSubject(subjectName: string, initValue: string[]) {
  let value = initValue;
  return {
    setValue: (newValue: string[]) => {
      value = newValue;
    },
    getValue: () => {
      return value
    },
    getContext: () => {
      return `${subjectName}: ${value.join(',')}`
    }
  }
}
describe('mapStore', () => {
  it ('Subject1', () => {
    const store = createMapStore<Entity>();
    const idsSubject = createIdsSubject('idsSubject', []);
    const subject1on1 = createSubject<string>('subject1on1', '');
    const subject1on2 = createSubject<string>('subject1on2', '');
    const subject2on1 = createSubject<string>('subject2on1', '');
    const subject2on2 = createSubject<string>('subject2on2', '');
    const onChangeIds = () => {
      idsSubject.setValue(store.getIDs());
    }
    const onChange1on1 = () => {
      subject1on1.setValue(store.getOne('1')?.name || '');
    }
    const onChange1on2 = () => {
      subject1on2.setValue(store.getOne('1')?.name || '');
    }
    const onChange2on1 = () => {
      subject2on1.setValue(store.getOne('2')?.name || '');
    }
    const onChange2on2 = () => {
      subject2on2.setValue(store.getOne('2')?.name || '');
    }
    const unsubscribeIds = store.subscribeIds(onChangeIds);
    const unsubscribe1on1 = store.subscribeEntity('1')(onChange1on1);
    const unsubscribe1on2 = store.subscribeEntity('1')(onChange1on2);
    const unsubscribe2on1 = store.subscribeEntity('2')(onChange2on1);
    const unsubscribe2on2 = store.subscribeEntity('2')(onChange2on2);
    store.setOne('1', {
      id: '1',
      name: 'name1',
    })
    store.setOne('2', {
      id: '2',
      name: 'name2',
    })
    expect(subject1on1.getContext()).toEqual('subject1on1: name1');
    expect(subject1on2.getContext()).toEqual('subject1on2: name1');
    expect(subject2on1.getContext()).toEqual('subject2on1: name2');
    expect(subject2on2.getContext()).toEqual('subject2on2: name2');
    expect(idsSubject.getContext()).toEqual('idsSubject: 1,2');
    unsubscribeIds();
    unsubscribe1on1();
    unsubscribe1on2();
    unsubscribe2on1();
    unsubscribe2on2();
  })
  it('Subject2', () => {
    const store = createMapStore<Entity>();
    const subject1on1 = createSubject<string>('subject1on1', '');
    const subject1on2 = createSubject<string>('subject1on2', '');
    const subject2on1 = createSubject<string>('subject2on1', '');
    const subject2on2 = createSubject<string>('subject2on2', '');
    const onChange1on1 = () => {
      subject1on1.setValue(store.getOne('1')?.name || '');
    }
    const onChange1on2 = () => {
      subject1on2.setValue(store.getOne('1')?.name || '');
    }
    const onChange2on1 = () => {
      subject2on1.setValue(store.getOne('2')?.name || '');
    }
    const onChange2on2 = () => {
      subject2on2.setValue(store.getOne('2')?.name || '');
    }
    const unsubscribe1on1 = store.subscribeEntity('1')(onChange1on1);
    const unsubscribe1on2 = store.subscribeEntity('1')(onChange1on2);
    const unsubscribe2on1 = store.subscribeEntity('2')(onChange2on1);
    const unsubscribe2on2 = store.subscribeEntity('2')(onChange2on2);
    store.setOne('1', {
      id: '1',
      name: 'name1',
    })
    store.setOne('2', {
      id: '2',
      name: 'name2',
    })
    unsubscribe1on1();
    unsubscribe2on1();
    store.setOne('1', {
      id: '1',
      name: 'name1-1',
    })
    store.setOne('2', {
      id: '2',
      name: 'name2-1',
    })
    unsubscribe1on2();
    unsubscribe2on2();
    store.setOne('1', {
      id: '1',
      name: 'name1-2',
    })
    store.setOne('2', {
      id: '2',
      name: 'name2-2',
    })
    expect(subject1on1.getContext()).toEqual('subject1on1: name1');
    expect(subject1on2.getContext()).toEqual('subject1on2: name1-1');
    expect(subject2on1.getContext()).toEqual('subject2on1: name2');
    expect(subject2on2.getContext()).toEqual('subject2on2: name2-1');
  })
})
