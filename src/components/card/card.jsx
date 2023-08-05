import { ingredientPropType } from '../../utils/prop-types';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './card.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { openIngredientModal } from '../../services/modal-slice';
import { useDrag } from "react-dnd";


function Card({ ingredient }) {
	const { bun, ingredients } = useSelector(store => store.burgerConstructor);
	const selectedIngredients = bun ? 
	[...ingredients, bun].filter(item => item._id === ingredient._id) :
	[...ingredients].filter(item => item._id === ingredient._id);
	const dispatch = useDispatch();
	const [, dragRef] = useDrag({
		type: 'ingredient',
		item: ingredient,
	});

	return (
		<li ref={dragRef} className={styles.card} onClick={() => {
			dispatch(openIngredientModal(ingredient));
			}}>
			{selectedIngredients.length ? 
			<div className={`${styles.card__amount} text text_type_digits-default`}>{selectedIngredients.length}</div> :
			null}
			<img className="pl-4 pr-4" src={ingredient.image} alt={ingredient.name} />
			<div className={styles.card__price}>
				<span className="text text_type_digits-default">{ingredient.price}</span>
				<CurrencyIcon type="primary" />
			</div>
			<span className={`${styles.card__name} text text_type_main-small pb-7`}>{ingredient.name}</span>
		</li>
	);
}

Card.propTypes = {
  ingredient: ingredientPropType.isRequired,
};

export default Card;