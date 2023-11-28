<template>
  <div :class="[theme, 'card']">
    <div class="card-container">
      <div class="headerContainer">
        <div class="cerrar" @click="goBack">&lt;</div>
        <h2>CARACTERÍSTICAS</h2>
        <p @click="updateCar()" class="agregar">Agregar</p>
      </div>
      <div class="headerContainerDos">
        <p>ID</p>
        <p>Icon/Nombre</p>
        <p>Actions</p>
      </div>
      <div class="footerCont">
        <div class="descripcion" v-for="car in card.characteristics" :key="car?.id">
          <p>id: {{ car?.id }}</p>
          <div class="iconNombre">
            <DinamicIcon :iconName="car?.urlicon" />
            <strong>{{ car?.name }}</strong>
          </div>
          <div class="action">
            <p @click="deleteCar(car, card)">Eliminar</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <DataDialog />
</template>

<script>
import util from '@/utils/utils'
import getMethod from '@/service/getMethod'
import putMethod from '@/service/putMethod'
import DataDialog from '@/components/DataDialog.vue'
import DinamicIcon from '@/components/DinamicIcon.vue'

export default {
  name: 'AdministrarCaracteristicas',
  components:{
    DataDialog,
    DinamicIcon,
  },
  computed: {
    theme() {
      return this.$store.getters.getTheme;
    },
  },
  data(){
    return {
      card:[]
    }
  },
  async created() {
    await this.loadCard()
  },
  methods:{
    async loadCard() {
      util.cargarLoader("Buscando características...")
      const data = {
        id: this.$route.params.id,
        isId: true
      }
      const resultado = await getMethod.getRoom(data)
      this.card = resultado
      util.cargarLoader("")
    },
    goBack() {
      this.$router.go(-1)
    },
    async updateCar(){
      util.cargarLoader("Cargando")
      const carac = await getMethod.getCaracteristicas() || []
      util.cargarLoader("")
      let dialog = {
        type: 'modificarCarac',
        caracteristicas: this.card.characteristics,
        totalCarac: carac,
        card: this.card,
        cancel: ()=> {
          dialog = {}
          this.$store.dispatch('setDialog',dialog)
        }
      }
      this.$store.dispatch('setDialog',dialog)
    },
    async deleteCar(car, card){
      let dialog = {
        type: 'delete',
        texto: 'Está seguro que desea eliminar esta característica?',
        id: car.id,
        name: car.name,
        acept: async () =>{
          dialog = {}
          this.$store.dispatch('setDialog',dialog)
          util.cargarLoader("Eliminando característica")
          const characteristics = card.characteristics.filter(x => x.id != car.id)
          card.characteristics = characteristics
          const data = card
          await putMethod.updateRoom(data)
          util.cargarLoader("")
        },
        cancel: ()=> {
          dialog = {}
          this.$store.dispatch('setDialog',dialog)
        }
      }
      this.$store.dispatch('setDialog',dialog)
    }
  },
};
</script>

<style scoped lang="scss">
  .card{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 50px;
    .card-container{
      width: 90%;
      height: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .headerContainer{
        width: 85%;
        min-height: 50px;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5px 20px;
        color: #605B5B;
        border: 1px #0d7277 solid;
        background-color: #99dcdd;
        border-radius: 15px;
        .cerrar{
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0f8389;
          border: 2px #0d7277 solid;
          background-color: #99dcdd;
          font-size: 30px;
          font-weight: bold;
          width: 45px;
          height: 45px;
          border-radius: 50%;
          cursor: pointer;
        }
        .agregar{
          color: #0f8389;
          border: 2px #0d7277 solid;
          background-color: #99dcdd;
          cursor: pointer;
          border-radius: 15px;
          padding: 5px 20px;
          transition: .5s ease-in-out;
        }
        .agregar:hover{
          color: #99dcdd;
          border: 2px #074b4e solid;
          background-color: #0d7277;
        }
      }
      .headerContainerDos{
        width: 85%;
        min-height: 50px;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: space-around;
        padding: 5px 20px;
        color: #605B5B;
        border: 1px #0d7277 solid;
        background-color: #99dcdd;
        border-radius: 15px;
        margin-top: 5px;
      }
      .footerCont{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        width: 85%;
        .descripcion{
          width: 100%;
          border: 1px #0d7277 solid;
          border-radius: 15px;
          margin: 5px 0;
          display: flex;
          align-items: center;
          justify-content: space-around;
          p, strong{
            color: black;
            padding-left: 5px;
            text-align: left;
          }
          .iconNombre {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .action{
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          }
        }
      }
    }
  }
  @media only screen and (max-width:480px ){
    .headerContainer{
      width: 100%;
      padding: 0px 2px;
      font-size: 12px;
    }
    .cerrar{
      border: 2px #605B5B solid;
      font-size: 20px;
      width: 25px;
      height: 25px;
      margin-right: 5px;
    }
    .footerCont{
      width: 100%;
    }
  }
</style>
