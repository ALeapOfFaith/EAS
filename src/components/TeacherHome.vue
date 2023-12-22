<template>
  <div>
    <h2>欢迎，{{ username }}老师!</h2>

    <!-- Open a new course -->
    <div class="container-fluid">
      <div class="row">
        <div class="col" style="background-color: #ffffff; padding: 20px;">
          <div>
            <h3>开设新课程</h3>
            <form @submit.prevent="openCourse">
              <label for="courseName">课程id:</label>
              <input type="text" id="courseNo" v-model="newCourse.cno" required>
              <label for="courseName">课程名:</label>
              <input type="text" id="courseName" v-model="newCourse.cname" required>
              <label for="courseName">课程学分:</label>
              <input type="text" id="courseCredit" v-model="newCourse.credit" required>
              <div>
                <button @click="openCourse()">开课</button>
                <button @click="editCourse()">编辑</button>
              </div>

            </form>
          </div>
          <!-- 课程列表 -->
          <div>
            <h3>您的课程</h3>
            <ul>
              <li v-for="course in teacherCourses" :key="course.cno">
                课程id: {{ course.cno }}<br>
                课程名: {{ course.cname }}<br>
                学分: {{ course.credit }}<br>
                <button @click="deleteCourse(course.cno)">删除</button>
                <!-- <br/> -->
              </li>
            </ul>
          </div>
        </div>
        <div class="col" style="background-color: #ffffff; padding: 20px;">
          <!-- 管理学生成绩 -->
          <div>
            <h3>管理学生成绩</h3>
            <form>
              <label for="studentUsername">学生id:</label>
              <input type="text" id="studentUsername" v-model="gradeData.sno" required>

              <label>课程:</label>
              <select id="courseId" v-model="gradeData.cno">
                <option v-for="course in teacherCourses" :key="course.cno" :value="course.cno">{{ course.cname }}</option>
              </select>

              <label for="grade">成绩:</label>
              <input type="text" id="grade" v-model="gradeData.score" required>
              <div>
                <button  @click="addGrades">添加成绩</button>
                <button  @click="editGrades">修改成绩</button>
                <button  @click="deleteGrades">删除成绩</button>
              </div>

              <h3>学生成绩</h3>
              <ul>
                <li v-for="grade in AllGrade" :key="grade.cno">
                  学生id: {{ grade.sno }}<br>
                  学生名: {{ grade.sname }}<br>
                  课程名: {{ grade.cname }}<br>
                  成绩: {{ grade.score }}<br>
                  <br>
                </li>
              </ul>
            </form>
          </div>
        </div>
        <div class="col" style="background-color: #ffffff; padding: 20px;">
          <div>
            <h3>学生选课列表</h3>
              <li v-for="Studentsss in student" :key="Studentsss.sname">
                学生id: {{ Studentsss.sno }}<br>
                学生名: {{ Studentsss.sname }}<br>
                课程id: {{ Studentsss.cno }}<br>
                课程名: {{ Studentsss.cname }}<br>
                <br>
              </li>
          </div>
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
    },
  },
  data() {
    return {
      newCourse: {
        cno: '',
        cname: '',
        username:this.username,
        credit: '',
      },
      teacherCourses: [
        //{ cno: 1, cname: 'Math' ,pno:'31231',credit:1},
        //{ cno: 2, cname: 'Science' ,pno:'12313',credit:2},
      ],
      gradeData: {
        sno: '',
        cno: '',
        score: '',
      },
      AllGrade:[
      ],
      studentCoursesData: {
        studentUsername: '',
        courses: [],
      },
      student:[
      ],
    };
  },
  mounted() {
    //立即查看学生列表以及课程列表
    this.viewStudents();
    this.viewCourse();
    this.viewGrade();
  },
  methods: {
    viewCourse() {
      jQuery.ajax({
        type:"post",
        url:"http://localhost:88/professor/checkCourse",
        data:{
          username : this.username
        },
        async:false, //同步还是异步
        success: (res)=> {
          console.log("viewCourse"+res);
          this.teacherCourses=res;
        }
      });
      this.newCourse = { name: '' };
    },
    openCourse() {
      jQuery.ajax({
        type:"post",
        url:"http://localhost:88/professor/alterCourse",
        data:{
          username : this.username,
          cno : this.newCourse.cno,
          cname : this.newCourse.cname,
          credit : this.newCourse.credit
        },
        async:false, //同步还是异步
        success: (res)=> {
          this.teacherCourses=res;
        }
      });
      this.newCourse = { name: '' };
    },
    editCourse() {
      jQuery.ajax({
        type:"post",
        url:"http://localhost:88/professor/alterCourse",
        data:{
          username : this.username,
          cno : this.newCourse.cno,
          cname : this.newCourse.cname,
          credit : this.newCourse.credit
        },
        async:false, //同步还是异步
        success: (res)=> {
          this.teacherCourses=res;
        }
      });
    },
    deleteCourse(cno) {
      jQuery.ajax({
        type:"post",
        url:"http://localhost:88/professor/deleteCourse",
        data:{
          username: this.username,
          cno : cno
        },
        async:false, //同步还是异步
        success: (res)=> {
          // console.log("deleteCourse"+res,this);
          // console.log(res.length);
          // console.log("this is cno:"+res[0].cno);
          // console.log("this is cname:"+res[0].cname);
          // console.log("this is credit:"+res[0].credit);
          this.teacherCourses=res;
          this.viewGrade();
          this.viewStudents();
        }
      });
    },
    viewGrade(){
      jQuery.ajax({
        type:"post",
        url:"http://localhost:88/professor/checkStudentCourse",
        data:{
          username : this.username
        },
        async:false, //同步还是异步
        success: (res)=> {
          this.AllGrade=res;
        }
      });
    },
    addGrades() {
      jQuery.ajax({
        type:"post",
        url:"http://localhost:88/professor/alterScore",
        data:{
          username : this.username,
          sno : this.gradeData.sno,
          cno : this.gradeData.cno,
          score : this.gradeData.score
        },
        async:false, //同步还是异步
        success: (res)=> {
          this.AllGrade=res;
          // this.viewGrade();
        }
      });
    },
    editGrades() {
      jQuery.ajax({
        type:"post",
        url:"http://localhost:88/professor/alterScore",
        data:{
          username : this.username,
          sno : this.gradeData.sno,
          cno : this.gradeData.cno,
          score : this.gradeData.score
        },
        async:false, //同步还是异步
        success: (res)=> {
          this.AllGrade=res;
          // this.viewGrade();
        }
      });
    },
    deleteGrades() {
      jQuery.ajax({
        type:"post",
        url:"http://localhost:88/professor/deleteScore",
        data:{
          username : this.username,
          sno : this.gradeData.sno,
          cno : this.gradeData.cno,
          score : this.gradeData.score
        },
        async:false, //同步还是异步
        success: (res)=> {
          this.AllGrade=res;
          // this.viewGrade();
        }
      });
    },
    viewStudents() {
      jQuery.ajax({
        type:"post",
        url:"http://localhost:88/professor/checkStudentCourse",
        data:{
          username : this.username
        },
        async:false, //同步还是异步
        success: (res)=> {
          // console.log("viewStudents"+res);
          this.student=res;
        }
      });
    },
  },
};
</script>

<style>
/* 在这里可以定义组件内的样式 */
.row {
  justify-content:space-evenly;
  display:flex
}
</style>
