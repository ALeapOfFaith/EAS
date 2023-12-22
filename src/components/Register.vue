<template>
  <div>
    <h2>注册</h2>
    <form @submit.prevent="register">
      <label for="username">学工号:</label>
      <input type="text" id="username" v-model="registerData.username" required>

      <label for="password">密码:</label>
      <input type="password" id="password" v-model="registerData.password" required>

      <label for="name">姓名:</label>
      <input type="name" id="name" v-model="registerData.name" required>

      <div>
        <label>
          <input type="radio" v-model="registerData.role" value="teacher"> 教师
        </label>
        <label>
          <input type="radio" v-model="registerData.role" value="student"> 学生
        </label>
      </div>

      <button type="submit">注册</button>
    </form>
    <router-link to="/login">
          <button>返回登录</button>
        </router-link>
  </div>
</template>

<script>
import jQuery from 'jquery'
export default {
  data() {
    return {
      registerData: {
        username: '',
        password: '',
        name: '',
        role: 'teacher', // 默认选择老师，根据需要调整
      }
    };
  },
  methods: {
    register() {
      jQuery.ajax({
        type:"post",
        url:"http://localhost:88/register",
        data:{
          username: this.registerData.username,
          psd: this.registerData.password,
          name: this.registerData.name,
          role: this.registerData.role
        },
        async:false, //同步还是异步
        success:function (res) {
          console.log(this)
          console.log(res)
          if (res==="error"){window.alert('用户名已被占用！');}
          // else{this.$router.push(res);}
          else{window.location.href=`http://localhost:8080/#${res}`}
        }
      });
    }
  }
};
</script>
