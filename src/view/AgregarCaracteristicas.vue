<template>
  <div :class="[theme, 'contenedor']">
    <div class="login-container">
      <h2>AGREGAR CARACTERÍSTICA</h2>
      <div class="cerrar" @click="goBack">&lt;</div>
      <form ref="caracteristicasForm" @submit.prevent="submitForm">
        
        <label for="nombre">NOMBRE*</label>
        <input ref="nombre" type="text" id="nombre" />
        
        <label for="icono">ÍCONO*</label>
        <IconList @update-icon="handleUpdateIcon" v-if="display" />
        <div class="actualizar" v-if="!display" @click="update">
          <DinamicIcon :iconName="iconName"  @click="update" class="icono"/>
          <p>CAMBIAR?</p>
        </div>
        <input ref="icono" type="text" id="icono" />

        <button type="submit">AGREGAR CARACTERÍSTICA</button>

      </form>
    </div>
  </div>
</template>

<script>
import postMethods from '@/service/postMethod'
import util from '@/utils/utils'
import IconList from '@/components/IconList.vue'
import DinamicIcon from '@/components/DinamicIcon.vue'

export default {
  name: 'AgregarCaracteristicas',
  emits: ['update-icon'],
  components:{
    IconList,
    DinamicIcon,
  },
  computed: {
    theme() {
      return this.$store.getters.getTheme;
    }
  },
  data() {
    return {
      options: [],
      display: true,
      iconName: ""
    };
  },
  methods: {
    async submitForm(){
      util.cargarLoader("agregando característica")
      if (this.$refs.nombre.value.replace(/\s/g, '').length < 4) {
        util.cargarPopUp("Ingrese el nombre", "Faltan datos..")
        util.cargarLoader("")
        return
      }
      if (this.$refs.icono.value.replace(/\s/g, '').length < 1) {
        util.cargarPopUp("Ingrese el ícono", "Faltan datos..")
        util.cargarLoader("")
        return
      }
      const data = {
        name: this.$refs.nombre.value,
        urlicon: this.$refs.icono.value
      }
      const res = await postMethods.addCaracteristica(data)
      if (res) {
        this.$refs.caracteristicasForm.reset()
        this.update()
        util.cargarPopUp("Característica agregada con éxito", "Gracias!")
        util.cargarLoader("")
      } else {
        this.$refs.caracteristicasForm.reset()
        this.update()
        util.cargarPopUp("Ha ocurrido un error en el servidor", "Disculpas!")
        util.cargarLoader("")
      }
    },
    goBack() {
      this.$router.go(-1)
    },
    handleUpdateIcon(nombre){
      this.display = false
      this.$refs.icono.value = nombre
      this.iconName = nombre
    },
    update(){
      this.display = true
      this.$refs.icono.value = ""
    }
  },
  mounted(){
  }
}
</script>
<style scoped lang="scss">
.contenedor {
  background-color: #15b4bc;
  color: var(--text);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 100%;
  min-height: calc(100vh - 300px);
  .login-container {
    width: 50%;
    padding: 20px;
    border: 1px solid var(--border);
    border-radius: 8px;
    background-color: var(--oscuro);
    margin-bottom: 130px;
    .cerrar{
      display: flex;
      align-items: center;
      justify-content: center;
      color: #15b4bc;
      border: 3px #15b4bc solid;
      background-color: var(--oscuro);
      font-size: 30px;
      font-weight: bold;
      width: 45px;
      height: 45px;
      border-radius: 50%;
      cursor: pointer;
    }
    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 10px;
      label {
        margin-bottom: 8px;
      }
      input {
        padding: 8px;
        margin-bottom: 16px;
      }
      .actualizar{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .icono{
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 5px;
          border: 1px solid #0d7277;
          border-radius: 50%;
          background-color: #99DCDD;
          cursor: pointer;
        }
        .icono:hover{
          border: 1px solid #99DCDD;
          background-color: #0d7277;
        }
        p{
          cursor: pointer;
          padding: 10px;
        }
      }
      #icono{
        display: none;
      }
      button {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #07d0db;
        width: auto;
        color: var(--text);
        padding: 20px;
        margin-top: 10px;
        border: none;
        border-radius: 10px;
        cursor: pointer;
        transition: .5s ease-in-out;
      }
      button:hover{
        background-color: #069fa7;
        transition: .5s ease-in-out;
      }
    }
  }
}

</style>
