import { FC, useMemo } from 'react';
import styles from './order-card.module.css';
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from '../../utils/hooks';
import OrderIngredientsIcons from '../order-ingredients-icons/order-ingredients-icons';
import { statusConvert } from '../../utils/statusConvert';
import { WsOrder } from '../../utils/types';

type Props = {
    order: WsOrder;
    statusVisibility?: boolean;
}

const OrderCard: FC<Props> = ({order, statusVisibility = false}) => {
    const { ingredients } = useSelector(store => store.burgerIngredients);
    const orderIngredients = useMemo(
        () => order.ingredients.map(element => ingredients.find(ingredient => ingredient._id === element) || null).filter(Boolean),
        [ingredients, order]
    );

    const sum = useMemo(
        () => orderIngredients.reduce((accumulator, ingredient) => ingredient ? accumulator + ingredient.price : accumulator, 0),
        [orderIngredients]
    );
    const status = statusConvert(order.status);
    
    return order ? (
        <li className={styles.container}>
            <div className={styles.date_number_container}>
                <p className="text text_type_digits-default">{`#${order.number}`}</p>
                <p className="text text_type_main-default text_color_inactive">
                    <FormattedDate date={new Date(order.createdAt)} /> i-GMT+3
                </p>
            </div>
            <div className={styles.name_status_container}>
                <p className="text text_type_main-medium">{order.name}</p>
                {statusVisibility && <p className="text text_type_main-small" style={{ color: status.color }}>{status.text}</p>}
            </div>
            <div className={styles.icons_sum_container}>
                <OrderIngredientsIcons icons={orderIngredients} />
                <div className={styles.sum_container}>
                    <p className="text text_type_digits-default">{sum}</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </li>
    ) : null
}

export default OrderCard;