<template>
  <div class="mainTable" v-for="user in users" :key="user?.id">
    <div class="info">
      <p class="id">{{ user?.id }}</p>
      <p class="name">{{ user?.name }}</p>
      <p class="name">{{ user?.role }}</p>
    </div>
    <div class="action">
      <p @click="changeRol(user)">Rol</p>
    </div>
  </div>
  <DataDialog @update-rol="handleUpdateRol"/>
</template>

<script>

import getMethod from '@/service/getMethod'
import util from '@/utils/utils'
import DataDialog from './DataDialog'

export default {
name:'AdminUser',
emits: ['update-rol','update-user'],
components: {
  DataDialog,
},
props:{
  users:{
    type:Array,
    default:()=>[],
  }
},
data() {
  return {
    userId: null,
    user: {},
  };
},
methods:{
  async changeRol(user) {
    this.userId = user.id
    this.user = user
    let dialog = {
      type: 'rol',
      texto: 'Cambiar rol del usuario?',
      cancel: () => {
        dialog = {};
        this.$store.dispatch('setDialog', dialog);
      },
    }
    this.$store.dispatch('setDialog',dialog)
  },
  async handleUpdateRol(rol) {
    let dialog = {}
    this.$store.dispatch('setDialog', dialog)

    util.cargarLoader("Actualizando rol...")

    if(this.user.role != rol){
      const res = await getMethod.getUserRol(this.userId)
      if (res.ok) {
        util.cargarPopUp("Rol asignado con éxito", "Gracias!")
        const users = await getMethod.getUsers()
        this.$emit('update-user', users)
      } else {
        util.cargarPopUp("Lo sentimo, ha ocurrido un error", "Error!")
      }
    } else {
      util.cargarPopUp(`El usuario ya es ${rol}`, "Error!")
    }
    util.cargarLoader("")
  }
}
}
</script>
<style scoped>
.mainTable{
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border: 2px solid black;
  border-radius: 25px;
  margin: 10px 0;
}
.info{
  width: 35%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.id{
  width: 30%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.name{
  width: 70%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid black;
  border-radius: 25px;
}
.action{
  width: 65%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.action p{
  cursor: pointer;
}
@media only screen and (max-width:480px ){
  .mainTable{
    height: 7vw;
    }
  }
</style>