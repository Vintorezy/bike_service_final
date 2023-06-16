import { RevolvingDot } from 'react-loader-spinner';
import styles from './spinner.module.scss';

const Spinner = () => {
  return (
    <div className={styles.loader}>
      <RevolvingDot
        height="80"
        width="80"
        radius={20}
        color="var(--gray)"
        secondaryColor=""
        ariaLabel="revolving-dot-loading"
        visible={true}
      />
    </div>
  );
};

export default Spinner;
