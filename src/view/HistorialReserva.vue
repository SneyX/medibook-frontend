<template>
  <div class="contenedor">
    <div class="header">
      <h2>PANEL DE RESERVAS</h2>
      <div class="cerrar" @click="goBack">&lt;</div>
    </div>
    <div class="mainTable">
      <div class="salaCont">
        <p :class="{ back : displaysala }" @click="displayHandler('finalizadas')">finalizadas</p>
      </div>
      <div class="categoryCont">
        <p :class="{ back : !displaysala }" @click="displayHandler('actuales')">actuales</p>
      </div>
    </div>
    <div class="mainTable">
      <div class="info">
        <p class="id">id</p>
        <p class="name">Sala</p>
        <p class="fecha">Fecha</p>
      </div>
      <div class="action">
        <p>Acciones</p>
      </div>
    </div>
    <div class="salaInfo" v-if="displaysala && completeCards">
      <AdminReservaFinalizada :cards="cards" @update-cards="updateCards" />
    </div>
    <div class="salaInfo" v-if="!displaysala && completeCards">
      <AdminReservaActual :cards="cards" @update-cards="updateCards" />
    </div>
  </div>
</template>

<script>
import getMethod from "@/service/getMethod"
import util from "@/utils/utils"
import AdminReservaFinalizada from "@/components/AdminReservaFinalizada.vue"
import AdminReservaActual from "@/components/AdminReservaActual"

export default {
  name: "HistorialReserva",
  components: {
    AdminReservaFinalizada,
    AdminReservaActual,
  },
  computed: {
    theme() {
      return this.$store.getters.getTheme;
    },
    storeBookings(){
      return this.$store.getters?.getReserva || []
    },
    user(){
      return this.$store.getters?.getUser
    },
  },
  data() {
    return {
      cards: [],
      displaysala: true,
      completeCards: false
    };
  },
  async mounted() {
    await this.generarCards()
  },
  methods: {
    async generarCards() {
      util.cargarLoader("Cargando reservas finalizadas...")
      this.cards = await getMethod.getUserBooking(this.user.id)
      this.cards.sort((a, b) => this.convertirFecha(a.date) - this.convertirFecha(b.date))
      const currentDate = new Date()
      this.cards = this.cards.filter(card => {
        return this.convertirFecha(card.date) < currentDate
      })
      util.cargarLoader("")
      this.completeCards = true
    },
    async generarCards2() {
      util.cargarLoader("Cargando reservas activas...")
      this.cards = await getMethod.getUserBooking(this.user.id)
      this.cards.sort((a, b) => this.convertirFecha(a.date) - this.convertirFecha(b.date))
      const currentDate = new Date()
      this.cards = this.cards.filter(card => {
        return this.convertirFecha(card.date) >= currentDate
      })
      util.cargarLoader("")
      this.completeCards = true
    },
    async updateCards(updatedRooms) {
      this.cards = updatedRooms
      this.$store.dispatch('setReserva', updatedRooms)
    },
    async displayHandler(value){
      switch (value) {
        case 'finalizadas':
          await this.generarCards()
          this.displaysala = true
        break
        case 'actuales':
          await this.generarCards2()
          this.displaysala = false
        break
      }
    },
    convertirFecha(fechaString) {
      const meses = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

      const mes = meses.indexOf(fechaString.slice(3, 6))
      const dia = parseInt(fechaString.slice(6, 8), 10)
      const anio = parseInt(fechaString.slice(8, 12), 10)

      return new Date(anio, mes, dia)
    },
    goBack() {
      this.$router.go(-1)
    },
  },
}
</script>
<style scoped>

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
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border: 2px solid black;
    border-radius: 15px;
    margin-top: 5px;
    background-color: #15b4bc;
    font-weight: bold;
  }
  .back {
    background-color: #99DCDD;
  }
  .mainTable p {
    cursor: pointer;
  }
  .categoryCont, .salaCont{
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .mainTable .back{
    height: 100%;
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid black;
    border-radius: 15px;
  }
  .info {
    width: 65%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .id {
    width: 10%;
  }
  .name, .fecha {
    width: 45%;
  }
  .action {
    width: 35%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .salaInfo {
    width: 100%;
  }
</style>
