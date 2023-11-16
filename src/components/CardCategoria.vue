<template>
  <div class="contenedor-cat">
    <Swiper
      :slides-per-view="3"
      :space-between="10"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide v-for="sala in resultados" :key="sala?.id" :class="[theme, 'card']" >
        <router-link :to="{ name: 'card-category', params: { id: sala?.name } }">
          <img :key="sala?.id" :src="sala?.image?.path" :alt="sala?.image">
          <div :class="[theme, 'info']">
            <h2>{{ sala.name }}</h2>
              <p class="infoDet">Detalles</p>
            </div>
          </router-link>
      </swiper-slide>
    </Swiper>
    <div class="btnCont">
      <button @click="goToFirstSlide">|&lt;</button>
      <button @click="goToPrevSlide">&lt;</button>
      <p>{{ currentIndex + 1 }} / {{ resultados.length }}</p>
      <button @click="goToNextSlide">&gt;</button>
      <button @click="goToLastSlide(resultados)">&gt;|</button>
    </div>
  </div>
</template>
<script>
  import { Swiper, SwiperSlide } from 'swiper/vue'
  import { ref } from 'vue'
  import 'swiper/css'

  export default {
    name:'CardCategoria',
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
        return this.$store.getters.getTheme;
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
      }
      const goToPrevSlide = () => {
        if (swiperRef.value) {
          swiperRef.value.slidePrev()
        }
      }
      const goToNextSlide = () => {
        if (swiperRef.value) {
          swiperRef.value.slideNext()
        }
      }
      const goToFirstSlide = () => {
        if (swiperRef.value) {
          swiperRef.value.slideTo(0);
        }
      }
      const goToLastSlide = resultados => {
        if (swiperRef.value) {
          swiperRef.value.slideTo(resultados.length - 1);
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
  .contenedor-cat{
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
    
  }
  </style>
  