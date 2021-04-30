import jwtDecode from 'jwt-decode';
import dayjs from 'dayjs';

export default {
  namespaced: true,
  state: {
    jwt: null,
    tik: null,
  },
  mutations: {
    login(state, jwtToken) {
      const jwt = jwtDecode(jwtToken.substr(7));
      state.jwt = jwt;
      const iat = jwt.iat * 1e3;
      const exp = jwt.exp * 1e3;
      const ts = +new Date();
      const tsCorrection = ts - iat;
      localStorage.setItem('jwtLastLoginedAt', ts);
      localStorage.setItem('jwtToken', jwtToken);
      localStorage.setItem('jwtTokenIssueddAt', ts);
      localStorage.setItem('jwtTokenExpiredAt', exp);
      localStorage.setItem('requestedAt', ts);
      localStorage.setItem('timestampCorrection', tsCorrection);
    },
    logout(state) {
      state.jwt = null;
      state.tik = null;
    },
    tik(state) {
      let now = +new Date();
      now -= Number(localStorage.getItem('timestampCorrection') || 0);
      state.tik = now;
      localStorage.setItem('requestedAt', now);
    },
    refresh(state, jwtToken) {
      const jwt = jwtDecode(jwtToken.substr(7));
      state.jwt = jwt;
      const iat = jwt.iat * 1e3;
      const exp = jwt.exp * 1e3;
      const ts = +new Date();
      const outputInfo = {
        当前时间: dayjs(ts).toISOString(),
        授权时间: dayjs(iat).toISOString(),
        过期时间: dayjs(exp).toISOString(),
      };

      // eslint-disable-next-line no-console
      console.table(outputInfo);
      localStorage.setItem('jwtToken', jwtToken);
      localStorage.setItem('jwtTokenIssueddAt', ts);
      localStorage.setItem('jwtTokenExpiredAt', exp);
    },
    reset(state) {
      localStorage.removeItem('jwtLastLoginedAt');
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('jwtTokenIssueddAt');
      localStorage.removeItem('jwtTokenExpiredAt');
      localStorage.removeItem('requestedAt');
      localStorage.removeItem('timestampCorrection');
      state.jwt = null;
      state.tik = null;
    },
  },
  actions: {
    login({ commit }, jwtToken) {
      commit('login', jwtToken);
    },
    tik({ commit }) {
      commit('tik');
    },
    logout({ commit }) {
      this._vm
        .$axios('/web/auth/logout/')
        .then(() => {
          console.log('用户退出登录'); // eslint-disable-line no-console
        })
        .catch(error => {
          console.error(error); // eslint-disable-line no-console
        })
        .then(() => {
          commit(
            'SiteStore/reset',
            {},
            {
              root: true,
            },
          );
          commit(
            'UserStore/reset',
            {},
            {
              root: true,
            },
          );
          localStorage.clear();
          commit('logout');
        });
    },
    // 更新口令牌
    async refreshToken({ commit }) {
      // 增加锁，禁止并发刷新
      const refreshTokenLock = localStorage.getItem('refresh_token_pid');
      if (refreshTokenLock) {
        return;
      }
      localStorage.setItem('refresh_token_pid', '1');
      const jwtToken = localStorage.getItem('jwtToken');
      const tokens = (await this._vm.$storage.user.getItem('history_jwt_tokens')) || [];
      if (tokens.includes(jwtToken)) {
        localStorage.removeItem('refresh_token_pid');
        return;
      }
      await this._vm
        .$axios('/web/auth/refresh/')
        .then(response => {
          commit('refresh', response.data.token);
          tokens.push(response.data.token);
          this._vm.$storage.user.setItem('history_jwt_tokens', tokens);
          localStorage.removeItem('refresh_token_pid');
        })
        .catch(error => {
          console.error(error); // eslint-disable-line no-console
          localStorage.removeItem('refresh_token_pid');
        });
    },
  },
  getters: {
    token: () => localStorage.getItem('jwtToken'),
    valid: () => {
      const jwtTokenExpiredAt = localStorage.getItem('jwtTokenExpiredAt') || 0;

      if (!jwtTokenExpiredAt) {
        return false;
      }

      let now = +new Date();
      now -= Number(localStorage.getItem('timestampCorrection') || 0);

      return now < jwtTokenExpiredAt;
    },
  },
};
