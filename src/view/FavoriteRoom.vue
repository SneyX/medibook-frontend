<template>
  <div class="contenedor">
    <h2>PANEL DE  FAVORITOS</h2>
    <div class="mainTable">
      <div class="salaCont">
        <p>Favoritas</p>
      </div>
    </div>
    <div class="mainTable">
      <div class="info">
        <p class="id">id</p>
        <p class="name">Nombre</p>
      </div>
      <div class="action">
        <p>Acciones</p>
      </div>
    </div>
    <div class="salaInfo">
      <AdminFav :cards="cards" @update-favs="updateFavs" />
    </div>
  </div>
</template>

<script>
import util from "@/utils/utils"
import AdminFav from "@/components/AdminFav"

export default {
  name: "FavoriteRoom",
  emits: ['update-favs'],
  components: {
    AdminFav,
  },
  computed: {
    theme() {
      return this.$store.getters.getTheme;
    },
  },
  data() {
    return {
      cards: [],
      display: true,
    };
  },
  async created() {
    await this.generarCards()
  },
  methods: {
    async generarCards() {
      util.cargarLoader("Cargando salas...")
      this.cards = await this.$store.getters?.getUserRooms || []
      util.cargarLoader("")
    },
    async updateFavs(updatedRooms) {
      this.cards = updatedRooms;
    },
  },
}
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
  .mainTable{
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border: 2px solid black;
    border-radius: 15px;
    margin: 10px 0;
  }
  .info{
    width: 35%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
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
  }
  .action{
    width: 35%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .categoryCont, .salaCont{
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .info {
    width: 35%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .salaInfo {
    width: 100%;
  }
</style>
