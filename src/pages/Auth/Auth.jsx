import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Form from '../../components/Form/Form.jsx';
import { fetchLogin, fetchRegistration } from '../../redux/user/userSlice.js';
import { setToken } from '../../service/token.js';
import {
  loginFields,
  loginFormValues,
  loginValidationSchema,
  registrationFields,
  registrationFormValues,
  registrationValidationSchema,
} from '../../components/Form/form.js';

const Auth = ({ type }) => {
  const [message, setMessage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLoginHandler = async (values) => {
    dispatch(fetchLogin(values))
      .then((data) => {
        if ('error' in data) {
          setMessage('Введены неверные данные');
        } else {
          setMessage('Вы авторизованы');
          setToken(data.payload.data.token);
          navigate('/');
        }
      })
      .catch(() => {
        setMessage('Ошибка работы сервера');
      });
  };

  const onRegisterHandler = async (values) => {
    dispatch(fetchRegistration(values))
      .then((data) => {
        if ('error' in data) {
          setMessage('Пользователь уже зарегистрирован');
        } else {
          setMessage('Вы успешно зарегистрированы');
          navigate('/login');
        }
      })
      .catch(() => {
        setMessage('Ошибка работы сервера');
      });
  };

  return (
    <section>
      {type === 'registration' ? (
        <Form
          fields={registrationFields}
          formValues={registrationFormValues}
          validationSchema={registrationValidationSchema}
          onSubmit={onRegisterHandler}
          submitName="Зарегистрироваться"
          formName="Регистрация"
          message={message}
        />
      ) : type === 'login' ? (
        <Form
          fields={loginFields}
          formValues={loginFormValues}
          validationSchema={loginValidationSchema}
          onSubmit={onLoginHandler}
          submitName="Вход"
          formName="Войти"
          message={message}
        />
      ) : null}
    </section>
  );
};

export default Auth;
