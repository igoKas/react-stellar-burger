import formStyles from '../../utils/form-styles.module.css';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useForm } from '../../utils/hooks';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { register } from '../../services/actions';

function Register() {
    const dispatch = useDispatch();
    const { values, onChange} = useForm({
        name: '',
        email: '',
        password: ''
    });
    const handleRegister = (e) => {
        e.preventDefault();
        dispatch(register(values));
    }

    return (
        <main className={formStyles.main}>
            <form onSubmit={handleRegister} className={formStyles.form}>
                <h2 className='text text_type_main-medium'>Регистрация</h2>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={onChange}
                    value={values.name}
                    name={'name'}
                    />
                <EmailInput
                    onChange={onChange}
                    value={values.email}
                    name={'email'}
                />
                <PasswordInput
                    onChange={onChange}
                    value={values.password}
                    name={'password'}
                />
                <Button htmlType="submit" type="primary" size="medium">
                    Зарегистрироваться
                </Button>
            </form>
            <div className={formStyles.text_container}>
                <p className='text text_type_main-default'>Уже зарегистрированы? <Link className={formStyles.link} to={'/login'}>Войти</Link></p>
            </div>
        </main>
    )
}

export default Register;