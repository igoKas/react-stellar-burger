import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styles from './modal.module.css'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../services/modal-slice';
const  modalRoot = document.getElementById('modals');

function Modal({ children }) {
	const dispatch = useDispatch()


	React.useEffect(() => {
		function handleEscClose(evt) {
			if (evt.key === 'Escape') dispatch(closeModal())
		}

		document.addEventListener('keydown', handleEscClose)

    return () => {
      document.removeEventListener('keydown', handleEscClose)
    }
	}, [dispatch]);


	return ReactDOM.createPortal(
		(
			<>
				<ModalOverlay />
				<div className={styles.modalContainer}>
					<span className={styles.modalClose}><CloseIcon type="primary" onClick={() => dispatch(closeModal())}/></span>
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