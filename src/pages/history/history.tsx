import styles from './history.module.css';
import OrderCard from '../../components/order-card/order-card';
import { useDispatch, useSelector } from '../../utils/hooks';
import { FC, useEffect } from 'react';
import { connect, disconnect } from '../../services/live-orders-profile/actions';
import { WSSPATH } from '../../utils/constants';
import { WebsocketStatus } from '../../utils/live-orders';
import { Link, useLocation } from 'react-router-dom';

const History: FC = () => {
    const { orders, status, connectingError } = useSelector(store => store.liveOrdersProfile);
    const dispatch = useDispatch();
    const location = useLocation();
    const accessToken = localStorage.getItem("accessToken")?.split(' ')[1];
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
                        <Link key={order._id} state={{ background: location }} to={`/profile/orders/${order.number}`} className={styles.link}>
                            <OrderCard order={order} statusVisibility={true} />
                        </Link>
                    )}
                </>
            ) : null}
        </ul>
    )
}

export default History;