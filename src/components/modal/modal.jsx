import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
const  modalRoot = document.getElementById('modals');

function Modal({ toggleModal, children }) {

	React.useEffect(() => {
		function handleEscClose(evt) {
			if (evt.key === 'Escape') toggleModal()
		}

		document.addEventListener('keydown', handleEscClose)

    return () => {
      document.removeEventListener('keydown', handleEscClose)
    }
	}, []);


	return ReactDOM.createPortal(
		(
			<>
				<ModalOverlay toggleModal={toggleModal} />
				<div className={styles.modalContainer}>
					<span className={styles.modalClose}><CloseIcon type="primary" onClick={toggleModal}/></span>
					{children}
      	</div>
			</>
		),
		modalRoot
	);
};

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  modalRoot: PropTypes.instanceOf(Element).isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;