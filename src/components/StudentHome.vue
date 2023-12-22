<template>
  <div>
    <h2>欢迎, {{ username }}同学!</h2>
    <div class="container-fluid">
      <div class="row">
        <div class="col" style="background-color: #ffffff; padding: 20px;">
          <h2>选课</h2>
          <ul>
            <li v-for="(course, index) in availableCourses" :key="index">
              课程号: {{ course.cno }}<br>
              课程名: {{ course.cname }}<br>
              教师名: {{ course.pname }}<br>
              学分: {{ course.credit }}<br>
              <!-- 成绩: {{ course.score }}<br> -->
              <button @click="selectCourse(course.cno)">选课</button>
            </li>
          </ul>
        </div>

        <div class="col" style="background-color: #ffffff; padding: 20px;">
          <h2>已选课程（已有成绩的课程不能退课，-1表示没有成绩）</h2>
          <ul>
            <li v-for="(course, index) in selectedCourses" :key="index">
              课程号: {{ course.cno }}<br>
              课程名: {{ course.cname }}<br>
              教师名: {{ course.pname }}<br>
              学分: {{ course.credit }}<br>
              成绩: {{ course.score }}<br>
              <button @click="withdrawCourse(course.cno)" v-if="isCourseSelected(course.score)">退课</button>
              <hr>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jQuery from 'jquery'
export default {
  computed: {
    username() {
      return this.$route.params.username;
    }
  },
  data() {
    return {
      availableCourses: [
        //{"cno": "C9", "cname": "数理逻辑", "pname": "曹操","credit": 4.0, "score": 0.0},
        //{"cno": "C6", "cname": "近世代数", "pname": "曹操","credit": 2.0, "score": 0.0},
      ],
      selectedCourses: [
        //{"cno":"C4", "cname":"操作系统", "pname":"关羽", "credit": 4.0, "score": 90.0},
        //{"cno":"C1", "cname":"数据库", "pname":"关羽", "credit": 4.0, "score": 80.0},
        //{"cno": "C9", "cname": "数理逻辑", "pname": "曹操", "credit": 4.0, "score": 0.0},
        //{"cno": "C7", "cname": "高等数学", "pname": "曹操", "credit": 4.0, "score": 50.0},
        //{"cno": "C6", "cname": "近世代数", "pname": "曹操", "credit": 2.0, "score": 0.0},
        //{"cno": "C3", "cname": "组合数学", "pname": "曹操", "credit": 2.0, "score": 40.0},
        //{"cno": "C2", "cname": "离散数学", "pname": "曹操", "credit": 2.0, "score": 60.0},
        //{"cno": "C5", "cname": "数据结构", "pname": "张辽", "credit": 3.0, "score": 70.0},
      ],
    };
  },
  mounted() {
    //立即查看学生列表以及课程列表
    this.viewselectedCourse();
    this.viewavailableCourse();
  },
  methods: {
    viewselectedCourse(){
      jQuery.ajax({
        type:"get",
        url:"http://localhost:88/student/checkCourse",
        data:{
          username : this.username
        },
        async:false, //同步还是异步
        success: (res)=> {
          // console.log("viewSelectedCourse"+res,this);
          // console.log("this is cno:"+res[0].cno);
          // console.log("this is cname:"+res[1].cname);
          // console.log("this is pname:"+res[2].pname);
          // console.log("this is credit:"+res[3].credit);
          this.selectedCourses=res;
        }
      });
    },
    viewavailableCourse(){
      jQuery.ajax({
        type:"post",
        url:"http://localhost:88/student/checkAvailableCourses",
        data:{
          username : this.username
        },
        async:false, //同步还是异步
        success: (res)=> {
          // console.log("viewAvailableCourse"+this.res.availableCourses);
          // // console.log("this is cno:"+this.res.cno);
          // console.log("this is cname:"+this.res.availableCourses.cname);
          // console.log("this is pname:"+this.res.availableCourses[0].pname);
          // console.log("this is credit:"+this.res.availableCourses.credit);
          this.availableCourses=res;
        }
      });
    },
    selectCourse(courseId) {
      jQuery.ajax({
        type:"post",
        url:"http://localhost:88/student/selectCourse",
        data:{
          username : this.username,
          cno : courseId
        },
        async:false, //同步还是异步
        success: (res)=> {
          // location.reload();
          this.viewavailableCourse();
          this.viewselectedCourse();
        }
      });
    },
    withdrawCourse(courseId) {
      jQuery.ajax({
        type:"post",
        url:"http://localhost:88/student/deleteCourse",
        data:{
          username : this.username,
          cno : courseId
        },
        async:false, //同步还是异步
        success: (res)=> {
          // location.reload();
          this.viewavailableCourse();
          this.viewselectedCourse();
        }
      });
    },
    isCourseSelected(coursescore) {
      if (coursescore===-1) return true
      else return false;
    }
  }
};
</script>

<style>
/* 在这里可以定义组件内的样式 */
.row {
  justify-content:space-evenly;
  display:flex
}
</style>

