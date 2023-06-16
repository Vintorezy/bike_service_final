import { Link } from 'react-router-dom';

import styles from './navigation.module.scss';

const navigations = [
  { id: 1, path: '/reports', isProtected: true, name: 'Заявки' },
  { id: 2, path: '/officers', isProtected: true, name: 'Сотрудники' },
];

const Navigation = () => {
  return (
    <nav className={styles.navigations}>
      {navigations.map((item) => (
        <Link to={item.path} className={styles.navigationsLink} key={item.id}>
          {item.name}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
