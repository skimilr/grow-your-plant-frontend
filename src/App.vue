<template>
  <div id="app">
    <nav>
      <div>
        <router-link to="/">Home</router-link>
      </div>
      <div>
        <router-link to="/plant">Your Plant</router-link>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Pacifico', cursive; /* Change to the selected font */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px; /* Reduce margin for the nav bar */
}

nav {
  display: flex;
  justify-content: center;
  padding: 5px; /* Reduce padding for the nav bar */
}

nav div {
  margin: 0 10px; /* Adjust spacing between links */
}

nav a {
  text-decoration: none; /* Remove underline */
  font-size: 16px; /* Adjust font size for nav links */
  color: #2c3e50; /* Match the text color */
}

nav a:hover {
  color: #1abc9c; /* Change color on hover */
}
</style>

