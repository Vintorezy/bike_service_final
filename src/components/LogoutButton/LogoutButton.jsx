import { removeToken } from '../../service/token';
import styles from './logoutButton.module.scss';

const LogoutButton = () => {
  const onLogoutHandler = () => {
    removeToken();
    window.location.href = '/';
  };

  return (
    <button className={styles.logoutButton} onClick={onLogoutHandler}>
      Выйти
    </button>
  );
};

export default LogoutButton;
