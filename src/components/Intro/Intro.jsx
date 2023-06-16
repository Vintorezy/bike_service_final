import React from 'react';
import styles from './introComponent.module.scss';

const Intro = () => {
  return (
    <div className={styles.introComponent}>
      <div className={styles.introComponentLeft}>
        <h1 className={styles.introComponentTitle}>BestBikes</h1>
        <p className={styles.introComponentText}>
          Прокат велосипедов BestBikes – это широчайший выбор велосипедов в прокат: стандартные и
          горные, велосипеды комфорт-класса, BMX, складные велосипеды Shulz – всё для того, чтобы
          поймать велодрайв!
        </p>
      </div>
      <div className={styles.introComponentRight}>
        <img src="images/girl.jpg" alt="girl" loading="lazy" width={750} />
      </div>
    </div>
  );
};

export default Intro;
