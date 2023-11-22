<template>
  <div class="mainTable" v-for="card in cards" :key="card.id">
    <div class="info">
      <p class="id">{{ card.id }}</p>
      <p class="name">{{ card.name }}</p>
    </div>
    <div class="action">
      <router-link :to="{ name: 'card-detail', params: { id: card.id } }">
        <p>Detalles</p>
      </router-link>
      <div class="corazon" @click="handleFavorite(card)" v-if="cargando[card.id] !== false">Eliminar de favoritos</div>
    </div>
  </div>
</template>

<script>

import putMethod from '@/service/putMethod'
import { reactive  } from 'vue'
import util from '@/utils/utils'

export default {
  name:'AdminFav',
  emits: ['update-favs'],
  components: {
  },
  props:{
    cards:{
      type:Array,
      default:()=>[],
    }
  },
  computed: {
    theme() {
      return this.$store.getters.getTheme
    },
  },
  data() {
    return {
      cardId:null,
      cargando: reactive({}),
    };
  },
  methods:{
    async handleFavorite(sala){
      const user = this.$store.getters.getUser?.id || null
      if (user) {
        util.cargarLoader("eliminando de favoritos")
        const res = await putMethod.updateFavorite(sala, user)
        this.$store.dispatch('setUserRooms',res.rooms)
        this.$emit('update-favs', res.rooms)
        util.cargarLoader("")
      }
    }
  }
}
</script>
<style scoped>
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
    border: 1px solid black;
    border-radius: 15px;
  }
  .action{
    width: 35%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .action p{
    cursor: pointer;
    padding: 10px 20px;
    border-radius: 15px;
    transition: .5s ease-in-out;
  }
  .action p:hover{
    background-color: #0f8389;
    color: #99DCDD;
  }
  .corazon{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40%;
    height: 100%;
    border-radius: 15px;
    transition: background-color .5s ease-in-out;
    cursor: pointer;
  }
  .corazon:hover{
    background-color: #0f8389;
    color: #99DCDD;
  }
</style>