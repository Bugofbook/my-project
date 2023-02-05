import { PropsWithChildren, ReactNode, FunctionComponent, useContext } from 'react'
import { createModalContext, createAlertDialogContext, createAlertToastContext, createYesnoDialogContext, createYesnocancelDialogContext } from "@bugofbook/react/context/portal";
import { ModalComponent, AlertDialogComponent, AlertToastComponent, YesnoDialogComponent, YesnocancelDialogComponent } from "@bugofbook/mui/joy/feedback";
import { ModalComponentPropsContext, OpenModalComponentContext, AlertDialogComponentPropsContext, OpenAlertDialogComponentContext, AlertToastComponentPropsContext, OpenAlertToastComponentContext, YesnoDialogComponentPropsContext, OpenYesnoDialogComponentContext, YesnocancelDialogComponentPropsContext, OpenYesnocancelDialogComponentContext } from '../context/Global'
const ModalContext = createModalContext({ modal: ModalComponent });
const ModalProvider = ModalContext.ModalProvider;
const OpenModalContext = ModalContext.OpenModalContext
const AlertDialogContext = createAlertDialogContext({ modal: AlertDialogComponent });
const AlertDialogProvider = AlertDialogContext.AlertDialogProvider;
const OpenAlertDialogContext = AlertDialogContext.OpenAlertDialogContext
const AlertToastContext = createAlertToastContext({ modal: AlertToastComponent });
const AlertToastProvider = AlertToastContext.AlertToastProvider;
const OpenAlertToastContext = AlertToastContext.OpenAlertToastContext
const YesnoDialogContext = createYesnoDialogContext({ modal: YesnoDialogComponent });
const YesnoDialogProvider = YesnoDialogContext.YesnoDialogProvider;
const OpenYesnoDialogStateContext = YesnoDialogContext.OpenYesnoDialogContext
const YesnocancelDialogContext = createYesnocancelDialogContext({ modal: YesnocancelDialogComponent });
const YesnocancelDialogProvider = YesnocancelDialogContext.YesnocancelDialogProvider;
const OpenYesnocancelDialogStateContext = YesnocancelDialogContext.OpenYesnocancelDialogContext

