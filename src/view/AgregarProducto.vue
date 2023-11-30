<template>
  <div :class="[theme, 'contenedor']">
    <div class="login-container">
      <div class="cerrar goBack" @click="goBack">&lt;</div>
      <h2>AGREGAR SALA</h2>
      <form ref="loginForm" @submit.prevent="submitForm">
        <label for="nombre">NOMBRE*</label>
        <input ref="nombre" type="text" id="nombre" />

        <label for="category">CATEGORÍA*</label>
        <select ref="category" name="category" id="category">
          <option v-for="category in options" :key="category?.id" :value=category?.name>{{category?.name}}</option>
        </select>
        
        <label>CARACTERÍSTICAS*</label>
        <div class="caractCont">
          <div class="carac" v-for="caracteristica in options2" :key="caracteristica?.id" @click=agregar(caracteristica)>
            <DinamicIcon :iconName="caracteristica?.urlicon" class="icono"/>
            <p>{{ caracteristica?.name }}</p>
          </div>
        </div>

        <label>AGREGADAS*</label>
        <div class="caractCont">
          <div class="carac" v-for="caracteristica in caracteristicas" :key="caracteristica?.id" @click=quitar(caracteristica)>
            <DinamicIcon :iconName="caracteristica?.urlicon" class="icono"/>
            <p>{{ caracteristica?.name }}</p>
            <p class="cerrar">x</p>
          </div>
        </div>

        <label for="description">DESCRIPCIÓN SALA*</label>
        <textarea ref="description" id="description" maxlength="100" rows="4" cols="50"></textarea>

        <label for="images">IMÁGENES*</label>
        <input ref="images" type="file" accept="image/png, image/jpeg" id="images" multiple @change="handleImageChange" />

        <button type="submit">AGREGAR SALA</button>
      </form>
    </div>
  </div>
</template>

<script>
import postMethods from '@/service/postMethod'
import getMethod from '@/service/getMethod'
import util from '@/utils/utils'
import DinamicIcon from '@/components/DinamicIcon.vue'

export default {
  name: 'AgregarProducto',
  computed: {
    theme() {
      return this.$store.getters.getTheme
    }
  },
  components:{
    DinamicIcon,
  },
  data() {
    return {
      imageFiles: [],
      urls: [],
      options: [],
      options2: [],
      caracteristicas: [],
    };
  },
  methods: {
    handleImageChange(event) {
      const selectedFiles = Array.from(event.target.files)
      if (selectedFiles.length > 5) {
        util.cargarPopUp("Seleccione sólo 5 imágenes", "Imágenes..")
        this.imageFiles = []
        event.target.value = ""
        return
      } else if (selectedFiles.length < 5) {
        util.cargarPopUp("Seleccione 5 imágenes", "Imágenes..")
        this.imageFiles = []
        event.target.value = ""
        return
      }
      this.imageFiles = selectedFiles
    },
    agregar(car){
      this.caracteristicas.push(car)
      const idx = this.options2.indexOf(car)
      this.options2.splice(idx,1)
    },
    quitar(car){
      this.options2.push(car)
      const idx = this.caracteristicas.indexOf(car)
      this.caracteristicas.splice(idx,1)
    },
    async submitForm() {

      if (this.imageFiles.length > 5) {
        util.cargarPopUp("Seleccione sólo 5 imágenes", "Imágenes..")
        this.imageFiles = []
        return
      } else if (this.imageFiles.length < 5) {
        util.cargarPopUp("Seleccione 5 imágenes", "Imágenes..")
        this.imageFiles = []
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
      if (!this.$refs.category.value) {
        util.cargarPopUp("Ingrese la categoría de la sala", "Faltan datos..")
        return
      }

      let aux = false
      const storeRooms = this.$store.getters.getRooms
      if (storeRooms.length < 1) {
        const roomsResult = await getMethod.getRooms()
        if (roomsResult) {
          roomsResult.forEach(room => {
            if (room.name == this.$refs.nombre.value) {
              aux = true
              return
            }
          })
        }
      } else {
        storeRooms.forEach(room => {
          if (room.name == this.$refs.nombre.value) {
            aux = true
            return
          }
        })
      }
      if (aux) {
        util.cargarPopUp("Ya exite una sala con ese nombre", "Error..")
        aux=false
        return
      }

      // INICIO DE AGREGAR SALA -------------------------

      util.cargarLoader("Agregando sala...")
      
      let id;
      this.options.forEach(opt=>{
        if(opt.name == this.$refs.category.value){
          id = opt.id
          return
        }
      })
      const caracteristicas = this.caracteristicas.map(car=> {
        return {id: car.id}
      })
      const datos= {
        description: this.$refs.description.value,
        characteristics: caracteristicas,
        favourite: false,
        name:this.$refs.nombre.value,
        typeroom:{
          id: id
        }
      }

      if (id) {
        await postMethods.addRoom(datos)
        this.$store.dispatch('setRooms', [])
        const rooms = await getMethod.getRooms()
        const idx = rooms.length -1
        const id = rooms[idx].id
        
        const formData = new FormData()
        this.imageFiles.forEach( async (img)=>{
          formData.set("path", img)
          formData.set("room_id", id)
          await postMethods.addImg(formData)
        })

        util.cargarLoader("")
        this.$refs.loginForm.reset()
        util.cargarPopUp("Sala agregada con éxito", "Gracias!")
      } else {
        util.cargarLoader("")
        this.$refs.loginForm.reset()
        util.cargarPopUp("Ha ocurrido un error en el servido", "Lo sentimos!")
      }
      
    },
    async init(){
      util.cargarLoader("Cargando datos...")
      this.options = await getMethod.getTypeRooms()
      this.options2 = await getMethod.getCaracteristicas()
      util.cargarLoader("")
    },
    goBack() {
      this.$router.go(-1)
    },
  },
  mounted(){
    this.init()
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
  padding-top: 50px;
  .goBack{
    position: relative;
    left: 0;
    top: 0;
    background-color: var(--oscuro);
  }
}

.login-container {
  padding: 20px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background-color: var(--oscuro);
  margin-bottom: 130px;
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
  margin-right: 40px;
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
}
button:hover{
  background-color: #0f8389;
  transition: .5s ease-in-out;
}

@media only screen and (max-width:480px ){
  .contenedor {
    margin-top:-20%;
  }
  .login-container {
    height: 75%;
    width: 75%;
    margin-bottom: -100px;
  }
}

.caractCont{
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: white;
  padding: 15px;
  .carac{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    border: 1px solid #0d7277;
    border-radius: 10px;
    background-color: #99DCDD;
    width: auto;
    height: auto;
    cursor: pointer;
    transition: 0.3s ease-in-out;
    .icono{
      display: flex;
      align-items: center;
      justify-content: center;
      width: auto;
      height: auto;
      padding: 5px;
    }
    p{
      font-size: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 5px;
      color: black;
    }
    .cerrar{
      padding: 1px 5px ;
      border: 1px solid #0d7277;
      border-radius: 10px;
    }
  }
  .carac:hover{
    box-shadow: 0px 0px 5px 5px #99dcdd;
  }
}

</style>
