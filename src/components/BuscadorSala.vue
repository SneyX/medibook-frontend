<template>
  <nav :class="theme">
    <h1>BUSCA LA SALA</h1>
    <div class="buscadorContainer">
      <label for="filter">
        <input class="filter" type="button" ref="filter" id="filter" value="FILTRAR" @click="filtrar">
      </label>
      <label for="search" class="search">
        <input ref="search" id="search" type="text" placeholder="TIPO DE SALA">
      </label>
      <div class="btnContainer">
        <BotonPrincipal class="btnBusc" texto="BUSCAR" size="19" @click="buscar" />
      </div>
    </div>
  </nav>
  <div class="filtrosAplicados" v-if="filtrosAplicados.length > 0">
    <p>Filtros: </p>
    <p v-for="filtro in filtrosAplicados" :key="filtro">{{ filtro }} <span @click="quitarFiltro(filtro)">x</span></p>
  </div>
  <section :class="theme"  id="resultados" v-if="resultados?.length > 0">
    <h3>RESULTADOS DE BÚSQUEDA: {{ resultados.length > 1 ? `${resultados.length} salas disponibles` : "1 sala disponible"}}</h3>
    <div class="contCard">
      <CardSala :resultados="resultados" />
    </div>
  </section>
  <DataDialog />
</template>

<script>
import BotonPrincipal from './BotonPrincipal.vue'
import CardSala from './CardSala.vue'
import getMethod from '@/service/getMethod'
import util from '../utils/utils'
import DataDialog from './DataDialog.vue'

