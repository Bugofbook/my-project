import { useContext } from 'react'
import { createAlertToastContext } from "@bugofbook/react/context/portal";
import { AlertToastComponent } from "@bugofbook/mui/joy/feedback";
const AlertToastContext = createAlertToastContext({ modal: AlertToastComponent });
export const AlertToastProvider = AlertToastContext.AlertToastProvider;
const OpenAlertToastContext = AlertToastContext.OpenAlertToastContext
export function AlertToastSection() {
    const openLocalAlertToast = useContext(OpenAlertToastContext)
    return (
        <section>
            <h2>AlertToast Component</h2>
            <button onClick={() => openLocalAlertToast({title: 'Alert Toast', content: 'This is the local alert toast content.'})}>Open Local Alert Toast</button>
        </section>
    )
}
