import styles from './order-details.module.css';
import PropTypes from 'prop-types';
import done from '../../images/done.png';

function OrderDetails({ orderInfo }) {
	return (
		<div className={`${styles.container} pt-30 pb-30`}>
			<h2 className='text text_type_digits-large'>{orderInfo}</h2>
			<span className='text text_type_main-medium mt-8'>идентификатор заказа</span>
			<img className='mt-15' src={done} alt="заказ сделан" />
			<span className='text text_type_main-default mt-15'>Ваш заказ начали готовить</span>
			<span className='text text_type_main-default text_color_inactive mt-2'>Дождитесь готовности на орбитальной станции</span>
		</div>
	)
}

OrderDetails.propTypes = {
  orderInfo: PropTypes.string.isRequired
};

export default OrderDetails;