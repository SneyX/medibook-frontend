<template>
  <div :class="[theme, 'contenedor']">
    <div class="login-container">
      <div class="cerrar goBack" @click="goBack">&lt;</div>
      <h2>AGREGAR CATEGORÍA</h2>
      <form ref="loginForm" @submit.prevent="submitForm">
        
        <label for="nombre">NOMBRE*</label>
        <input ref="nombre" type="text" id="nombre" :value="nombre" />

        <label for="description">DESCRIPCIÓN*</label>
        <textarea ref="description" id="description" :value="description" maxlength="100" rows="4" cols="50"></textarea>

        <label for="images">IMÁGENES*</label>
        <input ref="images" type="file" accept="image/png, image/jpeg" id="images" multiple @change="handleImageChange" />

        <button type="submit">AGREGAR</button>
      </form>
    </div>
  </div>
</template>

<script>
import postMethods from '@/service/postMethod';
import getMethod from '@/service/getMethod';
import util from '@/utils/utils';

export default {
  name: 'AgregarCategoria',
  computed: {
    theme() {
      return this.$store.getters.getTheme;
    }
  },
  data() {
    return {
      imageFiles: [],
      urls: [],
      options: []
    };
  },
  methods: {
    handleImageChange(event) {
      const selectedFiles = Array.from(event.target.files)
      if (selectedFiles.length != 1) {
        util.cargarPopUp("Seleccione 1 imagen", "Faltan datos..")
        this.imageFiles = []
        return
      }
      this.imageFiles = selectedFiles
    },
    goBack() {
      this.$router.go(-1)
    },
    async submitForm() {

      if (this.imageFiles.length != 1) {
        util.cargarPopUp("Seleccione 1 sola imagen", "Faltan datos..")
        return
      }
      if (this.$refs.nombre.value.replace(/\s/g, '').length < 4) {
        util.cargarPopUp("Ingrese el nombre", "Faltan datos..")
        return
      }
      if (this.$refs.description.value.replace(/\s/g, '').length < 10) {
        util.cargarPopUp("Ingrese el descripción de la sala", "Faltan datos..")
        return
      }

      const categoryResult = await getMethod.getTypeRooms()
      let aux = false
      if (categoryResult) {
        categoryResult.forEach(category => {
          if (category.name == this.$refs.nombre.value) {
            aux = true
            return
          }
        });
      }
      if (aux) {
        util.cargarPopUp("Ya exite una categoría con ese nombre", "Error..")
        aux=false
        return
      }

      util.cargarLoader("agregando sala...")

      const category = {
        name: this.$refs.nombre.value,
        description: this.$refs.description.value
      }

      const res = await postMethods.addTypeRoom(category)
      if (res) {
        this.$store.dispatch('setTypeRooms',[])
        const categorys = await getMethod.getTypeRooms()
        const idx = categorys.length -1
        const id = categorys[idx].id
        const formData = new FormData()
        formData.set("path", this.imageFiles[0])
        formData.set("typeroom_id",id)
        await postMethods.addImgTyperoom(formData)
        util.cargarLoader("")
        this.$refs.loginForm.reset()
        util.cargarPopUp("Categoría agregada con éxito", "Gracias!")
      }
    },
  }
}
</script>

<style scoped>
  .contenedor {
    background-color: #15b4bc;
    color: var(--text);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  .contenedor:hover{
    background-color: #15b4bc;
  }

  .login-container {
    padding: 20px;
    border: 1px solid var(--border);
    border-radius: 8px;
    background-color: var(--oscuro);
  }
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
  .goBack{
    position: relative;
    left: 0;
    top: 0;
  }

  form {
    display: flex;
    flex-direction: column;
    padding: 10px;
  }

  label {
    margin-bottom: 8px;
  }

  select{
    padding: 10px;
  }

  input {
    padding: 8px;
    margin-bottom: 16px;
  }

  button {
    background-color: #15b4bc;
    color: var(--text);
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: .5s ease-in-out;
    margin-top: 15px;
  }
  button:hover{
    background-color: #0f8389;
    transition: .5s ease-in-out;
  }
</style>
