import { FC, ReactNode, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import styles from './modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { useNavigate } from 'react-router-dom';
const  modalRoot = document.getElementById('modals') as HTMLDivElement;

const Modal: FC<ReactNode> = ({children}) => {
	const navigate = useNavigate();
	const handleModalClose = useCallback(() => navigate(-1), [navigate]);

	useEffect(() => {
		function handleEscClose(evt: KeyboardEvent) {
			if (evt.key === 'Escape') handleModalClose()
		}

		document.addEventListener('keydown', handleEscClose)

    return () => {
      document.removeEventListener('keydown', handleEscClose)
    }
	}, [handleModalClose]);


	return ReactDOM.createPortal(
		(
			<>
				<ModalOverlay onClose={handleModalClose} />
				<div className={styles.modalContainer}>
					<span className={styles.modalClose}><CloseIcon type="primary" onClick={() => handleModalClose()}/></span>
					{children}
      	</div>
			</>
		),
		modalRoot
	);
};

export default Modal;