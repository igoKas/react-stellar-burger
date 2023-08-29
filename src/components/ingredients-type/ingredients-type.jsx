import styles from './ingredients-type.module.css'
import Card from '../card/card';
import { forwardRef } from 'react';

const IngredientsType = forwardRef(function IngredientsType({ ingredients, type, header }, ref) {

	return (
		<li ref={ref} id={type}>
			<h3 className="text text_type_main-medium">{header}</h3>
			<ul className={`${styles.card__container} pt-6 pr-4 pb-10 pl-4`}>
				{ingredients.map((ingredient) =>
					ingredient.type === type && <Card key={ingredient._id} ingredient={ingredient} />
				)}
			</ul>
		</li>
	)
})

export default IngredientsType;