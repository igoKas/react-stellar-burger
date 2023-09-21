import styles from './feed.module.css';
import OrderCard from '../../components/order-card/order-card';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { connect, disconnect } from '../../services/live-orders/actions';
import { WSSPATH } from '../../utils/constants';
import { WebsocketStatus } from '../../utils/live-orders';
import { Link } from 'react-router-dom';


function Feed() {
    const { orders, status, connectingError } = useSelector(store => store.liveOrders);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(connect(`${WSSPATH}/orders/all`));
        return () => {
            dispatch(disconnect())
        }
    }, [dispatch]);
    const ordersDone = useMemo(
        () => orders?.orders?.filter(order => order.status === 'done').map(order => order.number),
        [orders]
    );
    const ordersPending = useMemo(
        () => orders?.orders?.filter(order => order.status === 'pending').map(order => order.number),
        [orders]
    );

    return connectingError ? (
        <> О нет, ошибка</>
    ) : status !== WebsocketStatus.ONLINE ? (
        <>Ждем</>
    ) : orders?.orders?.length ? (
        <main className={styles.container}>
            <h2 className="text text_type_main-large mt-10 mb-5">Лента заказов</h2>
            <div className={styles.content_container}>
                <ul className={`${styles.orders_container} custom-scroll`}>
                    {orders.orders.toReversed().map(order =>
                        <Link key={order._id} to={`/feed/${order.number}`} className={styles.link}>
                            <OrderCard order={order} />
                        </Link>
                    )}
                </ul>
                <div className={styles.stats}>
                    <div className={styles.status_container}>
                        <div className={styles.status}>
                            <h3 className="text text_type_main-medium">Готовы:</h3>
                            <ul className={`${styles.done_pending} custom-scroll`}>
                                {ordersDone?.map(number =>
                                    <li className={`${styles.done} text text_type_digits-default`} key={number}>{number}</li>
                                )}
                            </ul>
                        </div>
                        <div className={styles.status}>
                            <h3 className="text text_type_main-medium">В работе:</h3>
                            <ul className={`${styles.done_pending} custom-scroll`}>
                                {ordersPending?.map(number =>
                                    <li className='text text_type_digits-default' key={number}>{number}</li>
                                )}
                            </ul>
                        </div>
                    </div>
                    <div>
                        <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
                        <p className={`${styles.digits} text text_type_digits-large`}>{orders?.total}</p>
                    </div>
                    <div>
                        <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
                        <p className={`${styles.digits} text text_type_digits-large`}>{orders?.totalToday}</p>
                    </div>
                </div>
            </div>
        </main>
    ) : null
}

export default Feed;