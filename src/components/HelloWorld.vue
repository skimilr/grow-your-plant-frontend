<template>
  <div class="home">
    <h1>Grow Your Plant!</h1>
    <p>
      Welcome to "Grow Your Plant!", a fun and interactive game where you can nurture your very own plant!
    </p>
    <h3>How to Play</h3>
    <ul>
      <li>Enter your User ID to get started.</li>
      <li>Water and feed your plant regularly to keep it healthy.</li>
      <li>Check back often to see your plant grow!</li>
      <li>If neglected, your plant may wither. Take good care of it!</li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
    </ul>
    <h3>Join the Community</h3>
    <p>
      Connect with other players and share your plant growing tips!
    </p>
    <ul>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
}
</script>

<style scoped>
.home {
  max-width: 800px; /* Set a maximum width for the content */
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  font-size: 18px;
  line-height: 1.6;
}

h3 {
  margin: 40px 0 20px; /* Adjust margin for spacing */
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 0 10px; /* Space between list items */
}

a {
  color: #42b983; /* Link color */
  text-decoration: underline; /* Add underline to links */
}
</style>

