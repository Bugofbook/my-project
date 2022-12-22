import { createContext, ReactNode } from 'react';
import { useAlertToast } from '@bugofbook/react/hook/feedback';
import { alertToastState, initAlertToastState } from '@bugofbook/react/reducer/feedback';

export function createAlertToastContext<T extends Record<string, any>>() {
    const AlertToastStateContext = createContext<alertToastState<T>>(initAlertToastState<T>(false));
    const AlertToastMethodsContext = createContext({open : (prop: T) => {return;}, close: () => {return;}});
    const AlertToastProvider = ({children}: {children: ReactNode}) => {
        const [state, actions] = useAlertToast<T>({initOpen: false});
        return (
            <AlertToastStateContext.Provider value={state}>
                <AlertToastMethodsContext.Provider value={actions}>
                    { children}
                </AlertToastMethodsContext.Provider>
            </AlertToastStateContext.Provider>
        )
    }
    return ({
        AlertToastStateContext,
        AlertToastMethodsContext,
        AlertToastProvider,
    })
}