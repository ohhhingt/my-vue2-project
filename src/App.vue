<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
/* 这里不能加*号 这种东西项目一开始没加 就不要加了 */
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  box-sizing: border-box;
}

ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

input {
  border: none;
  border-radius: 0;
  outline: none;
  /* border: 1px solid #f2f3f4; */
  font-size: 16px;
  color: #333;
}

button {
  border: 0;
  color: #fff;
  cursor: pointer;
}

input::placeholder {
  color: #aaa;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

h1,
h2 {
  margin: 0;
}
@font-face {
  font-family: electronicFont;
  src: url(./font/DS-DIGIT.TTF);
}

a {
  text-decoration: none;
}
</style>
