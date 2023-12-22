import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';
import StudentHome from '@/components/StudentHome.vue';
import TeacherHome from '@/components/TeacherHome.vue';
import VueRouter from "vue-router";


Vue.use(Router)

const routes = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/student/:username', component: StudentHome, props: true },
  { path: '/teacher/:username', component: TeacherHome, props: true },
];

const router = new VueRouter({
  routes,
});

export default router;
