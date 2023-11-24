<template>
  <div :class="[theme, 'contenedor']">
    <div class="login-container">
      <h2>MODIFICAR SALA</h2>
      <form ref="modifyForm" @submit.prevent="submitForm">
        
        <label for="nombre">NOMBRE*</label>
        <input ref="nombre" type="text" id="nombre" v-model="localCard.name" />

        <label for="category">CATEGORÍA*</label>
        <select ref="category" name="category" id="category" v-model="localCard.category">
          <option v-for="category in options" :key="category.id" :value="category.name">{{category.name}}</option>
        </select>

        <label>CARACTERÍSTICAS*</label>
        <div class="caractCont">
          <div class="carac" v-for="caracteristica in options2" :key="caracteristica.id" @click=agregar(caracteristica)>
            <DinamicIcon :iconName="caracteristica?.urlicon" class="icono"/>
            <p>{{ caracteristica.name }}</p>
          </div>
        </div>

        <label>AGREGADAS*</label>
        <div class="caractCont">
          <div class="carac" v-for="caracteristica in caracteristicas" :key="caracteristica.id" @click=quitar(caracteristica)>
            <DinamicIcon :iconName="caracteristica?.urlicon" class="icono"/>
            <p>{{ caracteristica.name }}</p>
            <p class="cerrar">x</p>
          </div>
        </div>

        <label for="description">DESCRIPCIÓN SALA*</label>
        <textarea ref="description" id="description" v-model="localCard.description" maxlength="100" rows="4" cols="50"></textarea>

        <!-- <label for="images">IMÁGENES*</label>
        <input ref="images" type="file" accept="image/png, image/jpeg" id="images" multiple @change="handleImageChange" /> -->

        <button type="submit">MODIFICAR SALA</button>
      </form>
    </div>
  </div>
</template>

<script>
import putMethod from '@/service/putMethod'
import getMethod from '@/service/getMethod'
import util from '@/utils/utils'
import DinamicIcon from '@/components/DinamicIcon.vue'

export default {
  name: 'CardModify',
  computed: {
    theme() {
      return this.$store.getters.getTheme;
    }
  },
  components:{
    DinamicIcon,
  },
  props: {
  },
  data() {
    return {
      imageFiles: [],
      urls: [],
      options: [],
      card: [],
      options2: [],
      caracteristicas: [],
      localCard: {
        name: '',
        category: '',
        description: ''
      }
    };
  },
  methods: {
    handleImageChange(event) {
      const selectedFiles = Array.from(event.target.files).slice(0, 5);
      this.imageFiles = selectedFiles;
    },
    agregar(car){
      this.caracteristicas.push(car)
      const idx = this.options2.indexOf(car)
      console.log(idx);
      this.options2.splice(idx,1)
    },
    quitar(car){
      this.options2.push(car)
      const idx = this.caracteristicas.indexOf(car)
      console.log(idx);
      this.caracteristicas.splice(idx,1)
    },
    async submitForm() {

      if (this.localCard.name.length < 3) {
        util.cargarPopUp("Ingrese el nombre", "Faltan datos..")
        return
      }
      if (this.localCard.description.length < 1) {
        util.cargarPopUp("Ingrese la descripción de la sala", "Faltan datos..")
        return
      }
      if (!this.localCard.category) {
        util.cargarPopUp("Ingrese la categoría de la sala", "Faltan datos..")
        return
      }

      // INICIO DE AGREGAR SALA -------------------------

      util.cargarLoader("Modificando sala...")
      
      let id;
      this.options.forEach(opt=>{
        if(opt.name == this.localCard.category){
          id = opt.id
          return
        }
      })
      const datos= {
        id: this.card.id,
        description: this.localCard.description,
        characteristics: this.caracteristicas,
        favourite: false,
        name:this.localCard.name,
        typeroom:{
          id: id
        },
        images: this.card.images
      }
      const res = await putMethod.updateRoom(datos)
      if (res) {
        util.cargarLoader("")
        this.$refs.modifyForm.reset()
        this.$store.dispatch('setRooms', [])
        this.$router.go(-1);
        util.cargarPopUp("Sala modificada con éxito", "Gracias!")
      }else {
        util.cargarLoader("")
        this.$refs.modifyForm.reset()
        util.cargarPopUp("Ha ocurrido un error en el servido", "Lo sentimos!")
      }
    },
    async init(){
      util.cargarLoader("Cargando datos...")
      this.options = await getMethod.getTypeRooms()
      this.options2 = await getMethod.getCaracteristicas()
      const data = {
        id:parseInt(this.$router.currentRoute.value.params.id, 10),
        isId: true
      }
      this.card = await getMethod.getRoom(data)
      this.caracteristicas = this.card.characteristics
      
      this.caracteristicas.forEach(car=>{
        const idx = this.options2.findIndex(option => 
          option.id === car.id
        )
        this.options2.splice(idx,1)
      })

      this.localCard = {
        name: this.card.name,
        category: this.card.typeroom.name,
        characteristics: this.card.characteristics,
        description: this.card.description
      }
      util.cargarLoader("")
    }
  },
  async mounted(){
    await this.init()
  }
}
</script>

<style scoped lang="scss">
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
