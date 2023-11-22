<template>
  <div :class="[theme, 'card']">
    <div class="card-container">
      <div class="headerContainer">
        <h2>DETALLE DE SALA - {{ card?.name }}</h2>
        <div class="cerrar" @click="goBack">&lt;</div>
      </div>
      <div class="mainContainer">
        <div class="mainImage" v-if="card?.images && card.images.length > 0">
          <img :src="card?.images[0]?.path" :alt="card?.images[0]?.alt" @click="cargarSlider">
        </div>
        <div class="secondaryImages">
          <img v-for="(image, index) in card?.images?.slice(1, 5)" :key="index" :src="image.path" :alt="image.alt" @click="cargarSlider">
        </div>
      </div>
      <div class="verMas">
        <p @click="cargarSlider">ver más</p>
      </div>
      <div class="footerCont">
        <p><strong>TIPO DE SALA: </strong>{{ card?.typeroom?.name }}</p>
        <div class="descripcion">
          <strong>DESCRIPCIÓN:</strong>
          <p>{{ card?.description }}</p>
        </div>
      </div>
    </div>
  </div>
  <DataDialog />
</template>

<script>
import util from '@/utils/utils'
import getMethod from '@/service/getMethod'
import DataDialog from '@/components/DataDialog.vue';

export default {
  name: 'CardDetail',
  components:{
    DataDialog,
  },
  computed: {
    theme() {
      return this.$store.getters.getTheme;
    },
    favorite() {
      const fav = this.$store.getters?.getUserRooms || []
      const ids = fav.map(room => room.id)
      return ids
    },
  },
  data(){
    return {
      card:[]
    }
  },
  async created() {
			await this.loadCard();
		},
  methods:{
    async loadCard() {
      util.cargarLoader("Buscando sala...")
      const data = {
        id: this.$route.params.id,
        isId: true
      };
      const resultado = await getMethod.getRoom(data)
      this.card = resultado
      util.cargarLoader("")
    },
    goBack() {
      this.$router.go(-1);
    },
    cargarSlider(){
      let dialog = {
        type: 'slider',
        imgs: this.card.images,
        cancel: () => {
          dialog = {}
          this.$store.dispatch('setDialog', dialog)
        },
      }
      this.$store.dispatch('setDialog', dialog)
    }
  },
};
</script>

<style scoped>
  .card{
    width: 100%;
  }
  .card-container{
    width: 100%;
    height: auto;
    padding: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .headerContainer{
    width: 85%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 20px;
    color: #605B5B;
  }
  .cerrar{
    display: flex;
    align-items: center;
    justify-content: center;
    color: #605B5B;
    border: 3px #605B5B solid;
    background-color: #cbcaca;
    font-size: 30px;
    font-weight: bold;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    cursor: pointer;
    margin-right: 40px;
  }
  p{
    color: black;
  }
  .mainContainer {
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 0;
  }
  .mainImage{
    position: relative;
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
  .secondaryImages{
    position: relative;
    width: 50%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
    cursor: pointer;
  }
  .mainImage img {
    width: 90%;
    height: 31vw;
    max-width: 100%;
    border-radius: 8px;
    object-fit: cover;
  }
  .secondaryImages img {
    width: 45%;
    height: 15vw;
    object-fit: cover;
    max-width: 100%;
    border-radius: 8px;
    margin-bottom: 8px;
  }
  .footerCont{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 80%;
  }
  .descripcion{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .descripcion p{
    width: 85%;
    padding-left: 5px;
    text-align: left;
  }
  .verMas{
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 78%;
  }
  .verMas p {
    padding: 5px;
    cursor: pointer;
    border-radius: 15px;
    transition: .5s ease-in-out;
  }
  .verMas p:hover {
    background-color: #0f8389;
    color: #99DCDD;
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

    .mainContainer {
      flex-direction: column;
    }
    .mainImage{
      width: 100%;
    }

    .mainImage img {
      width: 97%;
      margin: 0px;
    }

    .secondaryImages{
      width: 100%;
    }
    .secondaryImages img {
      width: 46%;
      height: 20vw;
      margin: 3px;
    }
    .footerCont{
      width: 100%;
    }
  }
</style>
