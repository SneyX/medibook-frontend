<template>
  <div :class="[theme, 'card']">
    hola
    <!-- <div class="card-container">
      <div class="headerContainer">
        <h2>CARACTERÍSTICAS:</h2>
        <div class="cerrar" @click="goBack">&lt;</div>
      </div>
      <div class="footerCont">
        <div class="descripcion" v-for="car in card" :key="car.id">
          <p>id: {{ car.id }}</p>
          <DinamicIcon :iconName="car?.urlicon"  @iconClick="handleIconClick" />
          <strong>{{ car?.name }}</strong>
        </div>
      </div>
    </div> -->
  </div>
  <DataDialog />
</template>

<script>
import util from '@/utils/utils'
import getMethod from '@/service/getMethod'
import DataDialog from '@/components/DataDialog.vue'
// import DinamicIcon from '@/components/DinamicIcon.vue';

export default {
  name: 'AdministrarCaracteristicas',
  components:{
    DataDialog,
    // DinamicIcon,
  },
  computed: {
    theme() {
      return this.$store.getters.getTheme;
    },
  },
  data(){
    return {
      card:[]
    }
  },
  async created() {
    await this.loadCard()
  },
  methods:{
    async loadCard() {
      util.cargarLoader("Buscando características...")
      const data = {
        id: this.$route.params.id,
        isId: true
      };
      const resultado = await getMethod.getRoom(data)
      console.log(resultado)
      this.card = resultado
      console.log(this.card)
      util.cargarLoader("")
    },
    goBack() {
      this.$router.go(-1);
    },
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
    .footerCont{
      width: 100%;
    }
  }
</style>
