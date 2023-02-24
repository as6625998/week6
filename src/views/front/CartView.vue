<template>
    這是購物車
    <!-- 購物車列表 -->
    <div class="text-end">
            <button class="btn btn-outline-danger" type="button"
            @click="deleteAllCarts()" :disabled="cart.carts?.length === 0">清空購物車</button>
          </div>
    <table class="table align-middle">
    <thead>
        <tr>
        <th></th>
        <th>品名</th>
        <th style="width: 150px">數量/單位</th>
        <th>單價</th>
        </tr>
    </thead>
    <tbody>
        <template v-if="cart.carts">
        <tr v-for="item in cart.carts" :key="item.id">
            <td>
            <button type="button" class="btn btn-outline-danger btn-sm"
            :disabled="item.id === loadingItem"
            @click="deleteItem(item)">
                <!-- <i class="fas fa-spinner fa-pulse"></i> -->
                x
            </button>
            </td>
            <td>
            {{ item.product.title }}
            <div class="text-success">
                已套用優惠券
            </div>
            </td>
            <td>
            <div class="input-group input-group-sm">
                <div class="input-group mb-3">
                <input min="1" type="number" class="form-control" v-model="item.qty"
                :disabled="item.id === loadingItem"
                @change="updataCartItem(item)">
                <span class="input-group-text" id="basic-addon2">{{ item.product.unit }}</span>
                </div>
            </div>
            </td>
            <td class="text-end">
            <small class="text-success">折扣價：</small>
            {{ item.final_total }}
            </td>
        </tr>
        </template>
    </tbody>
    <tfoot>
        <tr>
        <td colspan="3" class="text-end">總計</td>
        <td class="text-end">{{ cart.total  }}</td>
        </tr>
        <tr>
        <td colspan="3" class="text-end text-success">折扣價</td>
        <td class="text-end text-success">{{ cart.final_total }}</td>
        </tr>
    </tfoot>
    </table>
    <div class="my-5 row justify-content-center">
          <v-form ref="form" class="col-md-6" v-slot="{ errors }" @submit="createOrder()">
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <v-field id="email" name="email" type="email" class="form-control"
                       :class="{ 'is-invalid': errors['email'] }" placeholder="請輸入 Email"
                       rules="email|required" v-model="form.user.email"></v-field>
              <error-message name="email" class="invalid-feedback"></error-message>
            </div>

            <div class="mb-3">
              <label for="name" class="form-label">收件人姓名</label>
              <v-field id="name" name="姓名" type="text" class="form-control" :class="{ 'is-invalid': errors['姓名'] }"
                       placeholder="請輸入姓名" rules="required" v-model="form.user.name"></v-field>
              <error-message name="姓名" class="invalid-feedback"></error-message>
            </div>

            <div class="mb-3">
              <label for="tel" class="form-label">收件人電話</label>
              <v-field id="tel" name="電話" type="text" class="form-control" :class="{ 'is-invalid': errors['電話'] }"
                       placeholder="請輸入電話" rules="required|min:8|max:10" v-model="form.user.tel"></v-field>
              <error-message name="電話" class="invalid-feedback"></error-message>
            </div>

            <div class="mb-3">
              <label for="address" class="form-label">收件人地址</label>
              <v-field id="address" name="地址" type="text" class="form-control" :class="{ 'is-invalid': errors['地址'] }"
                       placeholder="請輸入地址" rules="required" v-model="form.user.address"></v-field>
              <error-message name="地址" class="invalid-feedback"></error-message>
            </div>

            <div class="mb-3">
              <label for="message" class="form-label">留言</label>
              <textarea id="message" class="form-control" cols="30" rows="10" v-model="message"></textarea>
            </div>
            <div class="text-end">
              <button type="submit" class="btn btn-danger"
                >送出訂單</button>
            </div>
          </v-form>
        </div>
</template>

<script>

const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env

export default {
  data () {
    return {
      products: [],
      productId: '',
      cart: {},
      loadingItem: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: ''
        }
      },
      message: ''
    }
  },
  methods: {
    getCarts () {
      this.$http.get(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart`)
        .then(res => {
          console.log('購物車:', res.data.data)
          this.cart = res.data.data
        })
        .catch((err) => {
          alert(err.res.data.message)
        })
    },
    updataCartItem (item) {
      // 購物車的id , 產品的id
      const data = {
        product_id: item.product.id, // 展開選取項目
        qty: item.qty
      }
      this.loadingItem = item.id
      this.$http.put(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart/${item.id}`, { data })
        .then(res => {
        // console.log("更新購物車:", res.data);
          this.getCarts()
          this.loadingItem = ''
        })
    },
    deleteItem (item) {
      this.$http.delete(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/cart/${item.id}`)
        .then(res => {
        // console.log("刪除購物車:", res.data);
          alert(res.data.message)
          this.getCarts()
        })
    },
    deleteAllCarts () {
      this.$http.delete(`${VITE_APP_URL}/v2/api/${VITE_APP_PATH}/carts`)
        .then((res) => {
          alert(res.data.message)
          this.getCarts()
        }).catch((err) => {
          alert(err.res.data.message)
        })
    }
  },
  createOrder () {
    const url = `${VITE_APP_URL}/api/${VITE_APP_PATH}/order`
    const order = this.form
    this.$http.post(url, { data: order }).then((res) => {
      alert(res.data.message)
      this.$refs.form.resetForm()
      this.getCarts()
    }).catch((err) => {
      alert(err.res.data.message)
    })
  },

  mounted () {
    this.getCarts()
  }
}
</script>
