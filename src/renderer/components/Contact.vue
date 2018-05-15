<template>
  <div v-if="contact" class="contact">
    <img class="contact-avatar" :src="contact.avatar_url ? contact.avatar_url : `https://api.skype.com/users/${contact.username}/profile/avatar`" />{{ contact.displayname }}
  </div>
  <div v-else class="error">ERROR</div>
</template>

<script>
export default {
  name: 'Contact',
  props: {
    contact: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
  div.contact {
    font-size: 0.9rem;
    padding: 8px;
    border-bottom: 1px solid #eee;
  }
  div.contact:hover {
    background: #f5f5f5;
  }
  div.contact img.contact-avatar {
    width: 32px;
    height: 32px;
    border-radius: 100px;
    vertical-align: middle;
    margin-right: 8px;
  }
</style>

