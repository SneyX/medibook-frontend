<template>
  <div :class="[theme, 'contenedor']">
    <div class="login-container">
      <h2>Iniciar Sesión</h2>
      <form ref="form" @submit.prevent="submitForm">
        <label for="username">Email:</label>
        <input type="text" id="username" v-model="username" />

        <label for="password">Contraseña:</label>
        <input type="password" id="password" v-model="password" />

        <button type="submit">Iniciar Sesión</button>
        <button class="reenviar" @click="resendConfirmationEmail">Reenviar Correo de Confirmación</button>
      </form>
    </div>
  </div>
</template>

<script>
import postMethods from "@/service/postMethod"
import getMethod from "@/service/getMethod"
import util from "@/utils/utils"
import emailjs from "@emailjs/browser"

export default {
  name: "LogIn",
  computed: {
    theme() {
      return this.$store.getters.getTheme
    },
  },
  data() {
    return {
      username: this.$store.getters?.getUser?.username || "",
      name: this.$store.getters?.getUser?.name || "",
      password: this.$store.getters?.getUser?.password || "",
    }
  },
  methods: {
    async submitForm() {
      const data = {
        username: this.username,
        password: this.password,
      }
      let validation = [
        { username: util.validarDatos(this.username, "email") },
        { password: util.validarDatos(this.password, "password") },
      ]
      for (let item of validation) {
        const fieldName = Object.keys(item)[0]
        if (!item[fieldName].isValid) {
          util.cargarLoader("")
          util.cargarPopUp(item[fieldName].texto, "ERROR")
          return
        }
      }
      util.cargarLoader("Iniciando..")
      const result = await postMethods.logIn(data)
      if (result.Message == 'Autenticacion Correcta') {
        console.log(result)
        let preUser = {
          username: this.username,
          password: this.password,
          jwt: result.token,
        };
        this.$store.dispatch("setUser", preUser);
        let user = await getMethod.getUser(data.username, false)
        const userForStore = {
          id: user?.id || "",
          name: user?.name || "",
          lastname: user?.lastname || "",
          username: this.username,
          password: this.password,
          jwt: result.token,
          rol: user?.role,
          rooms: user?.rooms || [],
        }
        this.resetForm()
        this.$store.dispatch("setUser", userForStore)
        this.$store.dispatch("setUserRooms", userForStore.rooms)
        util.cargarLoader("")
        this.$router.push({ path: "/" })
      } else {
        util.cargarLoader("")
        util.cargarPopUp("Los datos ingresados no son correctos", "ERROR")
      }
    },
    async resendConfirmationEmail() {
      emailjs.init("DAB1-dX1vNhJi41D3")
      const emailParams = {
        name: this.name.length > 0 ? this.name : this.username,
        username: this.username
      }
      try {
        const res = await emailjs.send("service_f34uw5r", "template_1x7auwe", emailParams)
        util.cargarPopUp(`Hemos re-enviado un mail de bienvenida a:\n ${this.username}`, "GRACIAS")
        console.log("SUCCESS!", res.text)
      } catch (error) {
        util.cargarPopUp(`No hemos podido enviar email a:\n ${this.username}`, "ERROR")
        console.error("FAILED...", error)
      }
    },
    resetForm() {
      this.username = ""
      this.password = ""
    },
  },
};
</script>

<style scoped>
.contenedor {
  background-color: #15b4bc;
  color: var(--text);
  height: 100vh;
  width: 100%;
  padding: 40px 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-container {
  width: 300px;
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
  transition: 0.5s ease-in-out;
}
.reenviar{
  margin-top: 20px;
}
button:hover {
  background-color: #0f8389;
  transition: 0.5s ease-in-out;
}
</style>
