import { useState, useRef } from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import IngredientsType from "../ingredients-type/ingredients-type";

function BurgerIngredients() {
	const [currentTab, setCurrentTab] = useState('bun');
	const selectTab = (type) => {
		setCurrentTab(type);
		document.querySelector(`#${type}`).scrollIntoView({ behavior: "smooth" });
	}
	const bunRef = useRef(null);
	const sauceRef = useRef(null);
	const mainRef = useRef(null);
	const tabOnScroll = () => {
		const bunTop = Math.abs(bunRef.current.getBoundingClientRect().top);
		const sauceTop = Math.abs(sauceRef.current.getBoundingClientRect().top);
		const mainTop = Math.abs(mainRef.current.getBoundingClientRect().top);

		if (bunTop <= sauceTop && bunTop <= mainTop) {
      setCurrentTab('bun');
    } else if (sauceTop < bunTop && sauceTop < mainTop) {
      setCurrentTab('sauce');
    } else {
      setCurrentTab('main');
    }
	}

	const dispatch = useDispatch();
	const { ingredients, isLoading, error } = useSelector(state => state.burgerIngredients);

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
			<ul onScroll={tabOnScroll} className={`${styles.cards__container} custom-scroll mt-10`}>
				{error ? (
					<>О нет, ошибка</>
				) : isLoading ? (
					<>Ждем</>
				) : ingredients.length ? (
					<>
						<IngredientsType ref={bunRef} ingredients={ingredients} type={'bun'} header={'Булки'} />
						<IngredientsType ref={sauceRef} ingredients={ingredients} type={'sauce'} header={'Cоусы'} />
						<IngredientsType ref={mainRef} ingredients={ingredients} type={'main'} header={'Начинки'} />
					</>
				) : null}
			</ul>
		</section>
	);
}

export default BurgerIngredients;