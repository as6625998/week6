import{_ as d,o as u,c as m,d as s,h as l,v as c}from"./index-672d0845.js";const{VITE_APP_URL:p}={VITE_APP_URL:"https://vue3-course-api.hexschool.io/",VITE_APP_PATH:"koung-hexschool",BASE_URL:"/week6/",MODE:"production",DEV:!1,PROD:!0},_={data(){return{user:{username:"",password:""}}},methods:{login(){console.log(this.user);const a=`${p}/v2/admin/signin`;this.$http.post(a,this.user).then(e=>{const{expired:n,token:r}=e.data;console.log(n,r),document.cookie=`hexToken=${r};expires=${new Date(n)}; path=/`,this.$router.push("/admin/products")}).catch(e=>{alert(e.res.data.message)})}}},h={class:"container"},f={class:"row justify-content-center"},w=s("h1",{class:"h3 mb-3 font-weight-normal text-center"}," 請先登入 ",-1),g={class:"col-8"},x={id:"form",class:"form-signin"},b={class:"form-floating mb-3"},v=s("label",{for:"username"},"Email address",-1),P={class:"form-floating"},k=s("label",{for:"password"},"Password",-1),E=s("p",{class:"mt-5 mb-3 text-muted text-center"}," © 2021~∞ - 六角學院 ",-1);function V(a,e,n,r,t,i){return u(),m("div",h,[s("div",f,[w,s("div",g,[s("form",x,[s("div",b,[l(s("input",{type:"email",class:"form-control",id:"username","onUpdate:modelValue":e[0]||(e[0]=o=>t.user.username=o),placeholder:"name@example.com",required:"",autofocus:""},null,512),[[c,t.user.username]]),v]),s("div",P,[l(s("input",{type:"password",class:"form-control",id:"password","onUpdate:modelValue":e[1]||(e[1]=o=>t.user.password=o),placeholder:"Password",required:""},null,512),[[c,t.user.password]]),k]),s("button",{class:"btn btn-lg btn-primary w-100 mt-3",type:"button",onClick:e[2]||(e[2]=(...o)=>i.login&&i.login(...o))}," 登入 ")])])]),E])}const y=d(_,[["render",V]]);export{y as default};
