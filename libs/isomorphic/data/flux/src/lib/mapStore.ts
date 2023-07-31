type ListenerCallback = () => void;

export function createMapStore<Entity>() {
    const idsListener: Set<ListenerCallback> = new Set();
    let ids: string[] = [];
    const entityListener: Map<string, Set<ListenerCallback>> = new Map();
    const entitiesMap: Map<string, Entity> = new Map();
    const subscribeIds = (cb?: ListenerCallback) => {
        const callbackFn = cb || (() => {return;});
        idsListener.add(callbackFn);
        return () => {
            idsListener.delete(callbackFn);
        }
    }
    const subscribeEntity = (id: string) => {
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
    const getOne = (id: string) => {
        return entitiesMap.get(id);
    }
    const setOne = (id: string, entity: Entity) => {
        if (!ids.includes(id)) {
            ids = ids.concat([id]);
            idsListener.forEach((cb) => cb());
        }
        entitiesMap.set(id, entity);
        const currentListener = entityListener.get(id) || new Set();
        currentListener.forEach((cb) => cb());
    }
    const getIDs = () => {
        return ids;
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
        getIDs,
    }
}