export default {
  name: 'BuscadorSala',
  components:{
    BotonPrincipal,
    CardSala,
    DataDialog,
  },
  computed: {
    theme() {
      return this.$store.getters.getTheme
    },
    storeRooms(){
      return this.$store.getters?.getRooms || []
    },
  },
  data() {
    return {
      resultados: [],
      filtros: [],
      filtrosAplicados: [],
      filtroFecha: [],
      disponibilidadPorFechaTurnoSala: {},
    }
  },
  methods: {
    async buscar(){
      this.resultados = []
      util.cargarLoader("Buscando salas...")
      const busqueda = this.$refs.search.value.trim().toLowerCase()
      if (this.filtrosAplicados.length < 1 && busqueda.length < 1 ) {
        util.cargarLoader("")
        util.cargarPopUp("no se encontraron coincidencias", "RESULTADO")
        return
      }
      const datos = this.storeRooms.length < 1 ? await getMethod.getRooms() : this.storeRooms
      if (this.filtrosAplicados.length < 1 && busqueda.length >= 1 ) {
        this.resultados = datos.filter(sala => {  
          let {name, description} = sala
          return name.trim().toLowerCase().includes(busqueda) ||
          description.trim().toLowerCase().includes(busqueda) 
        })
        if (this.resultados.length < 1) {
          util.cargarLoader("")
          util.cargarPopUp("no se encontraron coincidencias", "RESULTADO")
          this.$refs.search.value = ""
          return
        }
      }
      if (this.filtrosAplicados.length >= 1 && busqueda.length < 1 ) {
        this.resultados = datos.filter(room => this.filtrosAplicados.includes(room.typeroom.name))
        if (this.filtroFecha.length > 0) {
          const fechaSeleccionada = this.filtroFecha[0]
          if (this.resultados.length > 0) {
            this.resultados = this.resultados.filter( sala => {
              const turnosDisponibles = Object.keys(this.disponibilidadPorFechaTurnoSala[fechaSeleccionada])
              return turnosDisponibles.some( turno => this.disponibilidadPorFechaTurnoSala[fechaSeleccionada][turno][sala.id])
            })
          } else {
            this.resultados = datos.filter( sala => {
              const turnosDisponibles = Object.keys(this.disponibilidadPorFechaTurnoSala[fechaSeleccionada])
              return turnosDisponibles.some( turno => this.disponibilidadPorFechaTurnoSala[fechaSeleccionada][turno][sala.id])
            })
          }
        }
        if (this.resultados.length < 1) {
          util.cargarLoader("")
          util.cargarPopUp("no se encontraron coincidencias", "RESULTADO")
          this.$refs.search.value = ""
          return
        }
      }
      if (this.filtrosAplicados.length >= 1 && busqueda.length >= 1 ) {
        this.resultados = datos.filter(room => this.filtrosAplicados.includes(room.typeroom.name))
        this.resultados = this.resultados.filter(sala => {  
          let {name, description} = sala
          return name.trim().toLowerCase().includes(busqueda) ||
          description.trim().toLowerCase().includes(busqueda) 
        })
        if (this.filtroFecha.length > 0) {
          const fechaSeleccionada = this.filtroFecha[0]
          if (this.resultados.length > 0) {
            this.resultados = this.resultados.filter( sala => {
              const turnosDisponibles = Object.keys(this.disponibilidadPorFechaTurnoSala[fechaSeleccionada])
              return turnosDisponibles.some( turno => this.disponibilidadPorFechaTurnoSala[fechaSeleccionada][turno][sala.id])
            })
          } else {
            this.resultados = datos.filter( sala => {
              const turnosDisponibles = Object.keys(this.disponibilidadPorFechaTurnoSala[fechaSeleccionada])
              return turnosDisponibles.some( turno => this.disponibilidadPorFechaTurnoSala[fechaSeleccionada][turno][sala.id])
            })
          }
        }
        if (this.resultados.length < 1) {
          this.resultados = datos.filter(room => this.filtrosAplicados.includes(room.typeroom.name))
          util.cargarLoader("")
          util.cargarPopUp("no se encontraron coincidencias", "RESULTADO")
          this.$refs.search.value = ""
          return
        }
      }
      util.cargarLoader("")
    },
    async filtrar(){
      util.cargarLoader("Cargando filtros...")
      let filtrosStored = this.$store.getters.getFiltros
      if (filtrosStored.length < 1) {
        this.filtros = await getMethod.getTypeRooms()
        this.$store.dispatch('setFiltros', this.filtros)
        if (this.filtrosAplicados.length > 0) {
          this.filtros = this.filtros.filter(filtro => !this.filtrosAplicados.includes(filtro.name))
        }
        let dialog = {
          type: 'filter',
          filtros: this.filtros,
          acept: async (filtro, isFecha) =>{
            util.cargarLoader("Buscando salas...")
            if (!isFecha) {
              this.filtrosAplicados.push(filtro)
              util.cargarLoader("")
              await this.buscar()
            } else {
              if (this.filtroFecha.length > 0) {
                const fecha = this.formatearFecha(this.filtroFecha[0])
                this.quitarFiltro(fecha)
              }
              this.filtroFecha.push(filtro)
              await this.actualizarDisponibilidadPorFecha(filtro)
              const filtroFormat = this.formatearFecha(filtro)
              this.filtrosAplicados.push(filtroFormat)
              util.cargarLoader("")
              await this.buscar()
            }
          }
        }
        util.cargarLoader("")
        this.$store.dispatch('setDialog',dialog)
      } else {
        if (this.filtrosAplicados.length > 0) {
          filtrosStored = filtrosStored.filter(filtro => !this.filtrosAplicados.includes(filtro.name))
        }
        let dialog = {
          type: 'filter',
          filtros: filtrosStored,
          acept: async (filtro, isFecha) =>{
            util.cargarLoader("Buscando salas...")
            if (!isFecha) {
              this.filtrosAplicados.push(filtro)
              util.cargarLoader("")
              await this.buscar()
            } else {
              if (this.filtroFecha.length > 0) {
                const fecha = this.formatearFecha(this.filtroFecha[0])
                this.quitarFiltro(fecha)
              }
              this.filtroFecha.push(filtro)
              await this.actualizarDisponibilidadPorFecha(filtro)
              const filtroFormat = this.formatearFecha(filtro)
              this.filtrosAplicados.push(filtroFormat)
              util.cargarLoader("")
              await this.buscar()
            }
          }
        }
        util.cargarLoader("")
        this.$store.dispatch('setDialog',dialog)
      }
    },
    async quitarFiltro(filtro){
      const idx = this.filtrosAplicados.indexOf(filtro)
      this.filtrosAplicados.splice(idx,1)
      if (filtro.includes("-")) {
        const fechaSinFiltro = this.quitarFormato(filtro)
        const idx = this.filtroFecha.indexOf(fechaSinFiltro)
        this.filtroFecha.splice(idx,1)
        delete this.disponibilidadPorFechaTurnoSala[fechaSinFiltro]
      }
      if (this.filtrosAplicados.length >= 1) {
        await this.buscar()
      } else {
        this.resultados = []
      }
    },
    quitarFormato(filtro){
      const meses = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ]

      const dia = filtro.slice(0, 2)
      const mesNum = parseInt(filtro.slice(3, 5), 10) - 1
      const mes = meses[mesNum]
      const anio = filtro.slice(6, 10)

      const fechaSinFormato = new Date(anio, mesNum, dia)
      const diasSemana = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      const diaSemana = diasSemana[fechaSinFormato.getDay()]

      const fechaFinal = `${diaSemana}${mes}${dia}${anio}`

      return fechaFinal
    },
    formatearFecha(filtro){
      const meses = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ]
      const dia = filtro.toString().slice(6, 8)
      const mes = meses.indexOf(filtro.slice(3, 6)) + 1
      const anio = filtro.toString().slice(8, 12)
      const fechaFormateada = `${dia.padStart(2, '0')}-${mes.toString().padStart(2, '0')}-${anio}`
      return fechaFormateada
    },
    async actualizarDisponibilidadPorFecha(fechaSeleccionada) {
      if (!this.disponibilidadPorFechaTurnoSala[fechaSeleccionada]) {
        this.disponibilidadPorFechaTurnoSala[fechaSeleccionada] = {}
        const turnosDisponibles = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00"]
        const salasDisponibles = this.storeRooms.length < 1 ? await getMethod.getRooms() : this.storeRooms

        turnosDisponibles.forEach(turno => {
          this.disponibilidadPorFechaTurnoSala[fechaSeleccionada][turno] = {}
          salasDisponibles.forEach(room => {
            this.disponibilidadPorFechaTurnoSala[fechaSeleccionada][turno][room.id] = true
          })
        })
      }

      const bookings = await getMethod.getBookings()
      const resp = bookings.filter(booking => this.filtroFecha.includes(booking.date))
      const reservasEnFecha = resp.filter(reserva => reserva.date === fechaSeleccionada)

      reservasEnFecha.forEach(reserva => {
        const turnoReservado = reserva.shift
        const salaReservada = reserva.room.id

        this.disponibilidadPorFechaTurnoSala[fechaSeleccionada][turnoReservado][salaReservada] = false
      })
    },
    
  },
}
</script>

