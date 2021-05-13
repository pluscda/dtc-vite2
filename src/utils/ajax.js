import { ajax } from 'rxjs/ajax';

const defaultHeaders = {
  Authorization: "Bearer " + sessionStorage.token
};
export  const get = (url, headers) =>
  ajax.get(import.meta.env.VITE_BASE_API + "/" + url, Object.assign({}, defaultHeaders));

