import formStyles from '../../utils/form-styles.module.css'
import { EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useForm } from '../../utils/hooks';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../services/actions';

function Login() {
    const dispatch = useDispatch();
    const { values, onChange} = useForm({
        email: '',
        password: ''
    });
    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(login(values));
    }

    return (
        <main className={formStyles.main}>
            <form onSubmit={handleLogin} className={formStyles.form}>
                <h2 className='text text_type_main-medium'>Вход</h2>
                <EmailInput
                    onChange={onChange}
                    value={values.email}
                    name={'email'}
                    isIcon={false}
                />
                <PasswordInput
                    onChange={onChange}
                    value={values.password}
                    name={'password'}
                />
                <Button htmlType="submit" type="primary" size="medium">
                    Войти
                </Button>
            </form>
            <div className={formStyles.text_container}>
                <p className='text text_type_main-default'>Вы — новый пользователь? <Link className={formStyles.link} to={'/register'}>Зарегистрироваться</Link></p>
                <p className='text text_type_main-default'>Забыли пароль? <Link className={formStyles.link} to={'/forgot-password'}>Восстановить пароль</Link></p>
            </div>
        </main>
    )
}

export default Login;