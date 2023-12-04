<template>
  <div :class="[theme, 'card']">
    <div class="card-container">
      <div class="headerContainer">
        <h2>DETALLE DE SALA - {{ card?.name }}</h2>
        <router-link class="name" :to="{ name: 'admin-reserva', params: { id: routeId } }">
          <p class="infoDet">Reservar</p>
        </router-link>
        <div class="cerrar" @click="goBack">&lt;</div>
      </div>
      <div class="mainContainer">
        <div class="mainImage" v-if="card?.images && card.images.length > 0">
          <img :src="card?.images[0]?.path" :alt="card?.images[0]?.alt" @click="cargarSlider">
        </div>
        <div class="secondaryImages">
          <img v-for="(image, index) in card?.images?.slice(1, 5)" :key="index" :src="image?.path" :alt="image?.alt" @click="cargarSlider">
        </div>
      </div>
      <div class="verMas">
        <p @click="cargarSlider">ver más</p>
      </div>

      <div class="compartir">
        <h2>Compartir</h2>
        <ShareButton  :text="shareText" :url="currentUrl"></ShareButton>
      </div>

      <div class="footerCont">
        <p><strong>TIPO DE SALA: </strong>{{ card?.typeroom?.name }}</p>
        <div class="descripcion">
          <strong>DESCRIPCIÓN:</strong>
          <p>{{ card?.description }}</p>
        </div>
        <strong>CARACTERÍSITCAS:</strong>
        <div class="mainTable" v-if="card?.characteristics?.length > 0">
          <div class="caracteristica" v-for="caracteristica in card?.characteristics" :key="caracteristica?.id">
            <div class="name">
              <div class="nameIcon">
                <DinamicIcon :iconName="caracteristica?.urlicon" @iconClick="handleIconClick" class="icono"/>
                {{ caracteristica?.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <DataDialog />
</template>

<script>
import util from '@/utils/utils'
import getMethod from '@/service/getMethod'
import DataDialog from '@/components/DataDialog.vue'
import DinamicIcon from '@/components/DinamicIcon'
import ShareButton from '@/components/ShareButton.vue'

export default {
  name: 'CardDetail',
  components:{
    DataDialog,
    DinamicIcon,
    ShareButton,
  },
  computed: {
    theme() {
      return this.$store.getters.getTheme
    },
    favorite() {
      const fav = this.$store.getters?.getUserRooms || []
      const ids = fav.map(room => room.id)
      return ids
    },
    currentUrl() {
      return "http://1023c04-grupo4.s3-website.us-east-2.amazonaws.com/"
    },
    routeId(){
      return this.$route.params.id
    },
  },
  data(){
    return {
      card:[],
      shareText: 'Reserva tu sala en Medibook!',
    }
  },
  async created() {
			await this.loadCard()
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
      this.$router.go(-1)
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

<style scoped lang="scss">

  .mainTable{
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    margin: 10px 0;
    .caracteristica{
      height: 50px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: flex-start;
      margin: 10px 0;
      .name{
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 10px;
        .nameIcon{
          display: flex;
          align-items: center;
          justify-content: flex-start;
          min-width: 40%;
          padding: 10px;
        }
        .icono{
          display: flex;
          width: 35px;
          height: 35px;
          align-items: center;
          justify-content: center;
          border: 1px solid #0d7277;
          border-radius: 50%;
          background-color: #99DCDD;
          margin-right: 10px;
        }
      }
    }
  }
  strong{
    padding: 10px;
  }
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
    color: #15b4bc;
    border: 3px #15b4bc solid;
    background-color: #99dcdd;
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

  .infoDet{
    padding: 10px;
    background-color: #0f8389;
    border: 1px solid #0f8389;
    color: white;
    border-radius: 15px;
    transition: .5s ease-in-out;
  }
  .infoDet:hover{
    background-color: white;
    color: #0f8389;
  }
  @media only screen and (max-width:480px ){
    .headerContainer{
      width: 100%;
      padding: 0px 2px;
      font-size: 12px;
    }
    .cerrar{
      border: 2px #15b4bc solid;
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
    .mainTable {
    display: block;
    margin: 10px;
  }

  .caracteristica {
    margin-bottom: 10px;
  }

  .name {
    font-size: 16px;
  }

  .nameIcon {
    display: flex;
    align-items: center;
  }

  .icono {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }
  .compartir h2{
    font-size: 5vw;
    margin-left: -160px;
    margin-bottom: 20px;
  }
  }
</style>
