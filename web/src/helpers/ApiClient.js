import superagent from "superagent";
import config from "../config";
import {getItem} from "../helpers/storage";

const methods = ['get', 'post', 'put', 'patch', 'del'];
const baseUrl = window['isNative'] ? '' : config.serverApi;


function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  return adjustedPath.indexOf('/') === 0 ? baseUrl + adjustedPath : adjustedPath;
}

/*
 * This silly underscore is here to avoid a mysterious "ReferenceError: ApiClient is not defined" error.
 * See Issue #14. https://github.com/erikras/react-redux-universal-hot-example/issues/14
 *
 * Remove it at your own risk.
 */
class _ApiClient {
  constructor(req) {
    methods.forEach((method) =>
      this[method] = (path, {params, data} = {}) => new Promise((resolve, reject) => {
        getItem('token').then((token)=>{
          const request = superagent[method](formatUrl(path));

          if (params) {
            request.query(params);
          }

          if (token) {
            request.set('Authorization', `JWT ${token}`);
          }

          if (data) {
            request.send(data);
          }

          request.end((err, {body} = {}) => err ? reject(body || err) : resolve(body));
        });
      }));
  }
}

const ApiClient = _ApiClient;

export default ApiClient;
