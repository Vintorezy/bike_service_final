import * as yup from 'yup';

const registrationFields = [
  { id: 1, label: 'Имя', name: 'firstName', type: 'text' },
  { id: 2, label: 'Фамилия', name: 'lastName', type: 'text' },
  { id: 3, label: 'Email', name: 'email', type: 'text' },
  { id: 4, label: 'Пароль', name: 'password', type: 'password' },
  { id: 5, label: 'Client ID', name: 'clientId', type: 'text' },
];

const registrationFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  clientId: '',
};

const registrationValidationSchema = yup.object().shape({
  firstName: yup.string(),
  lastName: yup.string(),
  email: yup.string().email('Введите корректный E-mail').required('Заполните поле'),
  password: yup.string().min(8, 'Минимум 8 символов').required('Заполните поле'),
  clientId: yup.string().required('Заполните поле'),
});

const loginFields = [
  { id: 1, label: 'Email', name: 'email', type: 'text' },
  { id: 2, label: 'Пароль', name: 'password', type: 'password' },
];

const loginFormValues = { email: '', password: '' };

const loginValidationSchema = yup.object().shape({
  email: yup.string().email('Введите корректный E-mail').required('Заполните поле'),
  password: yup.string().min(8, 'Минимум 8 символов').required('Заполните поле'),
});

const reportFields = [
  { id: 1, label: 'Номер лицензии', name: 'licenseNumber', type: 'text' },
  { id: 2, label: 'ФИО владельца', name: 'ownerFullName', type: 'text' },
  { id: 3, label: 'Client ID', name: 'clientId', type: 'text' },
  { id: 4, label: 'Цвет', name: 'color', type: 'text' },
  { id: 5, label: 'Дата кражи', name: 'date', type: 'text' },
  { id: 6, label: 'Доп. информация', name: 'description', type: 'text' },
];

const reportEditFields = [
  { id: 1, label: 'Номер лицензии', name: 'licenseNumber', type: 'text' },
  { id: 2, label: 'ФИО владельца', name: 'ownerFullName', type: 'text' },
  { id: 3, label: 'Цвет', name: 'color', type: 'text' },
  { id: 4, label: 'Дата кражи', name: 'date', type: 'text' },
  { id: 5, label: 'Доп. информация', name: 'description', type: 'text' },
  { id: 6, label: 'Решение', name: 'resolution', type: 'text' },
];

const reportFormValues = {
  licenseNumber: '',
  ownerFullName: '',
  clientId: '',
  color: '',
  description: '',
};

const reportValidationSchema = yup.object().shape({
  licenseNumber: yup.string().required('Заполните поле'),
  ownerFullName: yup.string().required('Заполните поле'),
  clientId: yup.string().required('Заполните поле'),
});

const reportEditValidationSchema = yup.object().shape({
  licenseNumber: yup.string().required('Заполните поле'),
  ownerFullName: yup.string().required('Заполните поле'),
});

const officerFields = [
  { id: 1, label: 'Имя', name: 'firstName', type: 'text' },
  { id: 2, label: 'Фамилия', name: 'lastName', type: 'text' },
  { id: 3, label: 'Email', name: 'email', type: 'text' },
  { id: 4, label: 'Пароль', name: 'password', type: 'password' },
];

const officerFormValues = { firstName: '', lastName: '', email: '', password: '' };

const officerValidationSchema = yup.object().shape({
  email: yup.string().email('Введите верный E-mail').required('Заполните поле'),
  password: yup.string().min(8, 'Минимум 8 символов').required('Заполните поле'),
});

const officerEditFields = [
  { id: 1, label: 'Имя', name: 'firstName', type: 'text' },
  { id: 2, label: 'Фамилия', name: 'lastName', type: 'text' },
];

export {
  registrationFields,
  registrationFormValues,
  registrationValidationSchema,
  loginFormValues,
  loginValidationSchema,
  loginFields,
  reportFields,
  reportFormValues,
  reportValidationSchema,
  officerFields,
  officerFormValues,
  officerValidationSchema,
  officerEditFields,
  reportEditFields,
  reportEditValidationSchema,
};
