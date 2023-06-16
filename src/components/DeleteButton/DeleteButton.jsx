import styles from './deleteButton.module.scss';

const DeleteButton = ({ removeFunction, id, redirectTo, setMessage }) => {
  const onClickHandler = () => {
    removeFunction(id)
      .then(() => (window.location.pathname = `${redirectTo}`))
      .catch(() => setMessage('Не удалось удалить сообщение'));
  };

  return (
    <button className={styles.deleteButton} onClick={onClickHandler}>
      Удалить
    </button>
  );
};

export default DeleteButton;
