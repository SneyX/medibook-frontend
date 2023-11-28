<template>
    <div class="bases">
      <h2>Bases y Condiciones</h2>
      <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni ipsa tempora nisi sint atque minima repellendus, odio, doloremque natus magnam ex facere mollitia dignissimos dolor perferendis totam, aliquam sequi excepturi?</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'BasesYCondiciones',
    emits: ['update-users'],
    computed: {
      theme() {
        return this.$store.getters.getTheme;
      },
      user(){
        return this.$store.getters?.getUser
      }
    },
    data() {
      return {
        users: []
      };
    },
    created() {
    },
    methods: {
    }, 
  
  };
  </script>
  
  <style scoped>
  .bases {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 50px;
  }
  </style>