import { createContext, ReactNode } from "react";
import { useYesnoDialog } from "@bugofbook/react/hook/feedback";
import { yesnoDialogState, initYesnoDialogState } from "@bugofbook/react/reducer/feedback";

export function createYesnoDialogContext<T extends Record<string, any>>() {
    const YesnoDialogStateContext = createContext<yesnoDialogState<T>>(initYesnoDialogState<T>(false));
    const YesnoDialogMethodsContext = createContext({open: (prop: T) => {return;},close: () => {return;},});
    const YesnoDialogProvider = ({ children }: { children: ReactNode }) => {
        const [state, actions] = useYesnoDialog<T>({ initOpen: false });
        return (
        <YesnoDialogStateContext.Provider value={state}>
            <YesnoDialogMethodsContext.Provider value={actions}>
            {children}
            </YesnoDialogMethodsContext.Provider>
        </YesnoDialogStateContext.Provider>
        );
    };
    return {
        YesnoDialogStateContext,
        YesnoDialogMethodsContext,
        YesnoDialogProvider,
    };
}