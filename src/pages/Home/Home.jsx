import Intro from '../../components/Intro/Intro';
import styles from './home.module.scss';

const Home = () => {
  return (
    <section className={styles.sectionHome}>
      <Intro />
    </section>
  );
};

export default Home;
