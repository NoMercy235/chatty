import { GiphyFetch } from '@giphy/js-fetch-api';

import { Config } from '../config';
import { GIPHY_REQUEST_LIMIT } from './constants';

const gf = new GiphyFetch(Config.GiphyAPI);

export const fetchGifs = (offset) => gf.trending({ offset, limit: GIPHY_REQUEST_LIMIT })
