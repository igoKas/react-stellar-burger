import PropTypes from 'prop-types';
import styles from './modal-overlay.module.css'

function ModalOverlay ({ toggleModal }) {
	function handleClickClose(evt) {
		if (evt) toggleModal()
	}

	return (
		<div className={styles.modalOverlay} onClick={handleClickClose}></div>
	)
}

ModalOverlay.propTypes = {
  toggleModal: PropTypes.func.isRequired
};

export default ModalOverlay;