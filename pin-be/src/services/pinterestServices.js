import {makePinterestApi} from '../helpers/axios';

/**
 *
 * @param {object} data
 * @returns {Promise<*>}
 */
export const createNewPin = async ({data}) => {
  return await makePinterestApi({
    url: 'https://api.pinterest.com/v5/pins',
    method: 'POST',
    data
  });
};

/**
 *
 * @param {object} data
 * @returns {Promise<*>}
 */
export const createNewBoard = async ({data}) => {
  return await makePinterestApi({
    url: 'https://api.pinterest.com/v5/boards/',
    method: 'POST',
    data
  });
};

/**
 *
 * @param {object} data
 * @returns {Promise<*>}
 */
export const getMyBoards = async () => {
  return await makePinterestApi({
    url: 'https://api.pinterest.com/v5/boards/',
    method: 'GET'
    //    get with  'Authorization: Bearer <Add your token here>'
  });
};
