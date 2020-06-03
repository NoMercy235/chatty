import React from 'react';

import { ClickableText } from '../ClickableText/ClickableText';

import * as styles from './AppHeader.module.scss';

export const AppHeader = ({ user, onChangeName }) => {
  const renderChangeNameText = () => {
    return (
      <ClickableText
        text="Change your name!"
        onClick={onChangeName}
      />
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
