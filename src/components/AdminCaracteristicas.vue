<template>
  <div class="mainTable2">
    <div class="info2">
      <p class="id2">id</p>
      <p class="name2">Ícono - Nombre</p>
    </div>
    <div class="action2">
      <p>Acciones</p>
    </div>
  </div>
  <div class="mainTable" v-for="card in renderCards" :key="card?.id">
    <div class="info">
      <p class="id">{{ card?.id }}</p>
      <div class="name">
        <div class="nameIcon">
          <DinamicIcon :iconName="card?.urlicon" @iconClick="handleIconClick" class="icono"/>
          {{ card?.name }}
        </div>
      </div>
    </div>
    <div class="action">
      <p @click="modifyCard(card)">Modificar</p>
      <p @click="deleteCard(card)">Eliminar</p>
    </div>
  </div>
  <DataDialog @update-caracteristicas="handleUpdateCaracteristicas"/>
</template>
<script>
import deleteMethods from '@/service/deleteMethod'
import getMethod from '@/service/getMethod'
import util from '@/utils/utils'
import DataDialog from './DataDialog'
import DinamicIcon from './DinamicIcon.vue'

export default {
  name:'AdminType',
  emits: ['update-caracteristicas', 'update-cards'],
  components: {
    DataDialog,
    DinamicIcon,
  },
  props:{
    cards:{
      type:Array,
      default:()=>[],
    }
  },
  data(){
    return {
      renderCards:[]
    }
  },
  mounted() {
    this.renderCards = this.cards
  },
  methods:{
    handleIconClick(){},
    modifyCard(card) {
      let dialog = {
        type: 'updateCaracteristica',
        name: card.name,
        card: card,
        cancel: ()=> {
          dialog = {}
          this.$store.dispatch('setDialog',dialog)
        }
      }
      this.$store.dispatch('setDialog',dialog)
    },
    async handleUpdateCaracteristicas(){
      const updatedRooms = await getMethod.getCaracteristicas()
      this.renderCards = updatedRooms
      this.$store.dispatch('setCaracteristicas', updatedRooms)
    },
    async deleteCard(card) {
      let dialog = {
        type: 'delete',
        texto: 'Está seguro que desea eliminar esta característica?',
        id: card?.id,
        name: card?.name,
        description: card?.urlicon,
        acept: async () =>{
          dialog = {}
          this.$store.dispatch('setDialog',dialog)
          util.cargarLoader("Eliminando característica")
          await deleteMethods.deleteCaracteristica(card.id)
          const updatedRooms = await getMethod.getCaracteristicas()
          this.renderCards = updatedRooms
          this.$store.dispatch('setCaracteristicas', [])
          this.$store.dispatch('setCaracteristicas', updatedRooms)
          this.$emit('update-cards', updatedRooms, 'car')
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
        .nameIcon{
          display: flex;
          align-items: center;
          justify-content: flex-start;
          min-width: 40%;
        }
        .icono{
          display: flex;
          width: 35px;
          height: 35px;
          align-items: center;
          justify-content: center;
          border: 1px solid #0d7277;
          border-radius: 50%;
          background-color: #99DCDD;
          margin-right: 10px;
        }
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