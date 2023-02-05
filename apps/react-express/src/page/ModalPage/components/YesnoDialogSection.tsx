import { useContext } from 'react'
import { createYesnoDialogContext } from "@bugofbook/react/context/portal";
import { YesnoDialogComponent } from "@bugofbook/mui/joy/feedback";
const YesnoDialogContext = createYesnoDialogContext({ modal: YesnoDialogComponent });
export const YesnoDialogProvider = YesnoDialogContext.YesnoDialogProvider;
const OpenYesnoDialogStateContext = YesnoDialogContext.OpenYesnoDialogContext

export function YesnoDialogSection() {
    const openLocalYesnoDialog = useContext(OpenYesnoDialogStateContext)
    return (
        <section>
            <h2>YesnoDialog Component</h2>
            <button onClick={() => openLocalYesnoDialog({title: 'Yesno Dialog', content: 'This is the local yesno dialog content.'})}>Open Local Yesno Dialog</button>
        </section>
    )
}
