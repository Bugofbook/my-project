import { useContext } from "react";
import { OpenModalContext} from '../context/Global'
import { useModal } from '@bugofbook/react/hook/feedback'
import { ModalComponent } from "@bugofbook/mui/joy/feedback";
function HomePage() {
    const openModal = useContext(OpenModalContext);
    const { state, onOpen, onClose } = useModal({open: false});
    return (
        <div>
            <h1>Home</h1>
            <p>This is the home page.</p>
            <button onClick={() => openModal({})}>Open Global Modal</button>
            <button onClick={() => onOpen()}>Open Local Modal</button>
            <ModalComponent {...state} onClose={onClose} />
        </div>
    );
}

export default HomePage;