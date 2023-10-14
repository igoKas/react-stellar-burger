import { useState, useRef, FC } from "react";
import styles from "./burger-ingredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useSelector } from "../../utils/hooks";
import IngredientsType from "../ingredients-type/ingredients-type";

const BurgerIngredients: FC = () => {
	const [currentTab, setCurrentTab] = useState('bun');
	const selectTab = (type: string) => {
		setCurrentTab(type);
		document.querySelector(`#${type}`)?.scrollIntoView({ behavior: "smooth" });
	}
	const bunRef = useRef<HTMLLIElement>(null);
	const sauceRef = useRef<HTMLLIElement>(null);
	const mainRef = useRef<HTMLLIElement>(null);
	const tabOnScroll = () => {
		const bunTop = Math.abs((bunRef.current?.getBoundingClientRect().top || 0) - 135);
		const sauceTop = Math.abs((sauceRef.current?.getBoundingClientRect().top || 0) - 135);
		const mainTop = Math.abs((mainRef.current?.getBoundingClientRect().top || 0) - 135);

		if (bunTop <= sauceTop && bunTop <= mainTop) {
      setCurrentTab('bun');
    } else if (sauceTop < bunTop && sauceTop < mainTop) {
      setCurrentTab('sauce');
    } else {
      setCurrentTab('main');
    }
	}

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