import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Form from '../../components/Form/Form.jsx';
import { getToken } from '../../service/token.js';
import { getOfficers } from '../../service/officers.js';
import { checkAuth } from '../../utils/checkAuth.js';
import { createUnauthReport, createReport, getReport, editReport } from '../../service/reports.js';
import {
  reportFields,
  reportFormValues,
  reportValidationSchema,
  reportEditFields,
  reportEditValidationSchema,
} from '../../components/Form/form.js';
import styles from './report.module.scss';

const Report = () => {
  const userData = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [officers, setOffisers] = useState(null);
  const [officersError, setOffisersError] = useState(false);
  const [message, setMessage] = useState(null);
  const [type, setType] = useState('');
  const [officer, setOfficer] = useState(null);
  const reportId = window.location.pathname.split('/')[3];

  useEffect(() => {
    if (reportId) {
      if (checkAuth(userData.data, userData.status)) {
        getOfficers()
          .then((data) => setOffisers(data.officers))
          .catch(() => {
            setMessage('Ошибка при получении сотрудников');
            setOffisersError(true);
            setOffisers([]);
          });
        getReport(reportId)
          .then((data) => {
            setReport(data.data);
            setType(data.data.type);
            setOfficer(data.data.officer);
          })
          .catch(() => {
            setMessage('Ошибка при получении данных о сообщении');
          });
      }
    } else {
      if (userData.data && userData.status) {
        getOfficers()
          .then((data) => setOffisers(data.officers))
          .catch(() => {
            setMessage('Ошибка при получении сотрудников');
            setOffisersError(true);
            setOffisers([]);
          });
      }
    }
  }, [userData.data, userData.status, reportId]);

  const onReportHandler = (values) => {
    setMessage(null);

    if (type.length === 0) {
      return setMessage('Выберите тип велосипеда');
    }

    if (userData.data && getToken()) {
      createReport({ ...values, type, officer })
        .then(() => {
          setMessage('Заявка создана');
          navigate('/reports');
        })
        .catch(() => setMessage('Не удалось создать заявку'));
    } else {
      createUnauthReport({ ...values, type })
        .then(() => {
          setMessage('Заявка создана');
          navigate('/');
        })
        .catch(() => setMessage('Не удалось создать заявку'));
    }
  };

  const onEditHanlder = (values) => {
    editReport({ ...values, type, officer, id: report._id })
      .then(() => {
        setMessage('Сообщение обновлено');
        navigate('/reports');
      })
      .catch((data) => setMessage(data.response.data.message));
  };

  const officersLoaded = userData.data && userData.status === 'fulfilled' && officers;

  if (reportId && report) {
    return (
      <section>
        <Form
          fields={reportEditFields}
          formValues={{
            ownerFullName: report.ownerFullName,
            licenseNumber: report.licenseNumber,
            color: report.color,
            date: report.date,
            description: report.description,
            resolution: report.resolution,
          }}
          validationSchema={reportEditValidationSchema}
          onSubmit={onEditHanlder}
          submitName="Редактировать"
          formName="Редактирование сообщения"
          message={message}
          isDirty={true}
          isValided={true}>
          <div className={styles.selectList}>
            <label htmlFor="type">Тип:</label>
            <select defaultValue={report.type} name="type" onClick={(e) => setType(e.target.value)}>
              <option value="">Выберите тип велосипеда</option>
              <option value="general">Обычный</option>
              <option value="sport">Спортивный</option>
            </select>
          </div>
          {userData.data && userData.status === 'fulfilled' && !officersLoaded ? (
            <p className="process-message">Загрузка сотрудников...</p>
          ) : officersError ? null : (
            officers && (
              <div className={styles.selectList}>
                <label htmlFor="officer">Сотрудник:</label>
                <select
                  defaultValue={report.officer}
                  name="officer"
                  onClick={(e) => setOfficer(e.target.value)}>
                  <option value="">Выберите сотрудника</option>
                  {officers
                    .filter((item) => item.approved === true)
                    .map((item) => (
                      <option value={item._id} key={item._id}>
                        {item.lastName} {item.firstName}
                      </option>
                    ))}
                </select>
              </div>
            )
          )}
        </Form>
      </section>
    );
  } else if (!reportId && !report) {
    return (
      <section className="sectionReport">
        <Form
          fields={reportFields}
          formValues={reportFormValues}
          validationSchema={reportValidationSchema}
          onSubmit={onReportHandler}
          submitName="Сообщить"
          formName="Сообщить о краже"
          message={message}>
          <div className={styles.selectList}>
            <label htmlFor="type">Тип:</label>
            <select name="type" onClick={(e) => setType(e.target.value)}>
              <option value="">Выберите тип велосипеда</option>
              <option value="general">Обычный</option>
              <option value="sport">Спортивный</option>
            </select>
          </div>
          {userData.data && userData.status === 'fulfilled' && !officersLoaded ? (
            <p className="process-message">Загрузка сотрудников...</p>
          ) : officersError ? null : (
            officers && (
              <div className={styles.selectList}>
                <label htmlFor="officer">Сотрудник:</label>
                <select name="officer" onClick={(e) => setOfficer(e.target.value)}>
                  <option value="">Выберите сотрудника</option>
                  {officers
                    .filter((item) => item.approved === true)
                    .map((item) => (
                      <option value={item._id} key={item._id}>
                        {item.lastName} {item.firstName}
                      </option>
                    ))}
                </select>
              </div>
            )
          )}
        </Form>
      </section>
    );
  }
};

export default Report;
