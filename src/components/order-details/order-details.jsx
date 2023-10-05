import styles from './order-details.module.css';
import done from '../../images/done.png';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { clearConstructor } from '../../services/burger-constructor-slice';
import { postOrder } from '../../services/actions';

function OrderDetails() {
	const dispatch = useDispatch();
	const { ingredients, bun } = useSelector(store => store.burgerConstructor);
	const { data, isLoading, error } = useSelector(store => store.orderDetails);
	const createIdArray = () => {
		const idsObject = { ingredients: [...ingredients].map(ingredient => ingredient._id) };
		bun && idsObject.ingredients.push(bun._id) && idsObject.ingredients.push(bun._id);
		return idsObject
	}
	useEffect(() => {
		dispatch(postOrder(createIdArray()));
		dispatch(clearConstructor());
	}, [dispatch])

	return (
		<div className={`${styles.container} pt-30 pb-30`}>
			{error ? (
				<>О нет, ошибка</>
			) : isLoading ? (
				<>Ждем</>
			) : data ? (
				<>
					<h2 className='text text_type_digits-large'>{data.order.number}</h2>
				</>
			) : null}
			<span className='text text_type_main-medium mt-8'>идентификатор заказа</span>
			<img className='mt-15' src={done} alt="заказ сделан" />
			<span className='text text_type_main-default mt-15'>Ваш заказ начали готовить</span>
			<span className='text text_type_main-default text_color_inactive mt-2'>Дождитесь готовности на орбитальной станции</span>
		</div>
	)
}



export default OrderDetails;