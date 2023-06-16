import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { checkAuth } from '../../utils/checkAuth';
import { getOfficers } from '../../service/officers';
import ListItem from '../../components/ListItem/ListItem';
import styles from './officers.module.scss';

const Officers = () => {
  const userData = useSelector((state) => state.user);
  const location = useNavigate();
  const [officers, setOfficers] = useState(null);
  const [message, setMessage] = useState(null);
  const officerIsLoaded = userData.data && userData.status === 'fulfilled' && officers;

  useEffect(() => {
    if (checkAuth(userData.data, userData.status)) {
      getOfficers()
        .then((data) => setOfficers(data.officers))
        .catch(() => setMessage('Ошибка при получении данных о сотруднике'));
    } else {
      location('/');
    }
  }, [userData.data, userData.status, location]);

  return (
    <section>
      {message ? (
        <p className="error-message">Ошибка при получении данных сотрудника</p>
      ) : officerIsLoaded && !message ? (
        <>
          <ul className={styles.officers}>
            {officers.map((item) => (
              <ListItem officer={item} key={item._id} type="officer" />
            ))}
          </ul>
          <Link to={'/officers/create'} className={styles.officersLink}>
            Добавить сотрудника
          </Link>
        </>
      ) : null}
    </section>
  );
};

export default Officers;
