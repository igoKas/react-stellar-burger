import formStyles from '../../utils/form-styles.module.css'
import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useForm } from '../../utils/hooks';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { api } from '../../utils/api';
import { useEffect } from 'react';

function ResetPassword() {
    const { values, onChange} = useForm({
        password: '',
        token: ''
    });
    const navigate = useNavigate();
    const submitHandler = (e) => {
        e.preventDefault();
        api.resetPassword(values)
        .then(() => {
            localStorage.removeItem('resetPassword');
            navigate('/login');
        })
    }

    useEffect(() => {
        return localStorage.removeItem('resetPassword');
    })

    return localStorage.getItem("resetPassword") ?
     (
        <main className={formStyles.main}>
            <form onSubmit={e => submitHandler(e)} className={formStyles.form}>
                <h2 className='text text_type_main-medium'>Восстановление пароля</h2>
                <PasswordInput
                    onChange={e => onChange(e)}
                    value={values.password}
                    name={'password'}
                    placeholder={'Введите новый пароль'}
                />
                <Input
                    type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={e => onChange(e)}
                    value={values.token}
                    name={'token'}
                />
                <Button htmlType="submit" type="primary" size="medium">
                    Сохранить
                </Button>
            </form>
            <div className={formStyles.text_container}>
                <p className='text text_type_main-default'>Вспомнили пароль? <Link className={formStyles.link} to={'/login'}>Войти</Link></p>
            </div>
        </main>
    ) : <Navigate to="/" />
}

export default ResetPassword;