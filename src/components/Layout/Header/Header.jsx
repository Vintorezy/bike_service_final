import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navigation from '../../Navigation/Navigation';
import Actions from '../../Actions/Actions';
import LogoutButton from '../../LogoutButton/LogoutButton';
import styles from './header.module.scss';

const Header = () => {
  const userData = useSelector((state) => state.user);
  const userIsLoaded =
    userData.status === 'fulfilled' || userData.status === 'rejected' || userData.status === 'idle';

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.headerInner}>
          <Link to={'/'}>
            <img src="../images/logo.svg" alt="BestBikes" className="logo" width={90} height={70} />
          </Link>
          {userData.data && userIsLoaded && <Navigation />}
          <div className={styles.actionsWrapper}>
            {userIsLoaded && (
              <>
                <Actions />
                {userData.data && <LogoutButton />}
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
