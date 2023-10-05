import styles from './feed-order-details.module.css';
import { useParams } from "react-router-dom";
import { api } from "../../utils/api";
import { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { statusConvert } from "../../utils/statusConvert";
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';

function FeedOrderDetails() {
    const [order, setOrder] = useState();
    const { orderNumber } = useParams({});
    const { ingredients } = useSelector(store => store.burgerIngredients);

    useEffect(() => {
        api.getOrder(orderNumber).then(res => setOrder(res.orders[0]));
    }, [orderNumber])
    const orderIngredients = useMemo(
        () => order?.ingredients.map(element => ingredients.find(ingredient => ingredient._id === element)).filter(Boolean),
        [ingredients, order]
    );
    const sum = useMemo(
        () => orderIngredients?.reduce((accumulator, ingredient) => accumulator + ingredient.price, 0),
        [orderIngredients]
    );
    const stackedIngredients = useMemo(
        () => orderIngredients?.reduce((acc, ingredient) => {
            let found = false;

            acc.forEach(item => {
                if (item._id === ingredient._id) {
                    found = true;
                    item.count++;
                }
            })

            if (!found) {
                ingredient = { ...ingredient, count: 1 };
                acc.push(ingredient);
            }

            return acc;
        }, []),
        [orderIngredients]
    );
    const status = statusConvert(order?.status);


    return (
        <div className={styles.container}>
            <p className={`${styles.number} text text_type_digits-default mb-10`}>{`#${order?.number}`}</p>
            <h2 className="text text_type_main-medium mb-3">{order?.name}</h2>
            <p className="text text_type_main-small mb-15" style={{ color: status.color }}>{status?.text}</p>
            <p className="text text_type_main-medium mb-6">Состав:</p>
            <ul className={`${styles.ingredients} custom-scroll pr-6 mb-10`}>
                {stackedIngredients?.map(ingredient =>
                    <li className={styles.ingredient} key={ingredient._id}>
                        <div className={styles.image_container}>
                            <img className={styles.image} src={ingredient.image} alt={ingredient.name} />
                        </div>
                        <p className="pl-4 pr-4 text text_type_main-default">{ingredient.name}</p>
                        <div className={styles.sum_container}>
                            <p className="text text_type_digits-default">{`${ingredient.count} x ${ingredient.price}`}</p>
                            <CurrencyIcon type="primary" />
                        </div>
                    </li>
                )}
            </ul>
            <div className={styles.date_sum_container}>
                <p className="text text_type_main-default text_color_inactive">
                    <FormattedDate date={new Date(order?.createdAt)} /> i-GMT+3
                </p>
                <div className={styles.sum_container}>
                    <p className="text text_type_digits-default">{sum}</p>
                    <CurrencyIcon type="primary" />
                </div>
            </div>
        </div>
    )
}

export default FeedOrderDetails;