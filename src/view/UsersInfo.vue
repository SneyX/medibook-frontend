<template>
  <div class="user-profile" v-if="rol == 'ADMIN'">
    <div class="contenedor">
      <div class="header">
        <h2>ADMINISTRACIÓN DE USUARIOS</h2>
        <div class="cerrar" @click="goBack">&lt;</div>
      </div>
      <div class="mainTable">
        <div class="info">
          <p class="id">id</p>
          <p class="name">Nombre</p>
        </div>
        <div class="action">
          <p>Acciones</p>
        </div>
      </div>
      <div class="salaInfo">
        <AdminUser :users="users" @update-user="updateUsers" />
      </div>
    </div>
  </div>
  <div class="contenedor" v-if="rol != 'ADMIN'">
    <div class="mainTable">
        <h2>ACCESO DENEGADO</h2>
        <p>NO TIENE PERMISO PARA MODIFICAR USUARIOS</p>
      </div>
  </div>
</template>

<script>

import getMethod from "@/service/getMethod";
import util from "@/utils/utils";
import AdminUser from "@/components/AdminUser";

export default {
  name: 'UsersInfo',
  emits: ['update-users'],
  components: {
    AdminUser,
  },
  computed: {
    theme() {
      return this.$store.getters.getTheme;
    },
    rol() {
      let rol = ""
      if (this.$store.getters.getUser && this.$store.getters.getUser.rol) {
        rol = this.$store.getters.getUser.rol
      }
      return rol 
    },
  },
  data() {
    return {
      users: []
    };
  },
  async created() {
    await this.generarUsers()
  },
  methods: {
    async generarUsers() {
      util.cargarLoader("Cargando usuarios...")
      this.users = await getMethod.getUsers()
      util.cargarLoader("")
    },
    async updateUsers(updateUsers) {
      this.users = updateUsers
    },
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
.header{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.mainTable {
  width: 100%;
  height: 3vw;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border: 2px solid black;
  border-radius: 15px;
  margin-top: 5px;
  background-color: #15b4bc;
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

@media only screen and (max-width:480px ){ 


  .mainTable {
  height: 10vw;
}
  
  .mainTable h2{
    font-size: 3vw;
  }
  .mainTable p{
    font-size: 3vw;
  }
  .salaInfo {
    font-size: 2.6vw;
  }

}
</style>