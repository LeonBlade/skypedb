<template>
  <div class="container">

    <nav class="navbar is-primary">
      <button class="button" @click="open()">Open</button>
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
        // reroute the link tags to open in external browser
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
      openConvo(id) {
        this.$store.dispatch('openConvo', id);
      },
    },
  };
</script>


<style scoped>
  div.container {
    display: grid;
    grid-template-columns: 250px auto;
    grid-template-rows: 64px auto;
    grid-template-areas: "nav nav" "conv chat";
    overflow: hidden;
    height: 100%;
  }

  nav {
    grid-area: nav;
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
