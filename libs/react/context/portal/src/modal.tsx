import { createContext, ReactNode } from 'react';
import { useModal } from '@bugofbook/react/hook/feedback'
import { modalState, initModalState } from '@bugofbook/react/reducer/feedback'

export function createModalContext<T extends Record<string, any>>() {
    const ModalContext = createContext<modalState<T>>(initModalState<T>(false));
    const ModalActiveContext = createContext({open : (prop: T) => {return;}, close: () => {return;}});
    const ModalProvider = ({children}: {children: ReactNode}) => {
        const [state, action] = useModal<T>({initOpen: false});
        return (
            <ModalContext.Provider value={state}>
                <ModalActiveContext.Provider value={action}>
                    {children}
                </ModalActiveContext.Provider>
            </ModalContext.Provider>
        )
    }
    return ({
        ModalContext,
        ModalActiveContext,
        ModalProvider,
    })
}