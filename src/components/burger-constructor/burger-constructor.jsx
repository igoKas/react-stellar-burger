import React from 'react';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';
import styles from "./burger-constructor.module.css";
import { DragIcon, Button, CurrencyIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerConstructor({ data, toggleModal }) {
  const [bun, setBun] = React.useState({});
  const [ingredients, setIngredients] = React.useState([]);

  React.useEffect(() => {
    setBun(data.find(ingredient => ingredient.type === 'bun'));
    setIngredients(data.filter(ingredient => ingredient.type !== 'bun'));
  }, [data])

	return (
    <section className="pt-25 pb-8">
      <ul className={styles.constructorContainer}>
        <li className={styles.lockItem}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </li>
        <li>
          <ul className={`${styles.constructorScrollContainer} custom-scroll`}>
            {ingredients.map(ingredient =>
							<li key={ingredient._id} className={styles.scrollItem}>
                <DragIcon type="primary" />
                <ConstructorElement
                  text={ingredient.name}
                  price={ingredient.price}
                  thumbnail={ingredient.image}
                />
              </li>
						)}
          </ul>
        </li>
        <li className={styles.lockItem}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        </li>
      </ul>
      <div className={styles.sumButtonContainer}>
        <div className={styles.sumContainer}>
          <span className="text text_type_main-medium">123</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="medium" onClick={toggleModal}>
          Оформить заказ
        </Button>
      </div>
    </section>
	);
}

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientPropType).isRequired,
  toggleModal: PropTypes.func.isRequired
};


export default BurgerConstructor;