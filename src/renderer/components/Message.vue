<template>
  <div class="box">
    <div>
      <span class="username">{{ message.displayname }}</span>
      <span class="timestamp">{{ timestamp(message.timestamp) }}</span>
    </div>
    <p class="body" v-html="parse(message.body)">hi</p>
  </div>  
</template>

<script>
  import moment from 'moment';

  const emoteRegex = /<ss type="([a-zA-Z]+)">([^<]+)<\/ss>/g;

  export default {
    name: 'message',
    props: {
      message: {
        type: Object,
        required: true,
      },
    },
    methods: {
      timestamp(ts) {
        return moment(ts).format('MM/DD/YYYY h:mm A');
      },
      parse(body) {
        return body.replace(emoteRegex, '<img src="https://static-asm.secure.skypeassets.com/pes/v1/emoticons/$1/views/default_20" alt="$2" />');
      },
    },
  };
</script>

<style scoped>
  div.box {
    font-size: .9rem;
    background: white;
    padding: 16px;
    border-radius: 4px;
    word-wrap: break-word;
    margin: 16px;
  }
  span.username {
    font-weight: bold;
  }
  span.timestamp {
    color: #CCC;
    font-size: .75rem;
  }
</style>

