import Box from '@mui/joy/Box';
import {ModalProvider, ModalSection} from './components/ModalSection'
import {AlertDialogProvider, AlertDialogSection} from './components/AlertDialogSection'
import {AlertToastProvider, AlertToastSection} from './components/AlertToastSection'
import {YesnoDialogProvider, YesnoDialogSection} from './components/YesnoDialogSection'
import {YesnocancelDialogProvider, YesnocancelDialogSection} from './components/YesnocancelDialogSection'
export function ModalPage() {
    return (
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
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
        </Box>
    )
}

export default ModalPage

// type ComponentProps = Record<string, unknown>

// type ComponentArray<T extends Record<string, unknown>> = [FunctionComponent<PropsWithChildren<T>>, T]

// type Qqq<Ts extends Array<Record<string, unknown>>> = {
//     [R in keyof Ts]: ComponentArray<Ts[R]>
// }

// // function createComponentComposer(components: ComponentArray<any>) {
// //     return function ComposedComponent(component: ReactNode) {
// //         return components.reduceRight((child, Parent) => <Parent>{child}</Parent>, component)
// //     }
// // }

// type Www = { initState: { open: boolean } }

// const bbb: Qqq<[Www, { initState: { open: boolean } }]> = [
//     [ModalProvider, { initState: { open: false } }],
//     [AlertDialogProvider, { initState: { open: false } }],
//     // [AlertToastProvider, {initialState:{open: false}}: T3],
//     // [YesnoDialogProvider, {initialState:{open: false}}: T4],
// ]

