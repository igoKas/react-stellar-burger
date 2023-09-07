import { useDispatch } from 'react-redux';
import styles from './modal-overlay.module.css'

function ModalOverlay ({ onClose }) {
	const dispatch = useDispatch();
	return (
		<div className={styles.modalOverlay} onClick={() => onClose()}></div>
	)
}

export default ModalOverlay;