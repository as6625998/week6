import{_ as h,R as d,r as a,o as _,c as p,a as e,b as s,w as r,d as i,j as m,F as k}from"./index-70f2d5ee.js";const{VITE_APP_URL:f}={VITE_APP_URL:"https://vue3-course-api.hexschool.io/",VITE_APP_PATH:"koung-hexschool",BASE_URL:"/week6/",MODE:"production",DEV:!1,PROD:!0},g={components:{RouterView:d},methods:{logout(){document.cookie=`hexToken=;expires=${new Date}`,this.$router.push("/login")},checkLogin(){const o=`${f}/v2/api/user/check`;this.$http.post(o).then(t=>{console.log("login:",t),t.data.success||this.$router.push("/login")})}},mounted(){const o=document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,"$1");this.$http.defaults.headers.common.Authorization=o,console.log("token:",o),this.checkLogin()}},V=i("hr",null,null,-1);function $(o,t,x,w,P,c){const n=a("router-link"),u=a("RouterView");return _(),p(k,null,[e(" 這是後台頁面 "),s(n,{to:"/admin/products"},{default:r(()=>[e("後台產品列表")]),_:1}),e("| "),s(n,{to:"/admin/order"},{default:r(()=>[e("後台訂單列表")]),_:1}),e("| "),s(n,{to:"/"},{default:r(()=>[e("回到前台首頁")]),_:1}),e("| "),i("a",{href:"#",onClick:t[0]||(t[0]=m((...l)=>c.logout&&c.logout(...l),["prevent"]))},"登出"),V,s(u)],64)}const E=h(g,[["render",$]]);export{E as default};
