import { Link } from 'react-router-dom';
import DetailsItem from '../DetailsItem/DetailsItem';
import styles from './listItem.module.scss';

const reportDetails = [
  { id: 1, name: 'ФИО владельца', value: 'ownerFullName' },
  { id: 2, name: 'Номер лицензии', value: 'licenseNumber' },
  { id: 3, name: 'Цвет', value: 'color' },
  { id: 4, name: 'Тип', value: 'type' },
  { id: 5, name: 'Решение', value: 'resolution' },
];

const officerDetails = [
  { id: 1, name: 'Имя', value: 'firstName' },
  { id: 2, name: 'Фамилия', value: 'lastName' },
  { id: 3, name: 'Email', value: 'email' },
  { id: 4, name: 'Одобрен', value: 'approved' },
];

const ListItem = ({ report, officer, type }) => {
  if (type === 'officer') {
    return (
      <li className={styles.listItem}>
        <ul className="details">
          {officerDetails.map((item) => (
            <DetailsItem name={item.name} value={officer[`${item.value}`]} key={item.id} />
          ))}
        </ul>
        <Link to={`/officers/id=${officer._id}`} className={styles.listItemLink}>
          Подробнее
        </Link>
      </li>
    );
  } else if (type === 'report') {
    return (
      <li className={styles.listItem}>
        <ul className="details">
          {reportDetails.map((item) => (
            <DetailsItem name={item.name} value={report[`${item.value}`]} key={item.id} />
          ))}
        </ul>
        <Link to={`/reports/id=${report._id}`} className={styles.listItemLink}>
          Подробнее
        </Link>
      </li>
    );
  }
};

export default ListItem;
