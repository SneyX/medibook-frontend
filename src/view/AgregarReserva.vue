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

      <div class="calendarios cal2Cont" style="max-width: 800px">
        <vue-cal
          locale="es"
          class="cal2"
          :disable-views="['years', 'year', 'month','week']"
          :selected-date="fechaSeleccionada"
          :time-from="8 * 60"
          :time-to="22 * 60"
          sticky-split-labels
          :events="datos.events"
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
};

export default {
  name: 'AgregarReserva',
  components: { VueCal },
  data() {
    return {
      datos,
      fechaSeleccionada: new Date(),
    };
  },

  computed: {
    previousFirstDayOfWeek() {
      return new Date(new Date().setDate(new Date().getDate() - (new Date().getDay() + 6) % 7))
    },
  },

  created() {

    const lunes = this.previousFirstDayOfWeek.format()
    /* const martes = this.previousFirstDayOfWeek.addDays(1).format()
    const miercoles = this.previousFirstDayOfWeek.addDays(2).format()
    const jueves = this.previousFirstDayOfWeek.addDays(3).format()
    const viernes = this.previousFirstDayOfWeek.addDays(4).format() */

    this.datos.events.push(
      {
        start: `${lunes} 9:00`,
        end: `${lunes} 10:00`,
        title: 'Turno 1',
        content: '',
        resizable: false,
      },
    );
  },
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
      .fecha{
        padding: 20px;
      }
      .cal1{
        height: 400px;
      }
      .cal2{
        width: 75%;
      }
    }
  }

</style>
