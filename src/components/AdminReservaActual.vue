<template>
  <div class="mainTable" v-for="card in cards" :key="card?.id">
    <div class="info">
      <p class="id">{{ card?.id }}</p>
      <p class="name">{{ card?.room?.name }}</p>
      <p class="reserva">{{ reserva[cards?.indexOf(card)] }}</p>
      <p class="fecha">{{ fecha[cards?.indexOf(card)] }}</p>
    </div>
    <div class="action">
      <p @click="deleteCard(card)">Eliminar reserva</p>
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
  name:'AdminReservaActual',
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
  computed: {
    theme() {
      return this.$store.getters.getTheme;
    },
    user(){
      return this.$store.getters?.getUser
    },
  },
  data() {
    return {
      fecha: [],
      reserva: [],
    }
  },
  mounted() {
    this.formatearFecha()
  },
  methods:{
    async deleteCard(card) {
      if (this.user) {
        let dialog = {
          type: 'delete',
          texto: 'Está seguro que desea eliminar la reserva de esta sala?',
          id: card.id,
          name: card.room.name,
          description: card.room.description,
          acept: async () =>{
            dialog = {}
            this.$store.dispatch('setDialog',dialog)
            util.cargarLoader("Eliminando reserva")
            await deleteMethods.deleteBooking(card.id)
            const updatedRooms = await getMethod.getUserBooking(this.user.id)
            this.$store.dispatch('setReserva', [])
            this.$store.dispatch('setReserva', updatedRooms)
            this.$emit('update-cards', updatedRooms, 'actual')
            util.cargarLoader("")
          },
          cancel: ()=> {
            dialog = {}
            this.$store.dispatch('setDialog',dialog)
          }
        }
        this.$store.dispatch('setDialog',dialog)
      } else {
        util.cargarPopUp("Por favor, vuelva a iniciar sesión","Permiso denegado")
      }
    },
    formatearFecha(){
      const diasEn = [
        'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
      ]
      const diasSp = [
        'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
      ]
      const mesesEn = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ]
      const mesesSp = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'
      ]
      this.fecha = this.cards.map(res => {

        const { date, shift } = res
        const turno = shift
        const turnoDate = new Date(`2000-01-01 ${turno}`)
        turnoDate.setHours(turnoDate.getHours() + 1)
        const turno2 = turnoDate.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })

        const dia = diasSp[diasEn.indexOf(date.slice(0, 3))]
        const diaFecha = date.slice(6, 8)
        const mes = mesesSp[mesesEn.indexOf(date.slice(3, 6))]
        const anio = date.slice(8, 12)
        const fechaFormateada = `${dia} ${diaFecha} de ${mes} del ${anio} de ${turno} a ${turno2}`
        return fechaFormateada
      })
      this.reserva = this.cards.map(res => {
        const { dateBooking } = res
        const dia = diasSp[diasEn.indexOf(dateBooking.slice(0, 3))]
        const diaFecha = dateBooking.slice(6, 8)
        const mes = mesesSp[mesesEn.indexOf(dateBooking.slice(3, 6))]
        const anio = dateBooking.slice(8, 12)
        const fechaFormateada = `${dia} ${diaFecha} de ${mes} del ${anio}`
        return fechaFormateada
      })
    }
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
      width: 65%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .id{
        width: 10%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .name{
        width: 25%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .reserva{
        width: 25%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .fecha{
        width: 40%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
  .action{
    width: 35%;
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