<template>
  <div class="container">
    <h1>SkypeDB</h1>
    <section>
      <h4>Recent</h4>
      <ul>
        <li>example</li>
        <li>example</li>
        <li>example</li>
      </ul>
    </section>
    <button @click="open()">Open</button>
    <div>{{ this.$store.state.Counter.main }}</div>
    <button @click="incr()">Add</button><button @click="decr()">Remove</button>
  </div>
</template>

<script>
  export default {
    name: 'welcome',
    methods: {
      open() {
        this.$dialog.showOpenDialog({
          properties: ['openFile'],
          filters: [
            { name: 'SQLite', extensions: ['db'] },
            { name: 'All files', extensions: ['*'] },
          ],
        }, (file) => {
          console.log(file);
        });
      },
      incr() {
        console.log(this.$store);
        this.$store.dispatch('incr');
      },
      decr() {
        this.$store.dispatch('decr');
      },
    },
  };
</script>

<style>
</style>
