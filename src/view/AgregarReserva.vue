<template>
  <div class="mainContainer">
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
        >
        </vue-cal>
      </div>
    </div>
  </div>
</template>

<script>
import VueCal from '/node_modules/vue-cal/dist/vue-cal.cjs.js'
import 'vue-cal/dist/vuecal.css'

const datos = {
  events: []
}

export default {
  name: 'AgregarReserva',
  components: { VueCal },
  data() {
    return {
      datos,
      fechaSeleccionada: new Date(),
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
  created() {
    const lunes = this.previousFirstDayOfWeek.format()
    console.log(lunes)
    /* const martes = this.previousFirstDayOfWeek.addDays(1).format()
    const miercoles = this.previousFirstDayOfWeek.addDays(2).format()
    const jueves = this.previousFirstDayOfWeek.addDays(3).format()
    const viernes = this.previousFirstDayOfWeek.addDays(4).format() 
    {
      "date": fecha,
      "shift": `${turno}`,
      "room":{
        "id": 27
      },
      "userEntity": {
        "id": 2
      }
    }
    */
    this.datos.events.push(
      {
        start: `${lunes} 09:00`,
        end: `${lunes} 10:00`,
        title: 'Turno 1',
        content: '',
        resizable: false,
      },
    )
  },
  methods:{
    reservarTurno(e){
      const fecha = e.toString().slice(0, 16).replace(/\s+/g, '')
      const turno = e.toString().slice(16, 18).replace(/\s+/g, '').concat(":00")
      const turnoDate = new Date(`2000-01-01 ${turno}`)
      turnoDate.setHours(turnoDate.getHours() + 1)
      const turno2 = turnoDate.toLocaleTimeString('en-US', { hour12:false, hour: '2-digit', minute: '2-digit' })

      const data = {
        "date": fecha,
        "shift": `${turno}`,
        "room":{
          "id": this.$route.params.id
        },
        "userEntity": {
          "id": this.user.id
        }
      }
      console.log(data)
      this.datos.events.push(
        {
          start: `${e.format()} ${turno}`,
          end: `${e.format()} ${turno2}`,
          title: 'Turno 1',
          content: '',
          resizable: false,
        },
      )
    }
  }
};
</script>

<style scoped lang="scss">

  .mainContainer{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90%;
    height: auto;
    padding: 25px;
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
          border: 4px solid red;
          width: 75%;
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
      }
    }
  }

</style>
