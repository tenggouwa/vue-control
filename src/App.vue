 <template>
  <div id="app">
   <!--  <img src="./assets/logo.png"> -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
body{
  overflow-x: auto;
  overflow-y: hidden;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-width: 1200px;
  overflow-x: auto;
 /* text-align: center;*/
/*  color: #2c3e50;*/
  /*margin-top: 60px;*/
}
</style>
