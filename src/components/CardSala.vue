<template>
  <div class="contenedor-salas">
    <Swiper
      :slides-per-view="3"
      :space-between="10"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide v-for="sala in resultados" :key="sala?.id" :class="[theme, 'card']" >
        <img :key="sala.images[0].id" :src="sala.images[0].path" :alt="sala.images[0].name">
        <div :class="[theme, 'info']">
          <h2>{{ sala.name }}</h2>
          <div class="favorito" :class="[favorite.includes(sala.id) ? 'lleno' : 'vacio', 'corazon']" @click="handleFavorite(sala)">&#10084;</div>
          <h2>{{ sala.typeroom.name }}</h2>
          <router-link :to="{ name: 'card-detail', params: { id: sala.id } }">
            <p class="infoDet">Detalles</p>
          </router-link>
        </div>
      </swiper-slide>
    </Swiper>
    <div class="btnCont">
      <button @click="goToFirstSlide">|&lt;</button>
      <button @click="goToPrevSlide">&lt;</button>
      <p>{{ Math.floor(currentIndex / 3) + 1 }} / {{ Math.ceil(resultados.length / 3) }}</p>
      <button @click="goToNextSlide(resultados)">&gt;</button>
      <button @click="goToLastSlide(resultados)">&gt;|</button>
    </div>
  </div>
</template>
<script>
  import { Swiper, SwiperSlide } from 'swiper/vue'
  import { ref } from 'vue'
  import 'swiper/css'
  import putMethod from '@/service/putMethod'
import util from '@/utils/utils'

  export default {
    name:'CardSala',
    components:{
      Swiper,
      SwiperSlide,
    },
    props:{
      resultados:{
        type:Array,
        default:()=>[]
      }
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
    },
    methods: {
      async handleFavorite(sala){
        const user = this.$store.getters.getUser?.id || null
        if (user) {
          util.cargarLoader('Agregando a favoritos')
          const res = await putMethod.updateFavorite(sala, user)
          this.$store.dispatch('setUserRooms',res.rooms)
          util.cargarLoader('')
        } else {
          console.log("no");
        }
      }
    },
    setup() {
      const swiperRef = ref(null)
      const currentIndex = ref(0)

      const onSwiper = (swiper) => {
      swiperRef.value = swiper
      }
      const onSlideChange = () => {
        currentIndex.value = swiperRef.value.activeIndex;
        if (currentIndex.value - 3 != swiperRef.value.activeIndex) {
          currentIndex.value++
        }
      }
      const goToPrevSlide = () => {
        if (swiperRef.value) {
          const currentPage = Math.floor(currentIndex.value / 3)
          const targetPage = currentPage > 0 ? currentPage - 1 : 0
          swiperRef.value.slideTo(targetPage * 3)
        }
      }
      const goToNextSlide = (resultados) => {
        if (swiperRef.value) {
          const totalPages = Math.ceil(resultados.length / 3)
          const currentPage = Math.floor(currentIndex.value / 3)
          const targetPage = currentPage < totalPages - 1 ? currentPage + 1 : totalPages - 1
          swiperRef.value.slideTo(targetPage * 3)
        }
      }
      const goToFirstSlide = () => {
        if (swiperRef.value) {
          swiperRef.value.slideTo(0);
        }
      }
      const goToLastSlide = resultados => {
        if (swiperRef.value) {
          swiperRef.value.slideTo(resultados.length - 1)
        }
      }
      return {
        onSwiper,
        onSlideChange,
        goToPrevSlide,
        goToNextSlide,
        goToFirstSlide,
        goToLastSlide,
        currentIndex,
      }
    },
    
  }
  </script>
  
  <style scoped>
    .contenedor-salas{
    display: flex;
    flex-direction: column;
    align-items: center; 
    text-align: center; 
    width: 98vw;
  }
  .swiper{
    width: 1000px;
    height: auto;
    margin: 0;
  }
  img{
    width: 300px;
    height: 250px;
    border-radius: 15px;
  }
  .info p {
    color: var(--text2);
    text-decoration: underline;
  } 
  .info h2{
    text-transform: capitalize;
    color: var(--text2);
  }
  .btnCont{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 98vw;
    margin-top: 20px;
  }
  .btnCont button{
    padding: 10px;
  }
  .btnCont p{
    padding: 5px 10px;
    color: black;
    border: 1px solid black;
    margin: 0 10px;
  }
  @media only screen and (max-width:480px ){ 
    .swiper{
    width: 360px;
  }
  img{
    width: 100px;
    height: 90px;
  }
  .info p {
    font-size: 2vw;
  } 
  .info h2{
        font-size: 3vw;
  }
  .btnCont{
    margin-top: 10px;
    height: 30px;
  }
  .btnCont button{
    padding: 0px 0px 1px 0px;
    height: 18px;
    width: 20px;
    font-size: 3vw;
  }
  .btnCont p{
    padding: 1px 5px;
    margin: 0 5px;
    height: 20px;
    width: 35px;
    font-size: 3vw;
  }
  }
  .lleno{
    color: red;
    font-size: 24px;
  }
  .vacio{
    color: rgb(40, 40, 40);
    font-size: 24px;
  }
  .corazon{
    margin: 0;
    padding: 1px 5px;
    width: 40px;
    cursor: pointer;
    border-radius: 50%;
    background-color: rgba(120, 120, 120, 0.550);
    border: 2px solid rgb(25, 25, 25);
    position: absolute;
    top: 200px;
    right: 20px;
  }
  </style>
  