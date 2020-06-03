import React from 'react';

import * as styles from './PicknameTab.module.scss';

export const PickNameTab = () => {
  return (
    <div className={styles.container}>
      <div className={styles.pickNameForm}>
        <label htmlFor="name">Pick a name</label>
        <input id="name" />
        <button>Enter</button>
      </div>
    </div>
  );
};
