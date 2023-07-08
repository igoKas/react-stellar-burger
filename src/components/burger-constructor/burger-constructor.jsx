import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';
import styles from "./burger-constructor.module.css";
import { DragIcon, Button, CurrencyIcon, ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";

function BurgerConstructor({ data, toggleModal }) {


	return (
    <section className="pt-25 pb-8">
      <ul className={styles.constructorContainer}>
        <li className={styles.lockItem}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text={`${data[0].name} (верх)`}
            price={data[0].price}
            thumbnail={data[0].image}
          />
        </li>
        <li>
          <ul className={`${styles.constructorScrollContainer} custom-scroll`}>
            <li className={styles.scrollItem}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={data[0].name}
                price={data[0].price}
                thumbnail={data[0].image}
              />
            </li>
            <li className={styles.scrollItem}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={data[0].name}
                price={data[0].price}
                thumbnail={data[0].image}
              />
            </li>
            <li className={styles.scrollItem}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={data[0].name}
                price={data[0].price}
                thumbnail={data[0].image}
              />
            </li>
            <li className={styles.scrollItem}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={data[0].name}
                price={data[0].price}
                thumbnail={data[0].image}
              />
            </li>
            <li className={styles.scrollItem}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={data[0].name}
                price={data[0].price}
                thumbnail={data[0].image}
              />
            </li>
            <li className={styles.scrollItem}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={data[0].name}
                price={data[0].price}
                thumbnail={data[0].image}
              />
            </li>
          </ul>
        </li>
        <li className={styles.lockItem}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${data[0].name} (низ)`}
            price={data[0].price}
            thumbnail={data[0].image}
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