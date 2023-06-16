import styles from './detailsItem.module.scss';

const bikeValues = {
  general: 'Обычный',
  sport: 'Спортивный',
};

const statusValues = {
  new: 'Новое',
  in_progress: 'В процессе',
  done: 'Завершено',
};

const valueParser = (obj, key) => {
  return obj[key];
};

const DetailsItem = ({ name, value }) => {
  return (
    <li className={styles.detailsItem}>
      <span>{name}:</span>
      {name === 'Тип'
        ? valueParser(bikeValues, value)
        : name === 'Статус'
        ? valueParser(statusValues, value)
        : name === 'Одобрен'
        ? value
          ? 'Да'
          : 'Нет'
        : value
        ? value
        : 'Нет данных'}
    </li>
  );
};

export default DetailsItem;
