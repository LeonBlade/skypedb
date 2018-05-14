<template>
  <div class="container">

    <section class="conversations">
      <ul>
        <li v-for="(convo, i) in convos" :key="i" @click="openConvo(convo.id)">
          <img class="avatar" :src="`https://api.skype.com/users/${convo.identity}/profile/avatar`" />
          <span>{{ convo.displayname }}</span>
        </li>
      </ul>
    </section>

    <section class="messages">
      Messages
      <button @click="open()">Open</button>
      <button @click="getConversations()">Get Conversations</button>
      <section>
        <div class="message" v-for="(message, i) in messages" :key="i">
          <strong>{{ message.from_name }}</strong><span class="ts">{{ ts(message.timestamp) }}</span>
          <p v-html="message.body">{{ message.body }}</p>
        </div>
      </section>
    </section>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import moment from 'moment';

  document.querySelector('#messages').addEventListener('click', (event) => {
    event.preventDefault();
  });

  export default {
    name: 'welcome',
    computed: mapGetters({
      convos: 'getConversations',
      messages: 'getMessages',
    }),
    methods: {
      ts(timestamp) {
        return moment(timestamp).format('MM/DD/YYYY h:mm A');
      },

      open() {
        this.$store.dispatch('openDatabaseFile');
        console.log(this.$store);
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
    display: flex;
    align-items: stretch;
    height: 100%;
  }
  section.conversations {
    width: 250px;
    background: whiteSmoke;
  }
  section.messages {
    height: 100%;
    overflow-y: auto;
    flex: 1;
  }
  ul { 
    list-style: none; 
    overflow-y: auto;
    margin: 0;
    padding: 0;
    height: 100%;
  }
  li {
    padding: 8px;
    display: flex;
    align-items: center;
    font-size: 0.8rem;
  }
  img.avatar {
    width: 32px;
    height: 32px;
    border-radius: 100px;
  }
  li:hover {
    background: blue;
    cursor: pointer;
    color: white;
  }
  div.message {
    margin: 16px;
    border-radius: 3px;
    padding: 8px;
    box-shadow: 0 4px 6px rgba(0,0,0,.2);
    word-wrap: break-word;
  }
  div.message p {
    margin: 0;
  }
  .ts {
    font-size: 0.8rem;
    color: #888;
    margin-left: 8px;
  }
</style>
