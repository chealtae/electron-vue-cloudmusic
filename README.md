# cloud-music

> An electron-vue project

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build


```
模仿网易云音乐独立开发完成 （后端接口在另一个仓库）
相关功能如下
部分静态页面编写
播放栏控制音乐播放（设置进度条，上一首下一首，播放模式等）
可打开歌词浮框，通过控制浮框对歌曲进行操作。
查看歌曲播放详情页面，歌词实时高亮。
登录 注册
动态分享
歌单管理
个人信息编辑，个人首页
播放列表
右击播放控制
搜索功能

---

---
留下来的一些坑:
通过侧边栏点击的一些页面没有使用动态路由。通过动态路由跳转会出现白屏现象。改用路由带参数和bus监听。（可能导致一个页面多次请求接口）
用的Electron 一些公共公共数据没有用vuex 存储。而是通过localStorage 存储。
歌曲播放获取的播放列表，歌词等相关信息，都是一次性获取的
歌词同步是通过 需要跨两个窗口，是通过监听实时发送信号转换的。
播放列表和点击用昵称弹出的框没有 失去焦点消失
没有用vue-win插件，都不能精准控制每一个窗口，打开多窗口进行不当操作 肯定会出现bug
---

---
目录结构：
Home 首页
routerPage 一级路由页面
FindMusicContent 二级路由页面
BasicSider 侧边栏
BasicHeader 顶部菜单栏
Common 相关组件
---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
