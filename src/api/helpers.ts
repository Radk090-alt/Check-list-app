import {AxiosResponse} from 'axios';
import {api} from './client';

export const APIProblem = (response: AxiosResponse<any>) => {
  const {data, status, request} = response;

  return {
    data,
    status,
    meta: {
      status,
      url: request.responseURL,
      method: request._method,
      response: request._response,
    },
  };
};

export const settle = <T>(result: Promise<AxiosResponse<T>>): Promise<T> => {
  return result
    .then(({data}) => data)
    .catch(({response}) => {
      throw APIProblem(response);
    });
};

export const setToken = (token: string | undefined) => {
  if (token) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common.Authorization
  }
};
