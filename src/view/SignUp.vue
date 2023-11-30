<template>
  <div :class="[theme, 'contenedor']">
    <div class="signup-container">
      <h2>Registrarse</h2>

      <form @submit.prevent="submitForm">
        <label for="name">Nombre:</label>
        <input type="text" id="name" v-model="name" placeholder="Entre 3 y 20 Letras"/>
        <label for="lastName">Apellido:</label>
        <input type="text" id="lastName" v-model="lastName" placeholder="Entre 3 y 20 Letras"/>
        <label for="username">Correo Electrónico:</label>
        <input type="text" id="username" v-model="username" placeholder="En formato xxxx@xxx.xxx"/>
        <label for="password">Contraseña:</label>
        <input type="password" id="password" v-model="password" placeholder="8-20: May, Min, !@#$%^&*()_+."/>
        <button type="submit" :class="[acceptTerms ? '' : 'off']">Registrarse</button>
        <label for="acceptTerms" class="link">
          <input type="checkbox"  id="acceptTerms" v-model="acceptTerms"/>
          Acepto las <router-link to="/politicas-y-medidas-de-seguridad" target="_blank">Políticas y Medidas de Seguridad</router-link>
        </label>
      </form>

      <!-- este formulario no es visible, solo es para enviar el mail al registro -->
      <form ref="form" id="form">
        <label for="name">name</label>
        <input type="text" name="name" id="name" :value="name">
        <label for="username">username</label>
        <input type="text" name="username" id="username" :value="username">
        <input ref="btn" type="submit" id="button" value="Send Email">
      </form>
      <!-- este formulario no es visible, solo es para enviar el mail al registro -->

      <span v-if="!showMsg">{{ msg }}</span>
    </div>
  </div>
</template>

<script>

import postMethods from '@/service/postMethod'
import util from '@/utils/utils'
import emailjs from '@emailjs/browser'

export default {
  name: 'SignUp',
  computed: {
    theme() {
      return this.$store.getters.getTheme
    }
  },
  data() {
    return {
      name: '',
      lastName: '',
      username: '',
      password: '',
      showMsg:true,
      msg:"La contraseña debe cumplir con los requisitos: \n Al menos una letra minúscula y una maypuscula. \n Un caracter especial: !@#$%^&*()_+ \n Tener una longitud entre 8 y 12 caracteres.",
      acceptTerms: false
    };
  },
  methods: {
    /* aceptarTerminos(){
      this.acceptTerms = !this.acceptTerms
    }, */
    async submitForm() {
      if (!this.acceptTerms) {
        util.cargarLoader("")
        util.cargarPopUp("Debe aceptar los términos y condiciones", "")
        return
      }

      const data = {
        name: this.name,
        lastname: this.lastName,
        username: this.username,
        password: this.password,
      }
      
      util.cargarLoader("Agregando usuario")
      let validation = [ { name: util.validarDatos(data.name,"nombre") },
        { lastname: util.validarDatos(data.lastname,"apellido") },
        { username: util.validarDatos(data.username,"email"), },
        { password: util.validarDatos(data.password,"password") },
      ]
      
      for(let item of validation){
        const fieldName = Object.keys(item)[0]
        if (!item[fieldName].isValid) {
          util.cargarLoader("")
          util.cargarPopUp(item[fieldName].texto, "ERROR")
          return
        }
      }
      
      if (validation[0].name.isValid && validation[1].lastname.isValid && validation[2].username.isValid && validation[3].password.isValid) {
        const result = await postMethods.addUser(data)
        util.cargarLoader("")
        if (result.ok) {
          await this.sendEmail()
          this.resetForm()
          this.$store.commit('setUser', data)
          this.$router.push({ path: '/login' })
        } else {
          util.cargarPopUp("Ya existe un usuario con ese correo electrónico", "ERROR")
        }
      }
    },
    async sendEmail() {
      util.cargarLoader("Enviando mail")
      emailjs.init('DAB1-dX1vNhJi41D3')
      const form = this.$refs.form
      const result = await emailjs.sendForm('service_f34uw5r', 'template_1x7auwe', form)
      if(result){
        util.cargarLoader("")
        util.cargarPopUp(`Usuario agregado con éxito, \n Hemos enviado un mail de bienvenida a:\n ${this.username}`, "GRACIAS")
      }else{
        util.cargarPopUp(`No hemos podido enviar email a:\n ${this.username}`, "ERROR")
      }
    },
    resetForm() {
      this.name = ''
      this.lastName = ''
      this.username = ''
      this.password = ''
      this.acceptTerms= false
    },
  }
}
</script>

<style scoped lang="scss">
  #form{
    display: none;
  }
  .contenedor {
    background-color: #15b4bc;
    color: var(--text);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 0;
  }
  .push{
    background-color: #15b4bc;
    min-height: 150px;
  }
  .signup-container {
    width: 300px;
    padding: 20px;
    margin: 20px;
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
  button:hover {
    background-color: #0f8389;
    transition: .5s ease-in-out;
  }
  .link {
    padding:10px 0;
    margin: 0;
    font-size: 10px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    input {
      padding: 0;
      margin: 0;
    }
    a{
      padding: 0;
      margin: 0;
    }
    p{
      padding: 0;
      margin: 0;
    }
  }
  .off{
    cursor: not-allowed;
    background-color: grey;
  }
  .off:hover{
    background-color: grey;
  }
  
</style>
