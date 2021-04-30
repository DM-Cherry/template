import axios from '@/core/auth';

/**
 *
 * @param param
 * @returns {AxiosPromise<any>}
 */
export function tokenByUser(param) {
  return axios.post('/getToken', param);
}
