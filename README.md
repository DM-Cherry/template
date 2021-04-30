# base-template

![node version](https://img.shields.io/badge/node-%3E%3D10.13.0-blue)

## 开始

1. 安装依赖

  ```javascript
  yarn install 
  or 
  npm install
  ```

**请注意：** node 版本需要大于 10.13.0 的稳定版。推荐可以使用 [nvm](https://github.com/nvm-sh/nvm) 进行 node 的多版本管理。

2. 本地开发时项目编译以及热加载

  ```javascript
  yarn dev 
  or 
  npm run dev
  ```

3. 构建

  ```javascript
  yarn build 
  or 
  npm run build
  ```
	构建好的文件存放在 `dist` 目录下

4. 开发工具推荐

	推荐使用 [VSCode](https://code.visualstudio.com/) 进行开发，针对此项目VSCode插件推荐安装：
	- Vetur
	- ESLint
	- Stylelint
	- Prettie
	- Vue VSCode Snippets
	- JavaScript(ES6) Snippets ESDoc

## 编码规范

1. [JavaScript 代码规范](./.github/JAVASCRIPT_STYLE.md)
2. [Css&Scss 代码规范](./.github/CSS_STYLE.md)
3. [命名约定](./.github/NAMING.md)

## 项目版本管理
1. [Git 分支开发工作流](./.github/GIT_BRANCH_FLOW.md)
2. [Git 提交规范](./.github/COMMIT_STYLE.md)


## 项目目录结构说明

```
|-- .github                   规范说明
|-- .vscode                   vscode 编辑器的一些设置文件
|-- dist                      构建之后生成的目录
|-- config                    webpack以及环境变量配置
|-- scss                      公共样式存放目录
|-- src                       项目的开发目录
| |-- components              页面公用的组件存放的目录
| |-- api                     api接口
| |-- core                    工具类目录
| | |-- const.js              公共常量导出
| |-- router                  页面路由目录
| |-- store                   数据状态管理目录
| |-- views                   路由页面目录
| |-- main.js                 Vue 初始化入口文件
| |-- App.vue                 应用配置，用来配置App全局样式以及监听
|-- static                    资源存放目录
|-- .babelrc                  babel 配置文件
|-- .editorconfig             编辑器配置推荐
|-- .eslintignore             eslint 忽略的文件
|-- .eslintrc.js              eslint 配置文件
|-- .gitignore                git 提交忽略文件
|-- .prettierignore           prettier 忽略的文件
|-- .prettierrc               prettier 插件的设置
|-- commitlint.config.js      git commit 规范提交配置文件
|-- jsconfig.json             vscode 本地文件提示
|-- postcss.config.js         postcss 配置
|-- README.md                 项目说明文件
|-- .stylelintignore          样式规范 忽略的文件
|-- stylelint.config.js       样式规范 配置文件
|-- vue.config.js             vue-cli 自定义配置
|-- webpack.config.js         webpack 配置文件
```

## 依赖
1. [vue](https://cn.vuejs.org/index.html)：JavaScript 渐进式框架
2. [vuex](https://vuex.vuejs.org/zh/)：状态管理
3. [vue-router](https://cli.vuejs.org/zh/guide/cli-service.html)：路由管理器
4. [axios](http://www.axios-js.com/zh-cn/)：http库
5. [webpack](https://www.webpackjs.com/)： 自动化工具
6. [eslint](https://eslint.org/)：代码检测
7. ...
8. ...
