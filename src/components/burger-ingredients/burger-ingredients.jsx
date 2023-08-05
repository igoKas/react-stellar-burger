import React, { useEffect } from "react";
import styles from "./burger-ingredients.module.css"
import Card from "../card/card";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { getIngredients } from "../../utils/api";

function BurgerIngredients() {
	const [currentTab, setCurrentTab] = React.useState('bun');
	const selectTab = (type) => {
		setCurrentTab(type);
		document.querySelector(`#${type}`).scrollIntoView({behavior: "smooth"});
	}

	const dispatch = useDispatch();
	const { ingredients, isLoading, error} = useSelector(state => state.burgerIngredients);
	useEffect(() => {
		dispatch(getIngredients());
	}, [dispatch]);

	return (
		<section>
			<h2 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h2>
			<div className={styles.tabs}>
				<Tab value="bun" active={currentTab === 'bun'} onClick={() => selectTab('bun')}>
					Булки
				</Tab>
				<Tab value="sauce" active={currentTab === 'sauce'} onClick={() => selectTab('sauce')}>
					Соусы
				</Tab>
				<Tab value="main" active={currentTab === 'main'} onClick={() => selectTab('main')}>
					Начинки
				</Tab>
			</div>
			{error ? (
				<>О нет, ошибка</>
			) : isLoading ? (
				<>Ждем</>
			) : ingredients.length ? (
				<>
					<ul className={`${styles.cards__container} custom-scroll mt-10`}>
						<li id="bun" className="type">
							<h3 className="text text_type_main-medium">Булки</h3>
							<ul className={`${styles.card__container} pt-6 pr-4 pb-10 pl-4`}>
								{ingredients.map((ingredient) =>
									ingredient.type === "bun" && <Card key={ingredient._id} ingredient={ingredient} />
								)}
							</ul>
						</li>
						<li id="sauce" className="type">
							<h3 className="text text_type_main-medium">Соусы</h3>
							<ul className={`${styles.card__container} pt-6 pr-4 pb-10 pl-4`}>
								{ingredients.map((ingredient) =>
									ingredient.type === "sauce" && <Card key={ingredient._id} ingredient={ingredient} />
								)}
							</ul>
						</li>
						<li id="main" className="type">
							<h3 className="text text_type_main-medium">Начинки</h3>
							<ul className={`${styles.card__container} pt-6 pr-4 pb-10 pl-4`}>
								{ingredients.map((ingredient) =>
									ingredient.type === "main" && <Card key={ingredient._id} ingredient={ingredient} />
								)}
							</ul>
						</li>
					</ul>
				</>
			) : null}
		</section>
	);
}

export default BurgerIngredients;