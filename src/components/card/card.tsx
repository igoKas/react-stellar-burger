import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './card.module.css';
import { useSelector } from '../../utils/hooks';
import { useDrag } from "react-dnd";
import { FC, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Ingredient } from "../../utils/types";

type Props = {
	ingredient: Ingredient
}

const Card: FC<Props> = ({ ingredient }) => {
	const location = useLocation();
	const ingredientId = ingredient._id;

	const { bun, ingredients } = useSelector(store => store.burgerConstructor);
	const selectedIngredients = useMemo(
		() => [...ingredients, bun || null].filter(item => item?._id === ingredient._id),
		[ingredients, bun, ingredient._id]
	);

	const [, dragRef] = useDrag({
		type: 'ingredient',
		item: ingredient,
	});

	return (
		<Link
			to={`/ingredients/${ingredientId}`}
			state={{ background: location }}
			className={styles.link}
		>
			<li ref={dragRef} className={styles.card}>
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
		</Link>
	);
}

export default Card;