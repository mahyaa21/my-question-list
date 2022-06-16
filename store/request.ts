import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import  Utils  from '../lib/utils';
import {
  refreshAuthLogic,
  requestContentType,
  requestHeaderTransformer,
} from '../lib/requestInterceptors';

const baseURL = Utils.baseUrl;
const { fileBaseUrl } = Utils;

const RequestInstance = axios.create({ baseURL });

createAuthRefreshInterceptor(RequestInstance, refreshAuthLogic, {
  pauseInstanceWhileRefreshing: true,
});

RequestInstance.interceptors.request.use(requestHeaderTransformer, e =>
  Promise.reject(e),
);
RequestInstance.interceptors.request.use(requestContentType, e =>
  Promise.reject(e),
);

const FileRequestInstance = axios.create({ baseURL: fileBaseUrl });
createAuthRefreshInterceptor(FileRequestInstance, refreshAuthLogic, {
  pauseInstanceWhileRefreshing: true,
});
FileRequestInstance.interceptors.request.use(requestHeaderTransformer, e =>
  Promise.reject(e),
);
export { RequestInstance, FileRequestInstance, baseURL, fileBaseUrl };
