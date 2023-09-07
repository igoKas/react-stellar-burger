import { useSelector } from 'react-redux';
import styles from './Ingredient-details.module.css';
import { Navigate, useParams } from 'react-router-dom';

function IngredientDetails() {
  const { id } = useParams();
  const { ingredients, isLoading, error } = useSelector(store => store.burgerIngredients);
  const data = ingredients.find(({ _id }) => _id === id);

  return (
    <>
      {error ? (
        <>О нет, ошибка</>
      ) : isLoading ? (
        <>Ждем</>
      ) : data ? (
        <div className={`${styles.container} pt-10 pr-10 pl-10`}>
          <h2 className={`${styles.header} text text_type_main-large`}>Детали ингредиента</h2>
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
      ) : <Navigate to="/404" />}
    </>
  )
}

export default IngredientDetails;