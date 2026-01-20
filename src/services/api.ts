import { StatusCodes } from 'http-status-codes';
import axios, {
    AxiosInstance,
    InternalAxiosRequestConfig,
    AxiosResponse,
    AxiosError,
  } from 'axios';
import { toast } from 'react-toastify';
import { getToken } from './token';

const BACKEND_URL = 'https://696fabd4a06046ce618783f0.mockapi.io/info/';
const REQUEST_TIMEOUT = 5000;

type DetailMessageType = {
    type: string;
    message: string;
  };

  const StatusCodeMapping: Record<number, boolean> = {
    [StatusCodes.BAD_REQUEST]: true,
    [StatusCodes.UNAUTHORIZED]: true,
    [StatusCodes.NOT_FOUND]: true,
  };


  const shouldDisplayError = (response: AxiosResponse) =>
    !!StatusCodeMapping[response.status];

  export const createAPI = (): AxiosInstance => {
    const api = axios.create({
      baseURL: BACKEND_URL,
      timeout: REQUEST_TIMEOUT,
    });

    api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      const token = getToken();
      if (token && config.headers) {
        config.headers['X-Token'] = token;
      }
      return config;
    });

    api.interceptors.response.use(
      (response) => response,
      (error: AxiosError<DetailMessageType>) => {
        if (error.response && shouldDisplayError(error.response)) {
          const detailMessage = error.response.data;

          toast.warn(detailMessage.message);
        }

        throw error;
      }
    );

    return api;
  };
