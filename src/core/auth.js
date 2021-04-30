import axios from 'axios';
import store from '../store';
import router from '../router';

// axios 配置
axios.defaults.timeout = 60 * 1000;
axios.defaults.baseURL = store.state.default.apiBase;
axios.defaults.withCredentials = true;

// http request 拦截器
axios.interceptors.request.use(
  config => {
    // console.trace({config})
    // 判断是否存在token，如果存在的话，则每个http header都加上token
    const token = localStorage.getItem('jwtToken');
    const headerConfig = config;
    if (token) {
      headerConfig.headers.Authorization = `${token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  },
);

function getErrorMessage(error) {
  let message = error.response.data;
  if (
    error.response.data &&
    typeof error.response.data.message === 'string' &&
    error.response.data.message !== ''
  ) {
    message = error.response.data.message;
  }

  if (typeof message !== 'string') {
    message = JSON.stringify(message);
  }
  return message;
}

// http response 拦截器
axios.interceptors.response.use(
  response => {
    /* eslint-disable */
    const url = response?.config?.url || '';
  },
  error => {
    if (error.response) {
      const body = [];
      let message = '';
      const { vue } = window;
      const route = vue.$route;
      switch (error.response.status) {
        case 400:
          break;
        case 401: {
          const r = JSON.stringify({
            name: route.name,
            params: route.params,
          });
          console.warn('太久不操作退出登录了', r); // eslint-disable-line no-console
          vue.$Notice.close('sessionTime');
          const lastLoginTime = localStorage.getItem('jwtLastLoginedAt');
          if (lastLoginTime) {
            vue.$Notice.error({
              title: '登录超时',
              desc: '您太久没有操作了，需要重新登录后再继续操作。',
              duration: vue.$store.state.default.notice.error.duration || 8,
              name: 'sessionTime',
            });
          } else {
            vue.$Notice.warning({
              title: '未登录',
              desc: '您尚未登录，请您先登录。',
              duration: vue.$store.state.default.notice.warning.duration || 8,
              name: 'sessionTime',
            });
          }
          setTimeout(() => {
            // 返回 401 清除token信息并跳转到登录页面
            store.commit('Common/Auth/logout');
            router.replace({
              name: 'auth.login',
              query: {
                _ts: +new Date(),
              },
            });
          }, 3000);
          return Promise.reject(error.response);
        }
        case 403:
          vue.$Notice.error({
            title: '权限错误',
            desc: '您没有权限访问该模块，请联系系统管理员。',
            duration: vue.$store.state.default.notice.error.duration || 8,
          });
          break;
        case 404:
          break;
        case 422:
          Object.keys(error.response.data).forEach(key => {
            const values = error.response.data[key];
            body.push({
              field: key,
              msg: values.join(','),
            });
          });
          error.response.data = body;
          break;
        case 423:
          if (typeof error.response.data === 'string') {
            vue.$Notice.error({
              title: '您操作的太快',
              desc: error.response.data,
              duration: vue.$store.state.default.notice.error.duration || 8,
            });
            return;
          }
          Object.keys(error.response.data).forEach(key => {
            const values = error.response.data[key];
            body.push({
              field: key,
              msg: values.join(','),
            });
          });
          error.response.data = body;
          break;
        case 500:
          message = getErrorMessage(error);
          vue.$Notice.error({
            title: '服务器内部错误',
            desc: message,
            duration: vue.$store.state.default.notice.error.duration || 8,
          });
          break;
        default:
          message = getErrorMessage(error);
          vue.$Notice.error({
            title: '出错了',
            desc: `错误代码：${error.response.status}，详情：${message}`,
            duration: vue.$store.state.default.notice.error.duration || 8,
          });
          break;
      }
    }
    // 返回接口返回的错误信息
    return Promise.reject(error.response);
  },
);

export default axios;
