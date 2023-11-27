<template>
  <section :class="theme">
    <h3>CATEGORÍAS</h3>
    <div class="contCard">
      <CardCategoria :resultados="resultados" />
    </div>
  </section>
</template>

<script>
import CardCategoria from './CardCategoria.vue'
import getMethod from '@/service/getMethod'
// import util from '@/utils/utils'

export default {
  name: 'CategoriaSala',
  components: {
    CardCategoria
  },
  props:{
  },
  data() {
    return {
      resultados: [],
    };
  },
  computed: {
    theme() {
      return this.$store.getters.getTheme
    },
    storeTypeRooms(){
      return this.$store.getters?.getTypeRooms || []
    }
  },
  async mounted() {
    await this.generarCategorias()
  },
  methods: {
    async generarCategorias() {
      if (this.storeTypeRooms.length < 1) {
        this.resultados = await getMethod.getTypeRooms()
        this.$store.dispatch('setTypeRooms',this.resultados)
      } else {
        this.resultados = this.storeTypeRooms
      }
    },
  },

}
</script>

<style scoped>
section{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 4px solid var(--border);
  padding: 10px;
  background-color: white;
  width:100%;
}
h3{
  align-self: flex-start;
  font-size: 2vw;
  color: var(--text2);
  margin-left: 50px;
}
.contCard{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
  @media only screen and (max-width:480px ){
    h3{
    font-size: 4.5vw;
    margin-left:-70% ;
  }
}
</style>
