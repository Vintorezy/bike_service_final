import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../../components/Form/Form.jsx';
import { createOfficer, editOfficer } from '../../service/officers.js';
import { getOfficer } from '../../service/officers.js';
import { useSelector } from 'react-redux';
import { checkAuth } from '../../utils/checkAuth.js';
import {
  officerFields,
  officerFormValues,
  officerValidationSchema,
  officerEditFields,
} from '../../components/Form/form.js';
import styles from './officersForm.module.scss';

const OfficersForm = () => {
  const userData = useSelector((state) => state.user);
  const location = useNavigate();
  const [officer, setOfficer] = useState(null);
  const [message, setMessage] = useState(null);
  const [approved, setApproved] = useState(false);

  const onCreateHandler = (props) => {
    createOfficer({ ...props, approved })
      .then(() => {
        setMessage('Сотрудник зарегистрирован');
        location('/officers');
      })
      .catch((data) => setMessage(data.response.data.message));
  };

  const onEditHaldler = (props) => {
    editOfficer({ ...props, approved, id: officer._id })
      .then(() => {
        setMessage('Cотрудник изменен');
        location('/officers');
      })
      .catch((data) => {
        if (data.response && data.response.data) {
          setMessage(data.response.data.message);
        } else {
          setMessage('Произошла ошибка при изменении сотрудника');
        }
      });
  };

  const officerId = window.location.pathname.split('/')[3];

  useEffect(() => {
    if (checkAuth(userData.data, userData.status)) {
      if (officerId) {
        getOfficer(officerId)
          .then((data) => {
            setOfficer(data.data);
            setApproved(data.data.approved);
          })
          .catch((data) => setMessage(data.response.data.message));
      }
    }
  }, [userData.data, userData.status, officerId]);

  if (officerId && officer) {
    return (
      <section className="sectionOfficersCreate">
        <Form
          fields={officerEditFields}
          formValues={{ firstName: officer.firstName, lastName: officer.lastName }}
          onSubmit={onEditHaldler}
          submitName="Редактировать"
          formName="Редактировать сотрудника"
          message={message}
          isDirty={true}
          isValided={true}>
          <div className={styles.checkbox}>
            <label htmlFor="approved">Одобрить:</label>
            <input
              type="checkbox"
              name="approved"
              defaultChecked={officer.approved}
              value={approved}
              onChange={() => setApproved((prev) => !prev)}
            />
          </div>
        </Form>
      </section>
    );
  } else if (!officer && !officerId) {
    return (
      <section className="sectionOfficersCreate">
        <Form
          fields={officerFields}
          formValues={officerFormValues}
          validationSchema={officerValidationSchema}
          onSubmit={onCreateHandler}
          submitName="Добавить сотрудника"
          formName="Создать"
          message={message}>
          <div className={styles.checkbox}>
            <label htmlFor="approved">Одобрить:</label>
            <input
              type="checkbox"
              name="approved"
              value={approved}
              onChange={() => setApproved((prev) => !prev)}
            />
          </div>
        </Form>
      </section>
    );
  }
};

export default OfficersForm;
