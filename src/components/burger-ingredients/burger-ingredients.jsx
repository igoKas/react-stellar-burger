import React from "react";
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';
import styles from "./burger-ingredients.module.css"
import Card from "../card/card";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerIngredients( {data, toggleModal} ) {
	const [current, setCurrent] = React.useState('bun');
	
	return (
		<section>
			<h2 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h2>
			<div className={styles.tabs}>
				<Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
					Булки
				</Tab>
				<Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
					Соусы
				</Tab>
				<Tab value="main" active={current === 'main'} onClick={setCurrent}>
					Начинки
				</Tab>
    	</div>
			<ul className={`${styles.cards__container} custom-scroll mt-10`}>
				<li>
					<h3 className="text text_type_main-medium">Булки</h3>
					<ul className={`${styles.card__container} pt-6 pr-4 pb-10 pl-4`}>
						{data.map((ingredient)=>
							ingredient.type === "bun" && <Card key={ingredient._id} data={ingredient} toggleModal={toggleModal} />
						)}
					</ul>
				</li>
				<li>
					<h3 className="text text_type_main-medium">Соусы</h3>
					<ul className={`${styles.card__container} pt-6 pr-4 pb-10 pl-4`}>
						{data.map((ingredient)=>
							ingredient.type === "sauce" && <Card key={ingredient._id} data={ingredient} toggleModal={toggleModal} />
						)}
					</ul>
				</li>
				<li>
					<h3 className="text text_type_main-medium">Начинки</h3>
					<ul className={`${styles.card__container} pt-6 pr-4 pb-10 pl-4`}>
						{data.map((ingredient)=>
							ingredient.type === "main" && <Card key={ingredient._id} data={ingredient} toggleModal={toggleModal} />
						)}
					</ul>
				</li>
			</ul>
		</section>
	);
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType).isRequired,
  toggleModal: PropTypes.func.isRequired
};

export default BurgerIngredients;