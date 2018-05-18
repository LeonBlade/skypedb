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
    margin: 8px;
    padding: 8px;
    transition: background .5s ease;
    border-radius: 5px;
    font-weight: 500;
  }
  div.contact[selected=selected], div.contact[selected=selected]:hover {
    background: #4d4f56;
    box-shadow: 0 1px 2px rgba(0,0,0,.1);
    color: white;
  }
  div.contact img.contact-avatar {
    width: 32px;
    height: 32px;
    border-radius: 100px;
    vertical-align: middle;
    margin-right: 8px;
    box-shadow: 0 1px 3px rgba(0,0,0,.5);
  }
</style>

