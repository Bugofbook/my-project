type ListenerCallback = () => void;

export function createMapStore<Key extends Record<string, unknown>, Entity>() {
    const idsListener: Set<ListenerCallback> = new Set();
    // let ids: string[] = [];
    const entityListener: WeakMap<Key, Set<ListenerCallback>> = new WeakMap();
    const entitiesMap: WeakMap<Key, Entity> = new WeakMap();
    const subscribeIds = (cb?: ListenerCallback) => {
        const callbackFn = cb || (() => {return;});
        idsListener.add(callbackFn);
        return () => {
            idsListener.delete(callbackFn);
        }
    }
    const subscribeEntity = (id: Key) => {
        return (cb?: ListenerCallback) => {
            const callbackFn = cb || (() => {return;});
            if (entityListener.has(id)) {
                entityListener.get(id)?.add(callbackFn);
            } else {
                entityListener.set(id, new Set([callbackFn]));
            }
            return () => {
                const currentSet = entityListener.get(id) || new Set();
                currentSet.delete(callbackFn);
                if (currentSet.size === 0) {
                    entityListener.delete(id);
                }
            }
        }
    }
    const getOne = (id: Key) => {
        return entitiesMap.get(id);
    }
    const setOne = (id: Key, entity: Entity) => {
        entitiesMap.set(id, entity);
        const currentListener = entityListener.get(id) || new Set();
        currentListener.forEach((cb) => cb());
    }
    const getMap = () => {
        return entitiesMap;
    }
    return {
        subscribeIds,
        subscribeEntity,
        setOne,
        getOne,
        getMap,
    }
}
