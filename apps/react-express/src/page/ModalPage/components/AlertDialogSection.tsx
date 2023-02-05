import { useContext } from 'react'
import { createAlertDialogContext } from "@bugofbook/react/context/portal";
import { AlertDialogComponent } from "@bugofbook/mui/joy/feedback";
const AlertDialogContext = createAlertDialogContext({ modal: AlertDialogComponent });
export const AlertDialogProvider = AlertDialogContext.AlertDialogProvider;
const OpenAlertDialogContext = AlertDialogContext.OpenAlertDialogContext
export function AlertDialogSection() {
    const openLocalAlertDialog = useContext(OpenAlertDialogContext)
    return (
        <section>
            <h2>AlertDialog Component</h2>
            <button onClick={() => openLocalAlertDialog({title: 'Alert Dialog', content: 'This is the local alert dialog content.'})}>Open Local Alert Dialog</button>
        </section>
    )
}
