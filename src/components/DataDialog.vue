<template>
  <div v-if="dialog.type == 'delete'" class="contenedor">
    <div class="textCont">
      <div class="texto">
        <p>{{ dialog.texto }}</p>
        <div class="categoryCont">
          <p><span>ID:</span> {{ dialog.id }}</p>
          <p><span>NOMBRE:</span> {{ dialog.name }}</p>
          <p><span>DESCRIPCIÓN:</span> {{ dialog.description }}</p>
        </div>
      </div>
      <div class="btnCont">
        <div class="Btn" @click="dialog.acept">ACEPTAR</div>
        <div class="Btn" @click="dialog.cancel">CANCELAR</div>
      </div>
    </div>
  </div>
  <div v-if="dialog.type == 'recategorize'" class="contenedor">
    <div class="textCont">
      <div class="texto">
        <p>{{ dialog.texto }}</p> 
      </div>
      <select name="type" id="type" v-model="selected">
        <option v-for="category in dialog.categorys" :key="category.id" :value="category.id">{{ category.name }}</option>
      </select>
      <div class="btnCont">
        <div class="Btn" @click="recategorizeCard">ACEPTAR</div>
        <div class="Btn" @click="dialog.cancel">CANCELAR</div>
      </div>
    </div>
  </div>
  <div v-if="dialog.type == 'rol'" class="contenedor">
    <div class="textCont">
      <div class="texto">
        <p>{{ dialog.texto }}</p> 
      </div>
      <select name="type" id="type" v-model="selected">
        <option value="ADMIN">ADMIN</option>
        <option value="USER">USER</option>
      </select>
      <div class="btnCont">
        <div class="Btn" @click="recategorizeRol">ACEPTAR</div>
        <div class="Btn" @click="dialog.cancel">CANCELAR</div>
      </div>
    </div>
  </div>
  <div v-if="dialog.type == 'filter'" class="contenedor">
    <div class="filterCont">
      <div class="cerrar" @click="close()">x</div>
      <select name="filter" id="filter" @change="onFilterChange($event)">
        <option value="seleccionar filtro">seleccionar filtro</option>
        <option v-for="filtro in filtros" :value="filtro.name" :key="filtro.id" >{{filtro.name}}</option>
      </select>
    </div>
  </div>
  <div v-if="dialog.type == 'slider'" class="contenedor" id="slider">
    <Swiper
      class="Swiper"
      :slides-per-view="3"
      :space-between="10"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <div class="Btn" @click="dialog.cancel">CANCELAR</div>
      <swiper-slide v-for="img in dialog.imgs" :key="img?.id" :class="[theme, 'card']" >
        <img :key="img?.id" :src="img?.path" alt="sala">
      </swiper-slide>
    </Swiper>
  </div>
</template>

<script>
  import { Swiper, SwiperSlide } from 'swiper/vue'
  import 'swiper/css'

  export default {
    name:"DataDialog",
    props: {
    },
    components:{
      Swiper,
      SwiperSlide,
    },
    emits: ["update-type", "update-rol"],
    computed: {
      dialog() {
        return this.$store.getters.getDialog
      },
      filtros() {
        return this.dialog.filtros || [];
      },
    },
    data() {
      return {
        selected: null,
      };
    },
    methods:{
      recategorizeCard() {
        this.$emit('update-type', this.selected)
      },
      recategorizeRol() {
        this.$emit('update-rol', this.selected)
      },
      onFilterChange(event) {
        const selectedFilter = event.target.value
        this.dialog.acept(selectedFilter)
        this.$store.dispatch('setDialog', {})
      },
      close(){
        this.$store.dispatch('setDialog', {})
      }
    },
  }
</script>

<style scoped lang="scss">
  .contenedor{
    z-index: 2;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.7);
    .filterCont{
      position: relative;
      left: 50%;
      top: 50%;
      transform: translate(-75%, -25%);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      width: 25%;
      height: 25%;
      background-color: #99DCDD;
      border: 2px solid #0f8389;
      .cerrar{
        position: absolute;
        display: flex;
        align-self: flex-end;
        padding: 15px 20px;
        background-color: #15b4bc;
        border: 1px solid #0f8389;
        color: #daecec;
        outline-offset: 0;
        font-weight: bold;
        border-radius: 50%;
        margin-right: 10px;
        top: 10px;
        cursor: pointer;
        justify-content: center; /* Center horizontally */
        align-items: center;
      }
      #filter{
        padding: 10px;
        border: 2px solid #0f8389;
        background-color: #15b4bc;
        cursor: pointer;
        color: #daecec;
      }
    }
    .swiper{
      width: 90vw;
      height: auto;
      margin: 0;
      position: relative;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      img{
        width: 100%;
        height: 25vw;
        border-radius: 15px;
      }
    }
    
  }
  .textCont{
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 50%;
    height: 50%;
    border: 1px solid aqua;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .texto{
    width: 80%;
    text-align: right;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: aqua;
  }
  .categoryCont{
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 20px;
    p{
      display: flex;
      align-items: center;
      justify-content: flex-start;
      width: 100%;
      border: 1px solid aqua;
      margin: 1px;
      border-radius: 5px;
    }
    span{
      width: 30%;
      display: flex;
      align-items: center;
      justify-content: flex-start;
    }
  }
  .btnCont{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
  .Btn{
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3%;
    border: 3px solid #0f8389;
    color: #0f8389;
    cursor: pointer;
    margin-top: 10px;
    padding: 10px 50px;
    font-weight: bold;
    width: 50%;
    margin-left: 25%;
  }
  .Btn:hover {
    background-color: #99DCDD;
  }
  @media only screen and (max-width:480px ){
    #slider .swiper{
        img {
          width: 108%;
          height: 30vw;
        }
    }
    .contenedor{
      .filterCont{
        left: 65%;
        width: 60%;
        height: 50%;
      }
      .cerrar{
        height: 10vw;
        width: 10vw;
        font-size: 5vw;
        align-self: center;
      }
      #filter{
      margin-top: -60%;
      }
    }

}

</style>