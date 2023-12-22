<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  // App component options go here
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h2 {
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

input {
  margin-bottom: 10px;
}

button {
  cursor: pointer;
}
</style>
