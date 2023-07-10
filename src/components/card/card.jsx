import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from './card.module.css';


function Card({data, toggleModal}) {

	return (
		<li className={styles.card} onClick={() => toggleModal(data)}>
			<div className={`${styles.card__amount} text text_type_digits-default`}>1</div>
			<img className="pl-4 pr-4" src={data.image} alt={data.name} />
			<div className={styles.card__price}>
				<span className="text text_type_digits-default">{data.price}</span>
				<CurrencyIcon type="primary" />
			</div>
			<span className={`${styles.card__name} text text_type_main-small pb-7`}>{data.name}</span>
		</li>
	);
}

Card.propTypes = {
  data: ingredientPropType.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default Card;