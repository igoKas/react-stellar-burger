import React from 'react';
import PropTypes from 'prop-types';
import styles from "./burger-constructor.module.css";
import { DragIcon, Button, CurrencyIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerContext } from '../../utils/burgerContext';

function BurgerConstructor({ toggleModal }) {
  const [bun, setBun] = React.useState(null);
  const [ingredients, setIngredients] = React.useState([]);
  const { constructorState, constructorDispatcher } = React.useContext(BurgerContext);



  React.useEffect(() => {
    setBun(constructorState.ingredients.find(ingredient => ingredient.type === 'bun'));
    setIngredients(constructorState.ingredients.filter(ingredient => ingredient.type !== 'bun'));
  }, [constructorState])

	return (
    <section className={`${styles.constructorSectionContainer} pt-25 pb-8`}>
      <ul className={styles.constructorContainer}>
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
            {ingredients.map(ingredient =>
							<li key={ingredient.uuid} className={styles.scrollItem}>
                <DragIcon type="primary" />
                <ConstructorElement
                  text={ingredient.name}
                  price={ingredient.price}
                  thumbnail={ingredient.image}
                  handleClose={() => constructorDispatcher({type: 'delete', payload: ingredient})}
                />
              </li>
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
        <div className={styles.sumContainer}>
          <span className="text text_type_main-medium">{constructorState.sum}</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button disabled={!constructorState.ingredients.length} htmlType="button" type="primary" size="medium" onClick={toggleModal}>
          Оформить заказ
        </Button>
      </div>
    </section>
	);
}

BurgerConstructor.propTypes = {
  toggleModal: PropTypes.func.isRequired
};


export default BurgerConstructor;