import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { useNavigate } from 'react-router-dom';
const  modalRoot = document.getElementById('modals');

function Modal({ children }) {
	const navigate = useNavigate();
	const handleModalClose = () => {
		navigate(-1);
	  };

	React.useEffect(() => {
		function handleEscClose(evt) {
			if (evt.key === 'Escape') handleModalClose()
		}

		document.addEventListener('keydown', handleEscClose)

    return () => {
      document.removeEventListener('keydown', handleEscClose)
    }
	}, []);


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

Modal.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Modal;