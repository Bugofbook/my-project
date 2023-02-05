import { useContext } from 'react'
import { createYesnocancelDialogContext } from "@bugofbook/react/context/portal";
import { YesnocancelDialogComponent } from "@bugofbook/mui/joy/feedback";
const YesnocancelDialogContext = createYesnocancelDialogContext({ modal: YesnocancelDialogComponent });
export const YesnocancelDialogProvider = YesnocancelDialogContext.YesnocancelDialogProvider;
const OpenYesnocancelDialogStateContext = YesnocancelDialogContext.OpenYesnocancelDialogContext
export function YesnocancelDialogSection() {
    const openLocalYesnocancelDialog = useContext(OpenYesnocancelDialogStateContext)
    return (
        <section>
            <h2>YesnocancelDialog Component</h2>
            <button onClick={() => openLocalYesnocancelDialog({title: 'Yesnocancel Dialog', content: 'This is the local yesnocancel dialog content.'})}>Open Local Yesnocancel Dialog</button>
        </section>
    )
}
