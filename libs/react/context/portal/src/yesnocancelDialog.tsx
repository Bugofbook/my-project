import { createContext, ReactNode } from "react";
import { useYesnocancelDialog } from "@bugofbook/react/hook/feedback";
import { yesnocancelDialogState, initYesnocancelDialogState } from "@bugofbook/react/reducer/feedback";

export function createYesnocancelDialogContext<T extends Record<string, any>>() {
    const YesnocancelDialogStateContext = createContext<yesnocancelDialogState<T>>(initYesnocancelDialogState<T>(false));
    const YesnocancelDialogMethodsContext = createContext({open: (prop: T) => {return;},close: () => {return;},});
    const YesnocancelDialogProvider = ({ children }: { children: ReactNode }) => {
        const [state, actions] = useYesnocancelDialog<T>({ initOpen: false });
        return (
            <YesnocancelDialogStateContext.Provider value={state}>
                <YesnocancelDialogMethodsContext.Provider value={actions}>
                    {children}
                </YesnocancelDialogMethodsContext.Provider>
            </YesnocancelDialogStateContext.Provider>
        )
    }
    return ({
        YesnocancelDialogStateContext,
        YesnocancelDialogMethodsContext,
        YesnocancelDialogProvider,
    })
}