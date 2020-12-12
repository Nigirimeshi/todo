# todo
## 简介
一个一边学习 vue，vuetify，vuex，router，firebase 一边开发的 todo web 应用。

## 项目设置
### 修改配置
#### firebase 连接配置
firebase.config.js
```vue
export const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};
```

### 安装依赖
```
npm install
```

### 开发阶段编译和热重载
```
npm run serve
```

## Todo
- [x] vuex 统一管理和存储组件状态数据
- [x] firebase 实时更新数据
- [ ] 视图和组件：
  - [x] 导航栏
  - [x] 仪表盘
  - [x] 登录
  - [x] 注册
- [ ] 功能：
  - [x] 增删改查 todo
