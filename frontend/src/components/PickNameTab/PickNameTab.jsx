import React, { useState } from 'react';

import * as styles from './PicknameTab.module.scss';

export const PickNameTab = ({ onPickName }) => {
  const [name, setName] = useState('');

  const onNameChange = e => setName(e.currentTarget.value);

  const handleOnPickName = e => {
    e.preventDefault();
    onPickName(name);
  };

  return (
    <div className={styles.container}>
      <form className={styles.pickNameForm}>
        <label htmlFor="name">Pick a name</label>
        <input id="name" autoComplete="off" value={name} onChange={onNameChange} />
        <button type="submit" onClick={handleOnPickName}>Enter</button>
      </form>
    </div>
  );
};
