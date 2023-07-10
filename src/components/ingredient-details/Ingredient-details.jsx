import styles from './Ingredient-details.module.css';
import { ingredientPropType } from '../../utils/prop-types';

function IngredientDetails({ ingredient }) {
	return (
    <div className={styles.container}>
      <h2 className={`${styles.header} text text_type_main-large pt-10 pl-10`}>Детали ингредиента</h2>
      <img className={styles.image} src={ingredient.image} alt={ingredient.name}></img>
      <span className='text text_type_main-medium pt-4'>{ingredient.name}</span>
      <ul className={styles.nutrientsList}>
        <li className={styles.nutrientsItem}>
          <span className='text text_type_main-default text_color_inactive'>Калории, ккал</span>
          <span className='text text_type_digits-default text_color_inactive'>{ingredient.calories}</span>
        </li>
        <li className={styles.nutrientsItem}>
          <span className='text text_type_main-default text_color_inactive'>Белки, г</span>
          <span className='text text_type_digits-default text_color_inactive'>{ingredient.proteins}</span>
        </li>
        <li className={styles.nutrientsItem}>
          <span className='text text_type_main-default text_color_inactive'>Жиры, г</span>
          <span className='text text_type_digits-default text_color_inactive'>{ingredient.fat}</span>
        </li>
        <li className={styles.nutrientsItem}>
          <span className='text text_type_main-default text_color_inactive'>Углеводы, г</span>
          <span className='text text_type_digits-default text_color_inactive'>{ingredient.carbohydrates}</span>
        </li>
      </ul>
    </div>
  )
}

IngredientDetails.propTypes = {
  ingredient: ingredientPropType.isRequired,
}

export default IngredientDetails;