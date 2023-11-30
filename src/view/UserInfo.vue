<template>
  <div class="user-profile">
    <div class="contenedor">
      <div class="header">
        <h2>ADMINISTRACIÓN DE USUARIOS</h2>
        <div class="cerrar" @click="goBack">&lt;</div>
      </div>
      <p>{{user.id}}</p>
      <p>{{user.name}}</p>
      <p>{{user.lastname}}</p>
      <p>{{user.username}}</p>
      <p>{{user.rol}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UsersInfo',
  emits: ['update-users'],
  computed: {
    theme() {
      return this.$store.getters.getTheme
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
    goBack() {
      this.$router.go(-1)
    },
  }, 

};
</script>

<style scoped>
.contenedor {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 50px;
}
.cerrar{
  display: flex;
  align-items: center;
  justify-content: center;
  color: #15b4bc;
  border: 3px #15b4bc solid;
  background-color: var(--oscuro);
  font-size: 30px;
  font-weight: bold;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  cursor: pointer;
  margin-right: 40px;
}
.header{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.mainTable {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border: 2px solid black;
  border-radius: 25px;
  margin-top: 5px;
}
.info {
  width: 35%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.id {
  width: 30%;
}
.name {
  width: 70%;
}
.action {
  width: 65%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.salaInfo {
  width: 100%;
}
</style>