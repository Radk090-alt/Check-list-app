import perf from '@react-native-firebase/perf';
import axios, {AxiosRequestConfig} from 'axios';

// Environment
import {BACKEND_API_URL} from '@rcd/environment';

const defaults: Partial<AxiosRequestConfig> = {
  responseType: 'json',
  maxRedirects: 0,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

const instances = [
  axios.create({
    baseURL: BACKEND_API_URL,
    ...defaults,
  }),
];

const requestInterceptor = async (config: any) => {
  const httpMetric = perf().newHttpMetric(
    config.url!,
    config.method.toUpperCase(),
  );
  config.metadata = {httpMetric};

  await httpMetric.start();

  return config;
};

const responseInterceptor = async (response: any) => {
  // Request was successful, e.g. HTTP code 200
  const {httpMetric} = response.config.metadata;

  // add any extra metric attributes if needed
  // httpMetric.putAttribute('userId', '12345678')

  httpMetric.setHttpResponseCode(response.status);
  httpMetric.setResponseContentType(response.headers['content-type']);
  await httpMetric.stop();

  return response;
};

const errorInterceptor = async (error: any) => {
  // Request failed, e.g. HTTP code 500
  const {httpMetric} = error.config.metadata;

  // add any extra metric attributes if needed
  // httpMetric.putAttribute('userId', '12345678')
  httpMetric.setHttpResponseCode(error.response.status);
  httpMetric.setResponseContentType(error.response.headers['content-type']);
  await httpMetric.stop();

  // Ensure failed requests throw after interception
  return Promise.reject(error);
};

instances.forEach((i) => {
  i.interceptors.request.use(requestInterceptor);
  i.interceptors.response.use(responseInterceptor, errorInterceptor);
});

export const [api] = instances;
