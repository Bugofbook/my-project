import { createContext, ReactNode } from 'react';
import { useAlertDialog } from '@bugofbook/react/hook/feedback';
import { alertDialogState, initAlertDialogState } from '@bugofbook/react/reducer/feedback';

export function createAlertDialogContext<T extends Record<string, any>>() {
    const AlertDialogStateContext = createContext<alertDialogState<T>>(initAlertDialogState<T>(false));
    const AlertDialogMethodsContext = createContext({open : (prop: T) => {return;}, close: () => {return;}});
    const AlertDialogProvider = ({children}: {children: ReactNode}) => {
        const [state, actions] = useAlertDialog<T>({initOpen: false});
        return (
            <AlertDialogStateContext.Provider value={state}>
                <AlertDialogMethodsContext.Provider value={actions}>
                    { children}
                </AlertDialogMethodsContext.Provider>
            </AlertDialogStateContext.Provider>
        )
    }
    return ({
        AlertDialogStateContext,
        AlertDialogMethodsContext,
        AlertDialogProvider,
    })
}