const ModalSection = () => {
    const openLocalModal = useContext(OpenModalContext)
    const OpenModalComponent = useContext(OpenModalComponentContext)
    return (
        <section>
            <h2>Modal Component</h2>
            <button onClick={() => openLocalModal({title: 'Modal', content: 'This is the local modal content.'})}>Openg Local Modal</button>
            <button onClick={() => OpenModalComponent({title: 'Modal', content: 'This is the modal content.'})}>Openg Modal</button>
        </section>
    )
}
const AlertDialogSection = () => {
    const openLocalAlertDialog = useContext(OpenAlertDialogContext)
    const OpenAlertDialogComponent = useContext(OpenAlertDialogComponentContext)
    return (
        <section>
            <h2>AlertDialog Component</h2>
            <button onClick={() => openLocalAlertDialog({title: 'Alert Dialog', content: 'This is the local alert dialog content.'})}>Open Local Alert Dialog</button>
            <button onClick={() => OpenAlertDialogComponent({title: 'Alert Dialog', content: 'This is the alert dialog content.'})}>Open Alert Dialog</button>
        </section>
    )
}
const AlertToastSection = () => {
    const openLocalAlertToast = useContext(OpenAlertToastContext)
    const OpenAlertToastComponent = useContext(OpenAlertToastComponentContext)
    return (
        <section>
            <h2>AlertToast Component</h2>
            <button onClick={() => openLocalAlertToast({title: 'Alert Toast', content: 'This is the local alert toast content.'})}>Open Local Alert Toast</button>
            <button onClick={() => OpenAlertToastComponent({title: 'Alert Toast', content: 'This is the alert toast content.'})}>Open Alert Toast</button>
        </section>
    )
}
const YesnoDialogSection = () => {
    const openLocalYesnoDialog = useContext(OpenYesnoDialogStateContext)
    const OpenYesnoDialogComponent = useContext(OpenYesnoDialogComponentContext)
    return (
        <section>
            <h2>YesnoDialog Component</h2>
            <button onClick={() => openLocalYesnoDialog({title: 'Yesno Dialog', content: 'This is the local yesno dialog content.'})}>Open Local Yesno Dialog</button>
            <button onClick={() => OpenYesnoDialogComponent({title: 'Yesno Dialog', content: 'This is the yesno dialog content.'})}>Open Yesno Dialog</button>
        </section>
    )
}
const YesnocancelDialogSection = () => {
    const openLocalYesnocancelDialog = useContext(OpenYesnocancelDialogStateContext)
    const OpenYesnocancelDialogComponent = useContext(OpenYesnocancelDialogComponentContext)
    return (
        <section>
            <h2>YesnocancelDialog Component</h2>
            <button onClick={() => openLocalYesnocancelDialog({title: 'Yesnocancel Dialog', content: 'This is the local yesnocancel dialog content.'})}>Open Local Yesnocancel Dialog</button>
            <button onClick={() => OpenYesnocancelDialogComponent({title: 'Yesnocancel Dialog', content: 'This is the yesnocancel dialog content.'})}>Open Yesnocancel Dialog</button>
        </section>
    )
}
const ModalPage:FunctionComponent<PropsWithChildren<unknown>> = () => {
    const ModalComponentProps = useContext(ModalComponentPropsContext)
    const AlertDialogComponentProps = useContext(AlertDialogComponentPropsContext)
    const AlertToastComponentProps = useContext(AlertToastComponentPropsContext)
    const YesnoDialogComponentProps = useContext(YesnoDialogComponentPropsContext)
    const YesnocancelDialogComponentProps = useContext(YesnocancelDialogComponentPropsContext)
    return (
        <div>
            <section>
                <h1>Modal</h1>
                <p>This is the modal page.</p>                
            </section>
            <ModalProvider initState={{ open: false }}>
                <ModalSection />
            </ModalProvider>
            <AlertDialogProvider initState={{ open: false }}>
                <AlertDialogSection />
            </AlertDialogProvider>
            <AlertToastProvider initialState={{ open: false }}>
                <AlertToastSection />
            </AlertToastProvider>
            <YesnoDialogProvider initialState={{ open: false }}>
                <YesnoDialogSection />
            </YesnoDialogProvider>
            <YesnocancelDialogProvider initialState={{ open: false }}>
                <YesnocancelDialogSection />
            </YesnocancelDialogProvider>
            <ModalComponent {...ModalComponentProps} />
            <AlertDialogComponent {...AlertDialogComponentProps} />
            <AlertToastComponent {...AlertToastComponentProps} />
            <YesnoDialogComponent {...YesnoDialogComponentProps} />
            <YesnocancelDialogComponent {...YesnocancelDialogComponentProps} />
        </div>
    )
}

export default ModalPage

type ComponentProps = Record<string, unknown>

type ComponentArray<T extends Record<string, unknown>> = [FunctionComponent<PropsWithChildren<T>>, T]

type Qqq<Ts extends Array<Record<string, unknown>>> = {
    [R in keyof Ts]: ComponentArray<Ts[R]>
}

// function createComponentComposer(components: ComponentArray<any>) {
//     return function ComposedComponent(component: ReactNode) {
//         return components.reduceRight((child, Parent) => <Parent>{child}</Parent>, component)
//     }
// }

type Www = { initState: { open: boolean } }

const bbb: Qqq<[Www, { initState: { open: boolean } }]> = [
    [ModalProvider, { initState: { open: false } }],
    [AlertDialogProvider, { initState: { open: false } }],
    // [AlertToastProvider, {initialState:{open: false}}: T3],
    // [YesnoDialogProvider, {initialState:{open: false}}: T4],
]

