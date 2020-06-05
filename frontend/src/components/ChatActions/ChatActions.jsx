import React, { useState } from 'react';
import { Carousel } from '@giphy/react-components';
import { DebounceInput } from 'react-debounce-input';

import {
  gf,
  GIF_CAROUSEL_HEIGHT,
  GIPHY_INPUT_DEBOUNCE,
  GIPHY_MIN_CHAR_SEARCH,
  GIPHY_REQUEST_LIMIT
} from '../../shared/giphy';

import * as styles from './ChatActions.module.scss';

export const ChatActions = ({ onGifClick }) => {
  const [showGifs, setShowGifs] = useState(false);
  const [gifSearchQuery, setGifSearchQuery] = useState('');

  const onGiphyBtnClick = () => setShowGifs(!showGifs);

  const onHandleGifClick = (gif, e) => {
    onGifClick(gif, e);
    setShowGifs(false);
    e.stopPropagation();
    e.preventDefault();
  };

  const onFetchGifs = offset => {
    return gifSearchQuery
      ? gf.search(gifSearchQuery)
      : gf.trending({ offset, limit: GIPHY_REQUEST_LIMIT })
  };

  const renderGifsCarousel = () => {
    if (!showGifs) return null
    return (
      <>
        <Carousel
          key={gifSearchQuery}
          gifHeight={GIF_CAROUSEL_HEIGHT}
          fetchGifs={onFetchGifs}
          onGifClick={onHandleGifClick}
        />
        <DebounceInput
          minLength={GIPHY_MIN_CHAR_SEARCH}
          debounceTimeout={GIPHY_INPUT_DEBOUNCE}
          placeholder="Type to search gifs..."
          onChange={event => {
            setGifSearchQuery(event.target.value);
          }}
        />
      </>
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
