import React, { useState } from 'react';
import { Carousel } from '@giphy/react-components';

import { GIF_CAROUSEL_HEIGHT } from '../../shared/constants';
import { fetchGifs } from '../../shared/giphy';

import * as styles from './ChatActions.module.scss';

export const ChatActions = ({ onGifClick }) => {
  const [showGifs, setShowGifs] = useState(false);

  const onGiphyBtnClick = () => setShowGifs(!showGifs);

  const onHandleGifClick = (gif, e) => {
    onGifClick(gif, e);
    setShowGifs(false);
    e.stopPropagation();
    e.preventDefault();
  };

  const renderGifsCarousel = () => {
    if (!showGifs) return null
    return (
      <Carousel
        gifHeight={GIF_CAROUSEL_HEIGHT}
        fetchGifs={fetchGifs}
        onGifClick={onHandleGifClick}
      />
    )
  };

  return (
    <>
      {renderGifsCarousel()}
      <div className={styles.container}>
        <button onClick={onGiphyBtnClick}>Giphy</button>
      </div>
    </>
  );
};
