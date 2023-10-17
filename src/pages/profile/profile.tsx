import formStyles from '../../utils/form-styles.module.css';
import styles from './profile.module.css';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useForm } from '../../utils/hooks';
import { NavLink, Outlet, useMatch } from 'react-router-dom';
import { useDispatch, useSelector } from '../../utils/hooks';
import { api } from '../../utils/api';
import { setUser } from '../../services/user-slice';
import { logout } from '../../services/actions';
import { FC, FormEvent } from 'react';

const Profile: FC = () => {
    const isProfile = useMatch("/profile");
    const isProfileOrders = useMatch("/profile/orders");
    const dispatch = useDispatch();
    const name = useSelector(store => store.user.user?.name || '');
    const email = useSelector(store => store.user.user?.email || '');

    const initialFromState = {
        name,
        email,
        password: ''
    }

    const { values, onChange, setValues } = useForm(initialFromState);

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        api.patchUser(values)
            .then(res => dispatch(setUser(res.user)));
    };

    const resetHandler = () => {
        setValues(initialFromState);
    };

    const logoutHandler = () => {
        dispatch(logout());
    };

    return (
        <main className={styles.main}>
            <div className={styles.nav_section}>
                <ul className={styles.nav_list}>
                    <li>
                        <NavLink to={`/profile`} end className={({ isActive }) => isActive ? styles.link : styles.link_inactive}>
                            <span className="text text_type_main-medium">Профиль</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={`/profile/orders`} className={({ isActive }) => isActive ? styles.link : styles.link_inactive}>
                            <span className="text text_type_main-medium">История заказов</span>
                        </NavLink>
                    </li>
                    <li>
                        <Button className={styles.exit_button} onClick={logoutHandler} htmlType="button" type="secondary" size="medium">
                            <span className="text text_type_main-medium">Выход</span>
                        </Button>
                    </li>
                </ul>
                {isProfile && <p className='text text_type_main-default text_color_inactive'>
                    В этом разделе вы можете изменить&nbsp;свои персональные данные
                </p>}
                {isProfileOrders && <p className='text text_type_main-default text_color_inactive'>
                    В этом разделе вы можете просмотреть свою историю заказов
                </p>}
            </div>
            {isProfile &&
                <div className={styles.form}>
                    <form onSubmit={submitHandler} className={formStyles.form}>
                        <Input
                            type={'text'}
                            placeholder={'Имя'}
                            onChange={onChange}
                            value={values.name}
                            name={'name'}
                            autoComplete='name'
                        />
                        <EmailInput
                            onChange={onChange}
                            value={values.email}
                            name={'email'}
                            autoComplete='email'
                        />
                        <PasswordInput
                            onChange={onChange}
                            value={values.password}
                            name={'password'}
                            autoComplete='current-password'
                        />
                        <div className={styles.button_container}>
                            <Button htmlType="submit" type="primary" size="medium">
                                Сохранить
                            </Button>
                            <Button onClick={resetHandler} htmlType="button" type="primary" size="medium">
                                Отменить
                            </Button>
                        </div>
                    </form>
                </div>}
            {isProfileOrders && <Outlet />}
        </main>
    )
}

export default Profile;

