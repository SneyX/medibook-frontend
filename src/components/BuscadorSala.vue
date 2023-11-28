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
    <h3>RESULTADOS DE BÚSQUEDA</h3>
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
      return this.$store.getters.getTheme;
    },
    storeRooms(){
      return this.$store.getters?.getRooms || []
    },
  },
  data() {
    return {
      resultados: [],
      filtros: [],
      filtrosAplicados: []
    }
  },
  methods: {
    async buscar(){
      this.resultados = []
      util.cargarLoader("Buscando salas...")
      const busqueda = this.$refs.search.value.trim().toLowerCase()
      if (this.filtrosAplicados.length < 1 && busqueda.length < 1 ) {
        util.cargarPopUp("no se encontraron coincidencias", "RESULTADO")
        util.cargarLoader("")
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
          util.cargarPopUp("no se encontraron coincidencias", "RESULTADO")
          util.cargarLoader("")
          this.$refs.search.value = ""
          return
        }
      }
      if (this.filtrosAplicados.length >= 1 && busqueda.length < 1 ) {
        this.resultados = datos.filter(room => this.filtrosAplicados.includes(room.typeroom.name))
        if (this.resultados.length < 1) {
          util.cargarPopUp("no se encontraron coincidencias", "RESULTADO")
          util.cargarLoader("")
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
        if (this.resultados.length < 1) {
          this.resultados = datos.filter(room => this.filtrosAplicados.includes(room.typeroom.name))
          util.cargarPopUp("no se encontraron coincidencias", "RESULTADO")
          util.cargarLoader("")
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
          acept: async (filtro) =>{
            dialog = {}
            this.$store.dispatch('setDialog',dialog)
            this.filtrosAplicados.push(filtro)
            await this.buscar()
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
          acept: async (filtro) =>{
            dialog = {}
            this.$store.dispatch('setDialog',dialog)
            this.filtrosAplicados.push(filtro)
            await this.buscar()
          }
        }
        util.cargarLoader("")
        this.$store.dispatch('setDialog',dialog)
      }
    },
    async quitarFiltro(filtro){
      const idx = this.filtrosAplicados.indexOf(filtro)
      this.filtrosAplicados.splice(idx,1)
      if (this.filtrosAplicados.length >= 1) {
        await this.buscar()
      } else {
        this.resultados = []
      }
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
