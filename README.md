# 技术栈
Vue3 + [Vite](https://cn.vitejs.dev/) + Vant3 + [pinnia](https://pinia.vuejs.org/) + [Vueuse](https://vueuse.org/) + unocss + Less

通用型模版，可以根据自己的项目需求变更
具体使用可以参考以下文件：@/views/test/index.vue

# 使用前要修改的初始化配置 !!!!!
1. utils/request.js 关于错误码的判断，请根据项目后端接口的实际情况判断，尤其是关于token失效或根据项目实际需求自行修改
2. utils/storage.js 中randomString的修改，命名规则与项目名保持一致，防止项目缓存冲突，保证项目缓存唯一性
2. utils/globalBaseURL.js 后端接口域名与项目域名，命名规则大写与域名保持一致加`_BASE_URL`，例：`BAIDU_BASE_URL`，`GOOGLE_BASE_URL`, 可写多个域名，这里的命名与api中的`baseURL`配置保持一致，目的是为了后端接口多域名适配，详情示例请看api文件和utils/request.js中的配置，不需要多域名适配可删除此配置，直接在axios.create中固定
4. index.html 中title
# 关于Eslint !!!!!
在相关IDE安装Eslint插件并启用，项目中主要适配了三种语法检查
1. plugin:vue/vue3-recommended，[eslint-plugin-vue](https://eslint.vuejs.org/)，推荐使用`plugin:vue/vue3-recommended`或`plugin:vue/vue3-strongly-recommended`模式
2. eslint:recommended
3. rules自定义，可自行修改

保存时自动格式化配置
VS Code
```
"editor.codeActionsOnSave": {
  "source.fixAll.eslint": true
},
```
WebStorm
[链接](https://blog.csdn.net/Fine_Cui/article/details/118512635)

# 关于移动端适配
项目采用vw适配方案，如果要使用rem可自行更换，点击[链接](https://youzan.github.io/vant/#/zh-CN/advanced-usage#liu-lan-qi-gua-pei)

# 关于axios封装
项目中axios封装了基础部分，具体使用请看utils/request.js与api文件，支持如下功能：

baseURL: null, // 后端接口地址，适配接口多域名情况

isToken: true, // 是否携带token

repeatRequestCancel: true, // 是否开启取消重复请求

loading: true, // 是否开启loading层效果

reductDataFormat: true, // 是否开启简洁的数据结构响应

errorMessageShow: true, // 是否开启接口错误信息展示

codeMessageShow: true // 是否开启code不为0时的信息提示


**使用示例**
```javascript
import request from '@/utils/request'

export function userInfo(data) {
  return request({
    url: '/user/info',
    method: 'post',
    data,
  }, { // 此配置详情请看request.js customOptions 自定义配置
    isToken: false
  }, { // toast 自定义提示/不传为toast默认loading
    message: '获取用户信息....' // toast 提示文本
  })
}

```
# 关于hooks
一个功能hook一个单独的文件夹，在hooks文件index.js中统一导出，文件夹和hook命名保持一致以`use`开头，如项目中所示
# 关于vant
自定义主题和修改vant样式在styles/vant中，根据项目自行修改，或使用其他UI库单独建立
## 结构
```
.
├── src                                     // 源码目录
│   ├── api                                   // API接口
│   ├── assets                                // 静态资源
│   ├── components                            // 公共组件
│   ├── hooks                                 // hooks
│   ├── icons                                 // icon图标
│   ├── router                                // 路由
│   ├── store                                 // pinia状态管理
│   ├── styles                                // 样式
│   ├── utils                                 // 工具
│   │   ├── globalBaseURL                       // 项目相关域名（后端接口，前端链接）
│   │   ├── index                               // 公用方法
│   │   ├── request                             // axios封装
│   │   ├── storage                             // storage方法封装
│   ├── views                                 // 视图源码
│   │   ├── demo                                // demo
│   ├── app.vue                               // 根组件
│   ├── main.js                               // 入口js文件
├── postcss.config                          // vw配置
├── vite.config.js                          // vite配置文件
.
```