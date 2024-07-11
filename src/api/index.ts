import {api} from './client';
import {settle} from './helpers';

export const get = <T>(endpoint: string, query?: object): Promise<T> => {
  return settle<T>(
    api.get(endpoint, {
      params: query,
    }),
  );
};

export const post = <T>(endpoint: string, data?: object): Promise<T> => {
  return settle<T>(api.post(endpoint, data));
};

export const put = <T>(endpoint: string, data?: object): Promise<T> => {
  return settle<T>(api.put(endpoint, data));
};

export const deleteRequest = <T>(endpoint: string): Promise<T> => {
  return settle<T>(api.delete(endpoint));
};
