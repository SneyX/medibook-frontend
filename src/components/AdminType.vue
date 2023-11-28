<template>
  <div class="mainTable2">
    <div class="info2">
      <p class="id2">id</p>
      <p class="name2">Nombre</p>
    </div>
    <div class="action2">
      <p>Acciones</p>
    </div>
  </div>
  <div class="mainTable" v-for="card in cards" :key="card?.id">
    <div class="info">
      <p class="id">{{ card?.id }}</p>
      <p class="name">{{ card?.name }}</p>
    </div>
    <div class="action">
      <p @click="modifyCard(card)">Modificar</p>
      <p @click="deleteCard(card)">Eliminar</p>
    </div>
  </div>
  <DataDialog />
</template>

<script>

import deleteMethods from '@/service/deleteMethod'
import getMethod from '@/service/getMethod'
import util from '@/utils/utils'
import DataDialog from './DataDialog'

export default {
  name:'AdminType',
  emits: ['update-cards'],
  components: {
    DataDialog,
  },
  props:{
    cards:{
      type:Array,
      default:()=>[],
    }
  },
  methods:{
    modifyCard(card) {
      console.log('Modificar', card);
    },
    async deleteCard(card) {
      let dialog = {
        type: 'delete',
        texto: 'Está seguro que desea eliminar esta categoría?',
        id: card.id,
        name: card.name,
        description: card.description,
        acept: async () =>{
          dialog = {}
          this.$store.dispatch('setDialog',dialog)
          util.cargarLoader("Eliminando sala")
          await deleteMethods.deleteTypeRoom(card.id)
          const updatedRooms = await getMethod.getTypeRooms()
          this.$store.dispatch('setTypeRooms', updatedRooms)
          this.$emit('update-cards', updatedRooms)
          util.cargarLoader("")
        },
        cancel: ()=> {
          dialog = {}
          this.$store.dispatch('setDialog',dialog)
        }
      }
      this.$store.dispatch('setDialog',dialog)
    },
  }
}
</script>
<style scoped lang="scss">
  .mainTable{
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border: 2px solid black;
    border-radius: 15px;
    margin: 10px 0;
    .info{
      width: 50%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
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
        border-radius: 15px;
      }
    }
  }
  .action{
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    p{
      cursor: pointer;
    }
  }
  .mainTable2 {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border: 2px solid black;
    border-radius: 15px;
    margin-top: 5px;
    background-color: #15b4bc;
    font-weight: bold;
    .info2 {
      width: 50%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .id2 {
        width: 30%;
      }
      .name2 {
        width: 70%;
      }
    }
    .action2 {
      width: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
</style>