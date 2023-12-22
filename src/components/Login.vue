<template>
  <div>
    <h2>登录</h2>
    <form @submit.prevent="login">
      <label for="username">学工号:</label>
      <input type="text" id="username" v-model="loginData.username" required>

      <label for="password">密码:</label>
      <input type="password" id="password" v-model="loginData.password" required>

      <!-- 添加角色选择单选框 -->
      <div>
        <label>
          <input type="radio" v-model="loginData.role" value="teacher"> 教师
        </label>
        <label>
          <input type="radio" v-model="loginData.role" value="student"> 学生
        </label>
      </div>
      <button type="submit">登录</button>
      
    </form>
    
        <router-link to="/register">
          <button>注册</button>
        </router-link>
      
  </div>
</template>

<script>
// import request from '../api';
import jQuery from 'jquery'
export default {
  data() {
    return {
      loginData: {
        username: '',
        password: '',
        role: 'teacher', // 默认选择老师，根据需要调整
      }
    };
  },
  methods: {
    login() {
      // request.post('/login').then((res)=>{
      //   console.log(res)
      // })
      jQuery.ajax({
        type:"post",
        url:"http://localhost:88/login",
        data:{
          // pid : this.loginData,
          username: this.loginData.username,
          psd: this.loginData.password,
          role: this.loginData.role
        },
        async:false, //同步还是异步
        success:function (res) {
          console.log(this)
          console.log(res)
          if (res==="error"){window.alert('用户名或密码错误！');}
          else{
            window.location.href=`http://localhost:8080/#${res}`
            // this.$router.push("/#"+res);
          }
        }
      });
    }
  }
};
</script>
