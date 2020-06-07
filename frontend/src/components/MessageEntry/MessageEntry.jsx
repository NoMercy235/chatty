import React, { useState } from 'react';
import * as classNames from 'classnames';
import { Gif } from '@giphy/react-components';

import { UserMessageType } from '../../shared/constants';
import { UserEntry } from '../UserEntry/UserEntry';
import { ClickableText } from '../ClickableText/ClickableText';
import { formatDate } from '../../shared/utils';
import { GIF_WIDTH } from '../../shared/giphy';
import { decryptMessage } from '../../shared/encryptionUtils';

import * as styles from './MessageEntry.module.scss';

export const MessageEntry = ({ currentUser, message, source, noActions, onEditMessage, onDeleteMessage }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedMessage, setEditedMessage] = useState(message.message);

  const isYou = currentUser.id === source.id;

  const onChangeEditedMessage = e => setEditedMessage(e.target.value);

  const onEditBtnClick = () => setIsEditing(true);

  const onCancelBtnClick = () => {
    setIsEditing(false);
    setEditedMessage(message.message);
  };

  const onHandleEditMessage = e => {
    onEditMessage(editedMessage);
    setIsEditing(false);
    e.preventDefault();
  }

  const renderName = () => {
    return (
      <>
        <div
          className={classNames(styles.source, { [styles.removed]: source.isInactive })}
        >
          <UserEntry user={source} isYou={isYou} />
        </div>
        {source.isInactive && <i className={styles.inactiveText}>(inactive)</i>}
      </>
    );
  };

  const renderDates = () => {
    return (
      <>
        <div className={classNames(styles.date, styles.when)}>
          <i>{formatDate(message.createdAt)}</i>
        </div>
        {message.isEdited && !message.isDeleted && (
          <div className={styles.date}>
            (Edited on <i>{formatDate(message.updatedAt)}</i>)
          </div>
        )}
      </>
    );
  };

  const renderActions = () => {
    return !noActions && isYou && !message.isDeleted && (
      <>
        {!message.isGif && (
          <ClickableText
            className={styles.action}
            text="Edit"
            onClick={onEditBtnClick}
          />
        )}
        <ClickableText
          className={styles.action}
          text="Delete"
          onClick={onDeleteMessage}
        />
      </>
    );
  };

  const renderEditMessage = () => {
    return (
      <form className={styles.form}>
        <input value={editedMessage} onChange={onChangeEditedMessage} />
        <button type="submit" onClick={onHandleEditMessage} >Ok</button>
        <button onClick={onCancelBtnClick}>Cancel</button>
      </form>
    );
  };

  const renderMessage = () => {
    if (message.isGif) {
      return (
        <Gif gif={message.gif} width={GIF_WIDTH}/>
      )
    }

    let textToShow = message.isMessageEncrypted
      ? decryptMessage(message.message)
      : message.message;

    if (!textToShow && message.isMessageEncrypted) {
      return (
        <div>
          <span>Could not decrypt the message. The secret key might be out of sync</span>
        </div>
      );
    }

    return (
      <div className={classNames({ [styles.infoMessage]: message.type === UserMessageType.Info})}>
        {textToShow}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        {renderName()}
        {renderDates()}
        {renderActions()}
      </div>
      {isEditing
        ? renderEditMessage()
        : renderMessage()
      }
    </div>
  );
};
