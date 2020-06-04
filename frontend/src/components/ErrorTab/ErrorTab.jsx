import React from 'react';

import * as styles from './ErrorTab.module.scss';
import { ClickableText } from '../ClickableText/ClickableText';

const onHandleRefresh = () => window.location.reload();

export const ErrorTab = () => {
  return (
    <div className={styles.container}>
      <div>
        <h3>Could not connect to the WebSocket server.</h3>
        <ClickableText
          text="Please refresh to try again"
          onClick={onHandleRefresh}
        />
      </div>
    </div>
  );
};
