<template>
  <div class="app">

    <nav class="navbar is-primary">
      <div class="navbar-brand">
        <img src="~@/assets/skypedb.svg" class="logo" />
      </div>
      <div class="navbar-item">SkypeDB</div>
      <button class="button" @click="open()">Open</button>
    </nav>

    <section class="conversations">
      <contact v-for="(convo, i) in convos" :key="i" :selected="convo.id === currentConversation" @click.native="openConvo(convo.id)" :contact="convo" />
    </section>

    <section ref="messagesRoot" class="messages">
      <paginate-links
        @change="onPageChange"
        v-if="messages"
        for="messages"
        :async="true"
        :limit="3"
        :classes="plClass"
        style="margin-top: 16px"
      ></paginate-links>
      <div ref="messages" class="wrapper">
        <paginate name="messages" v-if="messages" :list="messages" :per="1000">
          <message v-for="message in paginated('messages')" :message="message"></message>
        </paginate>
      </div>
      <paginate-links
        @change="onPageChange"
        v-if="messages"
        for="messages"
        :async="true"
        :limit="3"
        :classes="plClass"
        style="margin-bottom: 16px"
      ></paginate-links>
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
    data() {
      return {
        paginate: ['messages'],
        plClass: {
          ul: 'pagination-list',
          '.number': 'pagination-link',
          '.ellipses': 'pagination-ellipsis',
        },
      };
    },
    computed: mapGetters({
      convos: 'getConversations',
      currentConversation: 'getCurrentConversation',
      messages: 'getMessages',
    }),
    mounted() {
      this.$nextTick(() => {
        // reroute the link tags to open in external browser
        this.$refs.messages.addEventListener('click', (event) => {
          if (event.target.tagName.toLowerCase() === 'a') {
            event.preventDefault();
            event.stopImmediatePropagation();
            shell.openExternal(event.target.href);
          }
        });

        this.$store.subscribe((mutation) => {
          if (mutation.type === 'OPEN_CONVO' && this.$refs.messagesRoot) {
            this.$refs.messagesRoot.scrollTo(0, 0);
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
      onPageChange() {
        this.$refs.messagesRoot.scrollTo(0, 0);
      },
    },
  };
</script>


<style lang="scss">
  div.app {
    display: grid;
    grid-template-columns: 250px auto;
    grid-template-rows: 64px auto;
    grid-template-areas: "nav nav" "conv chat";
    overflow: hidden;
    height: 100%;
  }

  img.logo {
    width: 64px;
    height: 64px;
  }

  nav {
    grid-area: nav;
  }

  section.conversations {
    grid-area: conv;
    background:#3e4046;
    background: linear-gradient(125deg, #3e4046, #232325);
    color: #bbb;
    overflow-y: auto;
  }

  section.messages {
    grid-area: chat;
    background: #eef0f1;
    position: relative;
    overflow-y: auto;
  }

  ul.paginate-links {
    display: inline-block;
    text-align: center;
    width: 100%;
  }

  li.ellipses {
    pointer-events: all;
  }

  li.active, li.active:hover {
    background-color: #3273dc;
    border-color: #3273dc;
    a {
      color: white;
    }
  }
</style>
