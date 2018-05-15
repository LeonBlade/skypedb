<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'skypedb',
  };
</script>

<style>
  @import "~bulma/css/bulma.css";
  html, body { 
    font-size: 10pt;
  }
  .error {
    color: white;
    background: red;
    padding: 8px;
    font-family: monospace;
  }
  ::-webkit-scrollbar {     
    background-color: rgba(0,0,0,.1);
    width: .8em
  }

  ::-webkit-scrollbar-thumb:window-inactive,
  ::-webkit-scrollbar-thumb {
    background: #999;
    border-radius: 100px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #777;
  }
</style>
