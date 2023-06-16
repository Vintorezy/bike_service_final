import { Link } from 'react-router-dom';
import styles from './editLink.module.scss';

const EditLink = ({ href }) => {
  return (
    <Link to={href} className={styles.editLink}>
      Редактировать
    </Link>
  );
};

export default EditLink;
