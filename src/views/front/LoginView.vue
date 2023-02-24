<template>
    <div class="container">
      <div class="row justify-content-center">
        <h1 class="h3 mb-3 font-weight-normal text-center">
          請先登入
        </h1>
        <div class="col-8">
          <form id="form" class="form-signin">
            <div class="form-floating mb-3">
              <input type="email" class="form-control" id="username" v-model="user.username"
                placeholder="name@example.com" required autofocus>
              <label for="username">Email address</label>
            </div>
            <div class="form-floating">
              <input type="password" class="form-control" id="password" v-model="user.password"
                placeholder="Password" required>
              <label for="password">Password</label>
            </div>
            <button class="btn btn-lg btn-primary w-100 mt-3"  type="button" @click="login">
              登入
            </button>
          </form>
        </div>
      </div>
      <p class="mt-5 mb-3 text-muted text-center">
        &copy; 2021~∞ - 六角學院
      </p>
    </div>
</template>

<script>

const { VITE_APP_URL } = import.meta.env

export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      console.log(this.user)
      const url = `${VITE_APP_URL}/v2/admin/signin`
      this.$http.post(url, this.user)
        .then((res) => {
          const { expired, token } = res.data // 解構
          console.log(expired, token)
          document.cookie = `hexToken=${token};expires=${new Date(expired)}; path=/`
          this.$router.push('/admin/products')
        })
        .catch((err) => {
          // 用catch來抓錯，console和ui都吐一下資料
        //   console.dir(err)
          alert(err.res.data.message)
        })
    }
  }
}
</script>