<style scoped lang="scss">
  nav{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2vw;
    background-color: var(--background2);
    width:100%;
    height: auto;
    h1{
      color: var(--text2);
    }
    .buscadorContainer{
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: auto;
      label, input{
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 1vw;
        outline: none;
        border: 1px solid var(--border);
        color: var(--oscuro);
        height: 100%;
        border-radius: 20px;
        text-align: center;
      }
      #filter{
        width: 8vw;
        cursor: pointer;
      }
      .search{
        width: 50%;
        #search{
          width: 100%;
        }
      }
      .btnContainer{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 12vw;
        .btnBusc{
          border-radius: 20px;
          font-size: 1vw;
          height: 2.8vw ;
        }
      }
    }
  }
  .filtrosAplicados{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    p{
      padding: 1vw;
      border: 1px solid #0f8389;
      color: #0d7277;
      height: 100%;
      border-radius: 20px;
      text-align: center;
      span{
        cursor: pointer;
        padding: .3vw .8vw;
        border: 1px solid #0f8389;
        border-radius: 50%;
        background-color: #99DCDD;
        color: #0d7277;
      }
    }
  }
  section{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    width:100%;
    h3{
      align-self: flex-start;
      font-size: 2vw;
      color: #605B5B;
      margin-left: 50px;
    }
    .contCard{
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  @media only screen and (max-width:480px ){
    h1{
      font-size: 13px;
      margin-top: -5px;
    }
    label, input {
      padding: 0.3vw;
      margin-top: 0vw;
      margin-right: 2vw;
      font-size: 2vw;
    }
    .btnContainer{
      margin-top: 0vw;
      margin-left: -3vw;
    }
    .btnBusc{
      width: 100px;
      height: 4vw !important;
      font-size: 2vw !important;
    }
    nav {
      height: 14vw;
    }
    .filter{
      font-size: 1.5vw;
    }
  }
</style>
