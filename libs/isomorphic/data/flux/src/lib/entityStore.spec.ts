import createEntityMapStore from './entityStore';

type Entity = {
  id: string;
  value: string;
}

describe('createEntityMapStore', () => {
  const store = createEntityMapStore<Entity>();
  it('should return a store', () => {
    // expect(store).toBeDefined();
  });
});
