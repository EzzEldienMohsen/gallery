import axios, { AxiosInstance } from 'axios';

const url: string = '/api';

export const autoFetch: AxiosInstance = axios.create({
  baseURL: url,
});
