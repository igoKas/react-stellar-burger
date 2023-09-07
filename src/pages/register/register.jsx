import formStyles from '../../utils/form-styles.module.css';
import { Input, EmailInput, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useForm } from '../../utils/hooks';
import { Link } from 'react-router-dom';
import { register } from '../../utils/api';
import { setUser } from '../../services/user-slice';
import { useDispatch } from 'react-redux';

function Register() {
    const dispatch = useDispatch();
    const { values, onChange} = useForm({
        name: '',
        email: '',
        password: ''
    });
    const handleRegister = (e) => {
        e.preventDefault();
    }

    return (
        <main className={formStyles.main}>
            <form onSubmit={e => handleRegister(e)} className={formStyles.form}>
                <h2 className='text text_type_main-medium'>Регистрация</h2>
                <Input
                    type={'text'}
                    placeholder={'Имя'}
                    onChange={e => onChange(e)}
                    value={values.name}
                    name={'name'}
                    />
                <EmailInput
                    onChange={e => onChange(e)}
                    value={values.email}
                    name={'email'}
                />
                <PasswordInput
                    onChange={e => onChange(e)}
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