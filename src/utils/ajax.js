import { ajax } from 'rxjs/ajax';

const defaultHeaders = {
  Authorization: "Bearer " + sessionStorage.token,
  'Content-Type': 'application/json',
};
export const get = (url, headers) =>
  ajax.get(import.meta.env.VITE_BASE_API + "/" + url, Object.assign({}, defaultHeaders));

