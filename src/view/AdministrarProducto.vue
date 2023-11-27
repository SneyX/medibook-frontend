<template>
  <div class="contenedor" v-if="!isMobile">
    <h2>PANEL DE ADMINISTRACIÓN</h2>
    <div class="mainTable">
      <div class="salaCont">
        <p :class="{ back : displaysala }" @click="displayHandler('sala')">salas</p>
      </div>
      <div class="categoryCont">
        <p :class="{ back : displaycategory }" @click="displayHandler('category')">categorías</p>
      </div>
      <div class="categoryCont">
        <p :class="{ back : displaycar }" @click="displayHandler('car')">características</p>
      </div>
    </div>
    <div class="mainTable" v-if="!displaycar && !displaycategory">
      <div class="info">
        <p class="id">id</p>
        <p class="name">Nombre</p>
      </div>
      <div class="action">
        <p>Acciones</p>
      </div>
    </div>
    <div class="salaInfo" v-if="displaysala">
      <AdminCard :cards="cards" @update-cards="updateCards" />
    </div>
    <div class="salaInfo" v-if="displaycategory">
      <AdminType :cards="cards" @update-cards="updateCards" />
    </div>
    <div class="salaInfo" v-if="displaycar">
      <AdminCaracteristicas :cards="cards" @update-cards="updateCards" />
    </div>
  </div>
  <div v-if="isMobile">
    <h1>INGRESE DESDE UN ORDENADOR</h1>
    <p>Esta vista no está habilidatada para dispositivos móviles</p>
  </div>
</template>

<script>
import getMethod from "@/service/getMethod"
import util from "@/utils/utils"
import AdminCard from "@/components/AdminCard"
import AdminType from '@/components/AdminType'
import AdminCaracteristicas from '@/components/AdminCaracteristicas.vue'

export default {
  name: "AdministrarProducto",
  components: {
    AdminCard,
    AdminType,
    AdminCaracteristicas,
  },
  computed: {
    theme() {
      return this.$store.getters.getTheme;
    },
    storeRooms(){
      return this.$store.getters?.getRooms || []
    },
    storeTypeRooms(){
      return this.$store.getters?.getTypeRooms || []
    },
    storeCaracteristicas(){
      return this.$store.getters?.getCaracteristicas || []
    },
  },
  data() {
    return {
      cards: [],
      displaysala: true,
      displaycategory: false,
      displaycar: false,
      isMobile: false
    };
  },
  async created() {
    this.checkIsMobile()
    if (!this.isMobile) {
      await this.generarCards()
    }
  },
  methods: {
    async generarCards() {
      util.cargarLoader("Cargando salas...")
      this.cards = this.storeRooms.length < 1 ? await getMethod.getRooms() : this.storeRooms
      if (this.storeRooms.length < 1) {
        this.$store.dispatch('setRooms', this.cards)
      }
      util.cargarLoader("");
    },
    async generarCards2() {
      util.cargarLoader("Cargando categorías...")
      this.cards = this.storeTypeRooms.length < 1 ? await getMethod.getTypeRooms() : this.storeTypeRooms
      if (this.storeTypeRooms.length < 1) {
        this.$store.dispatch('setTypeRooms', this.cards)
      }
      util.cargarLoader("");
    },
    async generarCards3() {
      util.cargarLoader("Cargando características...")
      this.cards = this.storeCaracteristicas.length < 1 ? await getMethod.getCaracteristicas() : this.storeCaracteristicas
      if (this.storeCaracteristicas.length < 1) {
        this.$store.dispatch('setCaracteristicas', this.cards)
      }
      util.cargarLoader("");
    },
    async updateCards(updatedRooms) {
      this.cards = updatedRooms
    },
    async displayHandler(value){
      switch (value) {
        case 'sala':
          await this.generarCards()
          this.displaysala= true
          this.displaycategory= false
          this.displaycar= false
        break;
        case 'category':
          await this.generarCards2()
          this.displaysala= false
          this.displaycategory= true
          this.displaycar= false
        break;
        case 'car':
          await this.generarCards3()
          this.displaysala= false
          this.displaycategory= false
          this.displaycar= true
        break;
      }
    },
    checkIsMobile() {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera
      if (
          /android/i.test(userAgent) ||
          (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) ||
          (navigator.userAgent.indexOf("IEMobile") !== -1) ||
          (window.matchMedia && window.matchMedia("(pointer:coarse)").matches)
        ) { this.isMobile = true } else { this.isMobile = false }
    },
  },
};
</script>
<style scoped>
  .contenedor {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 50px;
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
    width: 35%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .id {
    width: 30%;
  }
  .name {
    width: 70%;
  }
  .action {
    width: 65%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .salaInfo {
    width: 100%;
  }
</style>
