<template>
  <div class="mainContainer">
    <h1>RESERVAR SALA</h1>
    <div class="contenedor">
      <div class="calendarios cal1Cont">
        <vue-cal
          locale="es"
          class="cal1"
          :xsmall="true"
          :selected-date="fechaSeleccionada"
          hide-view-selector
          :time="false"
          :transitions="false"
          :min-date="minDate"
          active-view="month"
          :events="datos.events"
          :disable-views="['week', 'day']"
          @cell-click="fechaSeleccionada = $event"
          ></vue-cal>
        <div class="fecha">
          Fecha seleccionada: '{{ fechaSeleccionada.format() }}'
        </div>
      </div>

      <div class="calendarios cal2Cont">
        <vue-cal
          locale="es"
          class="cal2"
          :disable-views="['years', 'year', 'month','week']"
          active-view="day"
          :selected-date="fechaSeleccionada"
          :time-from="8 * 60"
          :time-to="22 * 60"
          :events="datos.events"
          @cell-click="reservarTurno($event)"
          @cell-focus="fechaSeleccionada = $event.date || $event"
          :on-event-click="onEventClick"
        >
        </vue-cal>
      </div>
    </div>
  </div>
  <DataDialogVue />
</template>

<script>
import VueCal from '/node_modules/vue-cal/dist/vue-cal.cjs.js'
import DataDialogVue from '@/components/DataDialog.vue'
import 'vue-cal/dist/vuecal.css'
import postMethods from '@/service/postMethod'
import getMethod from '@/service/getMethod'
import util from '@/utils/utils'
import deleteMethods from '@/service/deleteMethod'

const datos = {
  events: []
}

export default {
  name: 'AgregarReserva',
  components: { 
    VueCal,
    DataDialogVue,
  },
  data() {
    return {
      datos,
      fechaSeleccionada: new Date(),
      minDate: null
    }
  },
  computed: {
    previousFirstDayOfWeek() {
      return new Date(new Date().setDate(new Date().getDate() - (new Date().getDay() + 6) % 7))
    },
    user(){
      return this.$store.getters?.getUser
    },
  },
  async created() {
    await this.completarCalendario()
    this.minDate = new Date()
  },
  beforeUnmount(){
    this.datos.events = []
  },
  methods:{
    async reservarTurno(e){
      const fecha = e.toString().slice(0, 16).replace(/\s+/g, '')
      const turno = e.toString().slice(16, 18).replace(/\s+/g, '').concat(":00")
      const dateBooking = new Date().toString().slice(0, 16).replace(/\s+/g, '')
      const fechaData = this.convertirFecha(fecha)
      let dialog = {
        type: 'postReserva',
        fecha: fechaData,
        turno: turno,
        acept: async ()=>{
          const data = {
            "date": fecha,
            "shift": `${turno}`,
            "dateBooking":dateBooking,
            "room":{
              "id": this.$route.params.id
            },
            "userEntity": {
              "id": this.user.id
            }
          }
          dialog = {}
          this.$store.dispatch('setDialog',dialog)
          util.cargarLoader("Agregando reserva")
          await postMethods.addBooking(data)
          this.datos.events = []
          await this.completarCalendario()
          util.cargarLoader("")
        },
        cancel: ()=> {
          dialog = {}
          this.$store.dispatch('setDialog',dialog)
        }
      }
      this.$store.dispatch('setDialog',dialog)
    },
    convertirFecha(apiDate) {
      const meses = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ]
      const dia = apiDate.toString().slice(6, 8)
      const mes = meses.indexOf(apiDate.slice(3, 6)) + 1
      const anio = apiDate.toString().slice(8, 12)

      const fechaFormateada = `${anio}-${mes.toString().padStart(2, '0')}-${dia.padStart(2, '0')}`
      return fechaFormateada
    },
    async completarCalendario(){
      const reservas = await getMethod.getBookings()
      const reservasSala = reservas.filter(res=>res.room.id == this.$route.params.id)
      reservasSala.forEach(res => {
        let{shift, date , userEntity} = res
        let { name, lastname } = userEntity
        const fechaFormateada = this.convertirFecha(date)
        const turno = shift
        const turnoDate = new Date(`2000-01-01 ${turno}`)
        turnoDate.setHours(turnoDate.getHours() + 1)
        const turno2 = turnoDate.toLocaleTimeString('en-US', { hour12:false, hour: '2-digit', minute: '2-digit' })

        this.datos.events.push(
          {
            start: `${fechaFormateada} ${turno}`,
            end: `${fechaFormateada} ${turno2}`,
            title: 'RESERVADO de ',
            resizable: false,
            class: "reservado",
            content: ` por ${lastname}, ${name} - click para eliminar -`,
            background: true
          },
        )
      })
    },
    async onEventClick(e){
      const reservas = await getMethod.getBookings()
      const turno = e.start.toString().slice(16, 18).replace(/\s+/g, '').concat(":00")
      const fecha = e.start.toString().slice(0, 16).replace(/\s+/g, '')
      const result = reservas.filter(res=> res.shift == turno && res.date == fecha)
      const fechaData = this.convertirFecha(fecha)
      let dialog = {
        type: 'deleteReserva',
        fecha: fechaData,
        turno: result[0].shift,
        room: result[0].room.name,
        acept: async ()=>{
          dialog = {}
          this.$store.dispatch('setDialog',dialog)
          util.cargarLoader("Eliminando reserva")
          await deleteMethods.deleteBooking(result[0].id)
          this.datos.events = []
          await this.completarCalendario()
          util.cargarLoader("")
        },
        cancel: ()=> {
          dialog = {}
          this.$store.dispatch('setDialog',dialog)
        }
      }
      this.$store.dispatch('setDialog',dialog)
    }
  }
};
</script>

<style scoped lang="scss">

  .mainContainer{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;
    height: auto;
    padding: 25px;
    h1{
      color: #0d7277;
    }
    .contenedor{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: auto;
      .calendarios{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: auto;
        margin: 20px;
      }
      .cal1Cont{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 25%;
      }
      .cal2Cont {
        max-width: 800px;
        .cal2 {
          border: 4px solid #0d7277;
          width: 75%;
          .vuecal__header{
            background-color: red;
          }
          .vuecal__flex, .vuecal__menu{
            background-color: red;
          }
        }
      }
      .fecha{
        padding: 20px;
      }
      .cal1{
        height: 400px;
        border: 4px solid #15b4bc;
      }
    }
  }


  .vuecal__event {
    background-color: rgba(173, 216, 230, 0.5);
    box-sizing: border-box;
    padding: 5px;
    
    &__reservado {
      background-color: red;
    }
  }
  @media only screen and (max-width:480px ){
    .contenedor {
      flex-direction: column;

      .calendarios {
        margin: 10px;       }

      .cal1Cont, .cal2Cont {
        width: 100%;
      }

      .cal2Cont {
        .cal2 {
          width: 95vw;
          margin-left: 10vw;
        }
      }
    }
    .cal1 {
      width: 90vw;
      margin-left: 10vw;
        }

  }


</style>
