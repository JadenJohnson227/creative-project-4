<template>
<div id="app">
  <div class="header">
    <router-link to="/">
      <div class="logo">
        <img src="/blue-bird.png">
      </div>
    </router-link>
    <div class="title">
      <h1>Twitter Knock Off</h1>
    </div>
  </div>
  <div class="content">
    <router-view />
  </div>
  <div class="footer">
    <router-link to="/post">Post</router-link>
    <p></p>
    <router-link to="/delete">Delete</router-link>
    <p></p>
    <a href ='https://github.com/JadenJohnson227/creative-project-4'>Github repository</a>
  </div>
</div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#app h1 {
  color: blue;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

#content {
  width: 65%;
  margin: auto;
}

.logo img {
  width: 150px;
  height: auto;
}

.footer {
  background-color: blue;
  color: orange;
  padding: 20px;
}

.footer a {
  color: white;
}
</style>
