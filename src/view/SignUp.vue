<template>
  <div :class="[theme, 'contenedor']">
    <div class="signup-container">
      <h2>Registrarse</h2>
      <form @submit.prevent="submitForm">

        <label for="name">Nombre:</label>
        <input ref="name" type="text" id="name" :value="name" placeholder="Entre 3 y 20 Letras"/>

        <label for="lastName">Apellido:</label>
        <input ref="lastName" type="text" id="lastName" :value="lastName" placeholder="Entre 3 y 20 Letras"/>

        <label for="username">Correo Electrónico:</label>
        <input ref="username" type="text" id="username" :value="username" placeholder="En formato xxxx@xxx.xxx"/>

        <label for="password">Contraseña:</label>
        <input ref="password" type="password" id="password" :value="password" placeholder="8-20: May, Min, !@#$%^&*()_+." @change="checkPass"/>

        <label for="acceptTerms">
          <input type="checkbox"  id="acceptTerms"  v-model="acceptTerms"  />
          Acepto las <a href="/ruta-a-bases-y-condiciones" target="_blank">bases y condiciones</a>
        </label>
        
        <button type="submit" >Registrarse</button>

        <button v-if="!emailConfirmationDelivered" @click="resendConfirmationEmail">Reenviar Correo de Confirmación</button>

      </form>
      <!-- este formulario no es visible, solo es para enviar el mail al registro -->
      <form ref="form" id="form">
        <div class="field">
          <label for="name">name</label>
          <input type="text" name="name" id="name" :value="name">
        </div>
        <div class="field">
          <label for="username">username</label>
          <input type="text" name="username" id="username" :value="username">
        </div>
        <input ref="btn" type="submit" id="button" value="Send Email">
      </form>
      <!-- este formulario no es visible, solo es para enviar el mail al registro -->

      <span v-if="!showMsg">{{ msg }}</span>
    </div>
  </div>
  <!-- <div class="push"></div> -->
</template>

<script>

import postMethods from '@/service/postMethod';
import util from '@/utils/utils';
import emailjs from '@emailjs/browser';

export default {
  name: 'SignUp',
  computed: {
    theme() {
      return this.$store.getters.getTheme;
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
      emailConfirmationSent: false,
      emailConfirmationDelivered: false,
      acceptTerms: false,
    };
  },
  methods: {
    async submitForm() {
      this.name = this.$refs.name.value
      this.lastName = this.$refs.lastName.value
      this.username = this.$refs.username.value
      this.password = this.$refs.password.value

      const data = {
        name: this.name,
        lastname: this.lastName,
        username: this.username,
        password: this.password,
        acceptTerms: this.acceptTerms,
      }
      
      util.cargarLoader("Agregando usuario")
      let validation = [ { name: util.validarDatos(data.name,"nombre") },
        { lastname: util.validarDatos(data.lastname,"apellido") },
        { username: util.validarDatos(data.username,"email"), },
        { password: util.validarDatos(data.password,"password") },
        {acceptTerms: util.validarDatos(data.acceptTerms,"acceptTerms")}
      ]
      for(let item of validation){
        const fieldName = Object.keys(item)[0]
        if (!item[fieldName].isValid) {
          util.cargarLoader("")
          util.cargarPopUp(item[fieldName].texto, "ERROR")
          return
        }
      }

      if (validation[0].name.isValid && validation[1].lastname.isValid && validation[2].username.isValid && validation[3].password.isValid && validation[4].acceptTerms.isValid) {
        const result = await postMethods.addUser(data)
        util.cargarLoader("")
        if (result) {
          
          util.cargarPopUp("Usuario agregado con éxito", "GRACIAS")

          emailjs.init('DAB1-dX1vNhJi41D3')

          emailjs.sendForm('service_f34uw5r', 'template_1x7auwe', this.$refs.form)
            .then((result) => {
                console.log('SUCCESS!', result.text);
                this.emailConfirmationSent = true;
                this.emailConfirmationDelivered = true;
            }, (error) => {
                console.log('FAILED...', error.text);
            });
            
          this.resetForm();
          this.$store.commit('setUser', data)
          this.$router.push({ path: '/login' })
        } else {
          util.cargarPopUp("Problema en el servidor", "ERROR");
        }
      
  }
    },
    resendConfirmationEmail() {
      emailjs.sendForm('service_f34uw5r', 'template_1x7auwe', this.$refs.form)
        .then((result) => {
          console.log('SUCCESS!', result.text);
          this.emailConfirmationDelivered = true;
        }, (error) => {
          console.log('FAILED...', error.text);
          this.emailConfirmationDelivered = false;
        });
    },
    resetForm() {
      this.name = '';
      this.lastName = '';
      this.username = '';
      this.password = '';
      this.acceptTerms= false;
    },
    checkPass(e){
      this.showMsg = util.validarDatos(e.target.value,"password").isValid
    }
  }
};
</script>

<style scoped>
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
</style>