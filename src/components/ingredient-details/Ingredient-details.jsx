import { useSelector } from 'react-redux';
import styles from './Ingredient-details.module.css';

function IngredientDetails() {
  const { data } = useSelector(store => store.modal);

	return (
    <div className={styles.container}>
      <h2 className={`${styles.header} text text_type_main-large pt-10 pl-10`}>Детали ингредиента</h2>
      <img className={styles.image} src={data.image} alt={data.name}></img>
      <span className='text text_type_main-medium pt-4'>{data.name}</span>
      <ul className={styles.nutrientsList}>
        <li className={styles.nutrientsItem}>
          <span className='text text_type_main-default text_color_inactive'>Калории, ккал</span>
          <span className='text text_type_digits-default text_color_inactive'>{data.calories}</span>
        </li>
        <li className={styles.nutrientsItem}>
          <span className='text text_type_main-default text_color_inactive'>Белки, г</span>
          <span className='text text_type_digits-default text_color_inactive'>{data.proteins}</span>
        </li>
        <li className={styles.nutrientsItem}>
          <span className='text text_type_main-default text_color_inactive'>Жиры, г</span>
          <span className='text text_type_digits-default text_color_inactive'>{data.fat}</span>
        </li>
        <li className={styles.nutrientsItem}>
          <span className='text text_type_main-default text_color_inactive'>Углеводы, г</span>
          <span className='text text_type_digits-default text_color_inactive'>{data.carbohydrates}</span>
        </li>
      </ul>
    </div>
  )
}

export default IngredientDetails;