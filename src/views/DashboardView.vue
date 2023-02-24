<template>
  這是後台頁面
  <router-link to="/admin/products">後台產品列表</router-link>|
  <router-link to="/admin/order">後台訂單列表</router-link>|
  <router-link to="/">回到前台首頁</router-link>|
  <a href="" @click.prevent="logout">登出</a>
  <hr>
  <RouterView></RouterView>
</template>

<script>
import { RouterView } from 'vue-router'
const { VITE_APP_URL } = import.meta.env

export default {
  components: {
    RouterView
  },
  methods: {
    logout () {
      document.cookie = `hexToken=;expires=${new Date()}`
      this.$router.push('/login')
    },
    checkLogin () {
      const url = `${VITE_APP_URL}/v2/api/user/check`
      this.$http.post(url)
        .then((res) => {
          console.log('login:', res)
          if (!res.data.success) {
            this.$router.push('/login')
          }
        })
    }
  },
  mounted () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    this.$http.defaults.headers.common.Authorization = token
    console.log('token:', token)
    this.checkLogin()
  }
}

</script>
