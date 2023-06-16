import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getReport } from '../../service/reports';
import { getOfficer, removeOfficer } from '../../service/officers';
import DetailsItem from '../../components/DetailsItem/DetailsItem';
import { useSelector } from 'react-redux';
import { checkAuth } from '../../utils/checkAuth';
import DeleteButton from '../../components/DeleteButton/DeleteButton';
import EditLink from '../../components/EditLink/EditLink';
import { removeReport } from '../../service/reports';
import styles from './details.module.scss';

const reportsDetails = [
  { id: 1, name: 'ФИО владельца', value: 'ownerFullName' },
  { id: 2, name: 'Номер лицензии', value: 'licenseNumber' },
  { id: 3, name: 'Цвет', value: 'color' },
  { id: 4, name: 'Тип', value: 'type' },
  { id: 5, name: 'Доп. информация', value: 'description' },
  { id: 6, name: 'Статус', value: 'status' },
  { id: 7, name: 'Сотрудник', value: 'officer' },
  { id: 8, name: 'Решение', value: 'resolution' },
];

const officersDetails = [
  { id: 1, name: 'Имя', value: 'firstName' },
  { id: 2, name: 'Фамилия', value: 'lastName' },
  { id: 3, name: 'Email', value: 'email' },
];

const Details = ({ type }) => {
  const userData = useSelector((state) => state.user);
  const location = useNavigate();
  const [report, setReport] = useState(null);
  const [message, setMessage] = useState(null);
  const [officer, setOfficer] = useState(null);

  useEffect(() => {
    if (checkAuth(userData.data, userData.status)) {
      if (type === 'officers') {
        getOfficer(window.location.pathname.split('=')[1])
          .then((data) => setOfficer(data.data))
          .catch((data) => setMessage(data.response.data.message));
      } else if (type === 'reports') {
        getReport(window.location.pathname.split('=')[1])
          .then((data) => {
            setReport(data.data);
            if (data.data.officer) {
              getOfficer(data.data.officer)
                .then((data) => setOfficer(data.data))
                .catch((data) => setMessage(data.response.data.message));
            }
          })
          .catch((data) => setMessage(data.response.data.message));
      }
    } else {
      location('/');
    }
  }, [type, userData.data, userData.status, location]);

  if (type === 'officers') {
    return (
      <section>
        {officer && (
          <>
            {officersDetails.map((item) => (
              <DetailsItem name={item.name} value={officer[`${item.value}`]} key={item.id} />
            ))}

            <div className={styles.actions}>
              {userData.data.data.user.id !== officer._id && (
                <DeleteButton
                  removeFunction={removeOfficer}
                  id={officer._id}
                  redirectTo="/officers"
                  setMessage={setMessage}
                />
              )}
              <EditLink href={`/officers/edit/${officer._id}`} />
            </div>
          </>
        )}
        {message && <p className="error-message">{message}</p>}
      </section>
    );
  } else if (type === 'reports') {
    return (
      <section>
        {report && (
          <>
            {report.officer && officer
              ? reportsDetails.map((item) =>
                  item.name === 'Сотрудник' ? (
                    <DetailsItem
                      name={item.name}
                      value={`${officer.firstName} ${officer.lastName} `}
                      key={item.id}
                    />
                  ) : (
                    <DetailsItem name={item.name} value={report[`${item.value}`]} key={item.id} />
                  ),
                )
              : reportsDetails.map((item) => (
                  <DetailsItem name={item.name} value={report[`${item.value}`]} key={item.id} />
                ))}
            <div className={styles.actions}>
              <DeleteButton
                removeFunction={removeReport}
                id={report._id}
                redirectTo="/reports"
                setMessage={setMessage}
              />
              <EditLink href={`/reports/edit/${report._id}`} />
            </div>
          </>
        )}
        {message && <p className="error-message">{message}</p>}
      </section>
    );
  }
};

export default Details;
