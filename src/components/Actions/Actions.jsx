import { useSelector } from 'react-redux';
import styles from './actions.module.scss';

const actions = [
  { id: 1, name: 'Войти', href: '/login', color: 'var(--light-blue)', hideWithAuth: true },
  {
    id: 2,
    name: 'Регистрация',
    href: '/registration',
    color: 'var(--light-blue)',
    hideWithAuth: true,
  },
  {
    id: 3,
    name: 'Сообщить о краже',
    href: '/report',
    color: 'var(--light-blue)',
    hideWithAuth: false,
  },
];

const Actions = () => {
  const userData = useSelector((state) => state.user);
  const userIsLoaded =
    userData.status === 'fulfilled' || userData.status === 'rejected' || userData.status === 'idle';

  return (
    userIsLoaded && (
      <div className={styles.actions}>
        {actions.map((item) =>
          userData.data && userData.status === 'fulfilled' && item.hideWithAuth ? null : (
            <a
              href={item.href}
              className={styles.actionItem}
              style={{ background: `${item.color}` }}
              key={item.id}>
              {item.name}
            </a>
          ),
        )}
      </div>
    )
  );
};

export default Actions;
