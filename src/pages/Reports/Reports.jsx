import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getReports } from '../../service/reports';
import { useSelector } from 'react-redux';
import { checkAuth } from '../../utils/checkAuth';
import ListItem from '../../components/ListItem/ListItem';
import styles from './reports.module.scss';

const Reports = () => {
  const userData = useSelector((state) => state.user);
  const location = useNavigate();
  const [reports, setReports] = useState(null);
  const [message, setMessage] = useState(null);
  const reportsIsLoaded = userData.data && userData.status === 'fulfilled' && reports;

  useEffect(() => {
    if (checkAuth(userData.data, userData.status)) {
      getReports()
        .then((data) => setReports(data.data))
        .catch(() => setMessage('Ошибка при получении заявок'));
    } else {
      location('/');
    }
  }, [userData.data, userData.status, location]);

  return (
    <section className="sectionReports">
      {message ? (
        <p className="error-message">Ошибка при получении заявок</p>
      ) : reportsIsLoaded && !message ? (
        <ul className={styles.reports}>
          {reports.length ? (
            reports.map((el) => <ListItem report={el} key={el._id} type="report" />)
          ) : (
            <p className="error-message">Заявок нету</p>
          )}
        </ul>
      ) : null}
    </section>
  );
};

export default Reports;
