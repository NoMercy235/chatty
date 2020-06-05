import { GiphyFetch } from '@giphy/js-fetch-api';

import { Config } from '../config';

export const gf = new GiphyFetch(Config.GiphyAPI);

export const GIF_CAROUSEL_HEIGHT = 200;
export const GIF_WIDTH = 200;
export const GIPHY_REQUEST_LIMIT = 10;
export const GIPHY_MIN_CHAR_SEARCH = 2;
export const GIPHY_INPUT_DEBOUNCE = 300;
