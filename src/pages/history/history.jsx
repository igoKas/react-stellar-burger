import styles from './history.module.css';
import OrderCard from '../../components/order-card/order-card';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { connect, disconnect } from '../../services/live-orders-profile/actions';
import { WSSPATH } from '../../utils/constants';
import { WebsocketStatus } from '../../utils/live-orders';
import { Link } from 'react-router-dom';

function History() {
    const { orders, status, connectingError } = useSelector(store => store.liveOrdersProfile);
    const dispatch = useDispatch();
    const accessToken = localStorage.getItem("accessToken").split(' ')[1];
    useEffect(() => {
        dispatch(connect(`${WSSPATH}/orders?token=${accessToken}`));
        return () => {
            dispatch(disconnect())
        }
    }, [dispatch, accessToken]);
    return (
        <ul className={`${styles.container} custom-scroll mt-10`}>
            {connectingError ? (
                <>О нет, ошибка</>
            ) : status !== WebsocketStatus.ONLINE ? (
                <>Ждем</>
            ) : orders?.length ? (
                <>
                    {orders.toReversed().map(order => 
                        <Link key={order._id} to={`/profile/orders/${order.number}`} className={styles.link}>
                            <OrderCard order={order} statusVisibility={true} />
                        </Link>
                    )}
                </>
            ) : null}
        </ul>
    )
}

export default History;