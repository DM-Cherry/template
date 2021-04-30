const state = {
  name: process.env.APP_NAME,
  default: {
    // API 接口地址
    apiBase: process.env.API_ENDPOINT, // eslint-disable-line no-undef
    // 会话超时时间，单位分钟，如果用户超过sessionTimeout时间没做任何操作那么退出登录。
    sessionTimeout: 30,
    notice: {
      success: {
        duration: 8,
      },
      warning: {
        duration: 6,
      },
      error: {
        duration: 8,
      },
    },
  },
};
export default state;
