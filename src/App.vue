<template>
  <div id="app">
    <div>
      <button class="btn btn-default" @click="showSheet">Lijst</button>
      <button class="btn btn-default" @click="showForm">Form</button>
    </div>
    <router-view/>
  </div>
</template>

<script>
  import router from './router'
  export default {
    name: 'app',
    methods: {
      showForm () {
        router.push('form')
      },
      showSheet () {
        router.push('sheet')
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
