import styles from './modal-overlay.module.css'

function ModalOverlay ({ onClose }) {
	return (
		<div className={styles.modalOverlay} onClick={() => onClose()}></div>
	)
}

export default ModalOverlay;