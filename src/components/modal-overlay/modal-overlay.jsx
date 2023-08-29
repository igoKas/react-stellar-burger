import { useDispatch } from 'react-redux';
import styles from './modal-overlay.module.css'
import { closeModal } from '../../services/modal-slice';

function ModalOverlay () {
	const dispatch = useDispatch();
	return (
		<div className={styles.modalOverlay} onClick={() => dispatch(closeModal())}></div>
	)
}

export default ModalOverlay;