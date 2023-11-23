<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footerInfompresa">
        <div class="isologotipo">
          <img src="../assets/logoBlanco.png" alt="Logo empresa" />
        </div>
        <div class="info">
          <p>2023 Digital House ©</p>
          <p>Todos los Derechos Reservados.</p>
        </div>
      </div>

      <div class="redesSociales">
        <a href="https://www.instagram.com" target="_blank">
          <img src="../assets/instagram.png" alt="Logo de Instagram" />
        </a>

        <a href="https://www.facebook.com" target="_blank">
          <img src="../assets/facebook.png" alt="Logo de Facebook" />
        </a>

        <a href="https://api.whatsapp.com/send?phone=+5491111111111" target="_blank">
          <img src="../assets/whatsapp.png" alt="Logo de Whatsapp" />
        </a>

      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name:'FooterComponent',
};
</script>

<style scoped>
.footer {
  bottom: 0;
  width: 100%;
  background-color: #0d7277;
  color: #fff;
  padding: 3vh 0;
  z-index: 1;
  height: 8vw;
  display: flex;
  align-items: center;
}
.footer-content {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  margin: 0 auto;
}
.footerInfompresa {
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: left;
  margin-right: 20vw;
  width: 20vw;
}
.isologotipo img {
  width: 6vw;
}
.info p {
  margin: 0;
  font-size: 0.85vw;
}
.redesSociales img {
  max-width: 2.4vw;
  margin-right: 3vw;
}
.redesSociales{
  width: 20vw;
}

@media only screen and (max-width:480px ){
  .redesSociales {
    margin-bottom: 0px;
    width:200px;
    margin-right: 5px;
    padding-left: 50px;
  }
  .footerInfompresa {
    width:200px;

  }
  .info p{
    font-size: 1.7vw;
  }
  .isologotipo img {
    width: 10vw;
    margin-top: 0.8vw;

  }
  .isologotipo {
    width: 10vw;
    height: 10vw;
  }

  .redesSociales img {
    max-width: 4vw;
    margin-right: 5vw;
    margin-top: 0.8vw;
  }
  .footerInfompresa {
    justify-content: center;
    margin-right: 0vw;
  } 
}
</style>
