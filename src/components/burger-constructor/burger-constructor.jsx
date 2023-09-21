import styles from "./burger-constructor.module.css";
import { Button, CurrencyIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from "react-dnd";
import { addIngredient } from '../../services/burger-constructor-slice';
import { v4 } from 'uuid';
import DraggableItem from "../draggable-items/draggable-items";
import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function BurgerConstructor() {
  const { bun, ingredients } = useSelector(store => store.burgerConstructor);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector(store => store.user.user)
  const sum = useMemo(
    () => [...ingredients, bun || 0, bun || 0].reduce((accumulator, ingredient) => accumulator + ingredient.price, 0),
    [ingredients, bun]
  );

  const [{ isOver }, dropRef] = useDrop({
    accept: 'ingredient',
    drop(item) {
			dispatch(addIngredient({...item, uuid: v4()}));
    },
    collect: monitor => ({
      isOver: monitor.isOver()
    })
  })
  const isOverStyle = isOver ? {outline: '1px solid #4C4CFF'} : null;

	return (
    <section className={`${styles.constructorSectionContainer} pt-25 pb-8`}>
      <ul ref={dropRef} className={styles.constructorContainer} style={isOverStyle}>
        <li className={styles.lockItem}>
          {bun &&
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />}
        </li>
        <li>
          <ul className={`${styles.constructorScrollContainer} custom-scroll`}>
            {ingredients.map((ingredient, index) =>
							<DraggableItem key={ingredient.uuid} index={index} ingredient={ingredient}/>
						)}
          </ul>
        </li>
        <li className={styles.lockItem}>
          {bun &&
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />}
        </li>
      </ul>
      <div className={styles.sumButtonContainer}>
        {sum ?
          <div className={styles.sumContainer}>
          <span className="text text_type_main-medium">{sum}</span>
          <CurrencyIcon type="primary" />
        </div> :
        null}
        <Button
        onClick={() => {user ? navigate('/order-info', { state: { background: location } }) : navigate('/login') }}
        disabled={!bun && !ingredients.length}
        htmlType="button"
        type="primary"
        size="medium">
          Оформить заказ
        </Button>
      </div>
    </section>
	);
}

export default BurgerConstructor;