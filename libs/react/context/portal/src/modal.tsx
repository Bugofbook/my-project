import { createContext, ReactNode } from 'react';
import { useModal } from '@bugofbook/react/hook/feedback'
import { modalState, initModalState } from '@bugofbook/react/reducer/feedback'

export function createModalContext<T extends Record<string, any>>() {
    const ModalStateContext = createContext<modalState<T>>(initModalState<T>(false));
    const ModalMethodsContext = createContext({open : (prop: T) => {return;}, close: () => {return;}});
    const ModalProvider = ({children}: {children: ReactNode}) => {
        const [state, action] = useModal<T>({initOpen: false});
        return (
            <ModalStateContext.Provider value={state}>
                <ModalMethodsContext.Provider value={action}>
                    {children}
                </ModalMethodsContext.Provider>
            </ModalStateContext.Provider>
        )
    }
    return ({
        ModalStateContext,
        ModalMethodsContext,
        ModalProvider,
    })
}