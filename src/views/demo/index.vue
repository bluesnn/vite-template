<template>
  <div class="home-root">{{ appStore.count }}</div>
  <van-button
    type="primary"
    @click="appStore.increment()"
  >
    pinia
  </van-button>
  <h3>注意：</h3>
  <p>
    1、vant组件可以直接使用，例如：
    state: {{ state }}
    <van-button
      type="primary"
      block
      @click="toggle()"
    >
      主要按钮
    </van-button>
    <van-button
      type="primary"
      block
      @click="handlLogout"
    >
      请求接口错误示例1
    </van-button>
    <van-button
      type="primary"
      block
      @click="handleToken"
    >
      请求接口错误示例2
    </van-button>
  </p>
  <p>
    静态引入图片：
    <img
      src="@/assets/logo.png"
      alt=""
    >
  </p>

  <p>图片sprites：</p>
  <svg-icon name="promise" />
  <svg-icon
    name="safe"
    color="#f60"
  />
</template>

<script setup>
import { useToggle } from '@/hooks'
import { userLogout, userToken } from '@/api'
import { useAppStore } from '@/store/modules/app'

const appStore = useAppStore()
console.log('appStore: ', appStore)

appStore.count++
console.log('appStore', appStore.count)

appStore.$patch({ count: appStore.count + 1 })
console.log('appStore $patch', appStore.count)

console.log('appStore double', appStore.double)

const { state, toggle } = useToggle()

console.log(`我是count的值: ${state.value}`)

const handlLogout = () => {
  userLogout().then(res => {
    console.log(res)
  }).catch(err => {
    console.log('index.vue', err, err.errno)
  })
}

const handleToken = () => {
  const params = {
    name: '',
    code: ''
  }

  userToken(params).then(res => {
    console.log(res)
  })
}
</script>
