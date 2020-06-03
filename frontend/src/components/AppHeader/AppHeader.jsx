import React from 'react';

import * as styles from './AppHeader.module.scss';

export const AppHeader = ({ user, onChangeName }) => {
  const renderChangeNameText = () => {
    return (
      <span
        className={styles.changeNameText}
        onClick={onChangeName}
      >
        Change your name!
      </span>
    );
  };

  return (
    <div className={styles.container}>
      <h2>Chatty</h2>
      <small className={styles.nameIdentifier}>
        Identified by the name <b><i>{user.name}</i></b>.&nbsp;
        Not you? {renderChangeNameText()}
      </small>
    </div>
  );
};
