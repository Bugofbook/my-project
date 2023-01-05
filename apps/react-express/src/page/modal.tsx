import { PropsWithChildren, ReactNode, FunctionComponent, useContext } from 'react'
import { createModalContext, createAlertDialogContext, createAlertToastContext, createYesnoDialogContext, createYesnocancelDialogContext } from "@bugofbook/react/context/portal";
import { ModalComponent, AlertDialogComponent, AlertToastComponent, YesnoDialogComponent, YesnocancelDialogComponent } from "@bugofbook/mui/joy/feedback";

const ModalContext = createModalContext({modal: ModalComponent});
const ModalProvider = ModalContext.ModalProvider;
const OpenModalContext = ModalContext.OpenModalContext
const AlertDialogContext = createAlertDialogContext({modal: AlertDialogComponent});
const AlertDialogProvider = AlertDialogContext.AlertDialogProvider;
const OpenAlertDialogContext = AlertDialogContext.OpenAlertDialogContext
const AlertToastContext = createAlertToastContext({modal: AlertToastComponent});
const AlertToastProvider = AlertToastContext.AlertToastProvider;
const OpenAlertToastContext = AlertToastContext.OpenAlertToastContext
const YesnoDialogContext = createYesnoDialogContext({modal: YesnoDialogComponent});
const YesnoDialogProvider = YesnoDialogContext.YesnoDialogProvider;
const OpenYesnoDialogStateContext = YesnoDialogContext.OpenYesnoDialogContext
const YesnocancelDialogContext = createYesnocancelDialogContext({modal: YesnocancelDialogComponent});
const YesnocancelDialogProvider = YesnocancelDialogContext.YesnocancelDialogProvider;
const OpenYesnocancelDialogStateContext = YesnocancelDialogContext.OpenYesnocancelDialogContext
const Aaa = () => {
    const openModal = useContext(OpenModalContext)
    const openAlertDialog = useContext(OpenAlertDialogContext)
    const openAlertToast = useContext(OpenAlertToastContext)
    const openYesnoDialog = useContext(OpenYesnoDialogStateContext)
    const openYesnocancelDialog = useContext(OpenYesnocancelDialogStateContext)
    return (
        <div>
            <h1>Modal</h1>
            <p>This is the modal page.</p>
            <button onClick={() => openModal({title: 'Modal', content: 'This is local the modal content.'})}>Openg Local Modal</button>
            <button onClick={() => openAlertDialog({title: 'Alert Dialog', content: 'This is the local alert dialog content.'})}>Open Alert Dialog</button>
            <button onClick={() => openAlertToast({title: 'Alert Toast', content: 'This is the local alert toast content.'})}>Open Alert Toast</button>
            <button onClick={() => openYesnoDialog({title: 'Yesno Dialog', content: 'This is the local yesno dialog content.'})}>Open Yesno Dialog</button>
            <button onClick={() => openYesnocancelDialog({title: 'Yesnocancel Dialog', content: 'This is the local yesnocancel dialog content.'})}>Open Yesnocancel Dialog</button>
        </div>
    )
}


// const ModalPage:FunctionComponent<PropsWithChildren<unknown>> = () => {
//     // return (
//     //     <ModalProvider initState={{open: false}}>
//     //         <AlertDialogProvider initState={{open: false}}>
//     //             <AlertToastProvider initialState={{open: false}}>
//     //                 <YesnoDialogProvider initialState={{open: false}}>
//     //                     <YesnocancelDialogProvider initialState={{open: false}}>
//     //                         <Aaa />
//     //                     </YesnocancelDialogProvider>
//     //                 </YesnoDialogProvider>
//     //             </AlertToastProvider>
//     //         </AlertDialogProvider>
//     //     </ModalProvider>
//     // );
//     return bbb.reduceRight((child, [Parent, props]) => <Parent {...props}>{child}</Parent>, <Aaa />)
// }

const ModalPage2:(children: ReactNode) => FunctionComponent<PropsWithChildren<unknown>> = (children) => {
    return () => {
        return (
            <ModalProvider initState={{open: false}}>
                <AlertDialogProvider initState={{open: false}}>
                    <AlertToastProvider initialState={{open: false}}>
                        <YesnoDialogProvider initialState={{open: false}}>
                            <YesnocancelDialogProvider initialState={{open: false}}>
                                {children}
                            </YesnocancelDialogProvider>
                        </YesnoDialogProvider>
                    </AlertToastProvider>
                </AlertDialogProvider>
            </ModalProvider>
        )
    }
}

export default ModalPage2(<Aaa />);

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

type Www = { initState: { open: boolean }}

const bbb: Qqq<[Www, { initState: { open: boolean }}]> = [
    [ModalProvider,{initState:{open: false}}],
    [AlertDialogProvider, {initState:{open: false}}],
    // [AlertToastProvider, {initialState:{open: false}}: T3],
    // [YesnoDialogProvider, {initialState:{open: false}}: T4],
]

