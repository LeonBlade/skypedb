<template>
  <div class="container">
    <h1>SkypeDB</h1>
    <section>
      <h4>Conversations</h4>
      <ul>
        <li v-for="(convo, i) in this.$store.state.Database.conversations" :key="i">
          <a @click="openConvo(convo.id)">{{ convo.displayname }} ({{ convo.msg_count }})</a>
        </li>
      </ul>
    </section>
    
    <hr />

    <button @click="open()">Open</button> <span>{{ this.$store.state.Database.path }}</span>
    <button @click="getConversations()" :disabled="this.$store.state.Database.path.length <= 0">Get Conversations</button>

    <hr />

    <div v-if="this.$store.state.Database.convo != null">
      <div v-for="(message, i) in this.$store.state.Database.convo" :key="i">
        <strong>{{ message.from_dispname }}</strong>
        <p>{{ message.body_xml }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'welcome',
    methods: {
      open() {
        this.$store.dispatch('openDatabaseFile');
      },

      getConversations() {
        this.$store.dispatch('getConversations');
      },

      openConvo(id) {
        this.$store.dispatch('openConvo', id);
      },
    },
  };
</script>

<style>
  ul {
    height: 300px;
    overflow-y: auto;
  }
</style>
