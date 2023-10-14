import formStyles from '../../utils/form-styles.module.css'
import { EmailInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useForm } from '../../utils/hooks';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../../utils/api';
import { FC, FormEvent } from 'react';

const ForgotPassword: FC = () => {
    const { values, onChange} = useForm({
        email: ''
    });
    const navigate = useNavigate();
    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        api.forgotPassword(values)
        .then(() => {
            localStorage.setItem('resetPassword', 'true');
            navigate('/reset-password');
        })
    }

    return (
        <main className={formStyles.main}>
            <form onSubmit={submitHandler} className={formStyles.form}>
                <h2 className='text text_type_main-medium'>Восстановление пароля</h2>
                <EmailInput
                    onChange={onChange}
                    value={values.email}
                    name={'email'}
                    placeholder={'Укажите e-mail'}
                    required
                />
                <Button htmlType="submit" type="primary" size="medium">
                    Восстановить
                </Button>
            </form>
            <div className={formStyles.text_container}>
                <p className='text text_type_main-default'>Вспомнили пароль? <Link className={formStyles.link} to={'/login'}>Войти</Link></p>
            </div>
        </main>
    )
}

export default ForgotPassword;