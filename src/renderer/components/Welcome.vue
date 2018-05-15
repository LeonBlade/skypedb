<template>
  <div class="container">

    <nav class="navbar is-info">
      <a class="button" @click="open()">Open</a>
      <a class="button" @click="getConversations()">Get Conversations</a>
    </nav>

    <section class="conversations">
      <contact v-for="(convo, i) in convos" :key="i" @click.native="openConvo(convo.id)" :contact="convo" />
    </section>

    <section class="messages">
      <message v-for="(message, i) in messages" :key="i" :message="message" />
    </section>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import { shell } from 'electron';

  import Contact from './Contact.vue';
  import Message from './Message.vue';

  export default {
    name: 'welcome',
    components: {
      Contact,
      Message,
    },
    computed: mapGetters({
      convos: 'getConversations',
      messages: 'getMessages',
    }),
    mounted() {
      this.$nextTick(() => {
        this.$el.querySelector('.messages').addEventListener('click', (event) => {
          if (event.target.tagName.toLowerCase() === 'a') {
            event.preventDefault();
            event.stopImmediatePropagation();
            shell.openExternal(event.target.href);
          }
        });
      });
    },
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
  html, body, #app {
    margin: 0;
    height: 100%;
    overflow: hidden;
  }
  div.container {
    display: grid;
    grid-template-columns: 250px auto;
    grid-template-rows: 64px auto;
    grid-template-areas: "nav nav" "conv chat";
    height: 100%;
  }
  nav {
    grid-area: nav;
    -webkit-app-region: drag;
  }
  section.conversations {
    grid-area: conv;
    background:white;
    overflow-y: auto;
  }
  section.messages {
    grid-area: chat;
    background: #eef0f1;
    overflow-y: auto;
  }
</style>
