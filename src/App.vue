<template>
<!-- importo las fuentes -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet">

  <div class="content">
      <HeaderPrincipal />
      <router-view></router-view>
      <LoaderMain />
      <PopUp />
  </div>
  <FooterComponent />

</template>

<script>
import HeaderPrincipal from './components/HeaderPrincipal.vue';
import LoaderMain from './components/LoaderMain.vue';
import FooterComponent from './components/FooterComponent.vue';
import PopUp from './components/PopUp.vue';

export default {
  name: 'App',
  components: {
    HeaderPrincipal,
    LoaderMain,
    FooterComponent,
    PopUp,
  },
  data() {
    return {
    };
  },
  computed:{
    path() {
      return this.$router.currentRoute.value.path
    }
  },
  mounted() {
  },
}
</script>

<style lang="scss">
  #app {
    font-family: 'Poppins', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
  }
  html, body {
    height: 100%;
    margin: 0;
  }
  *{
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  p{
    color: var(--text);
  }
  .oscuro,
  .claro{
    transition: .5s ease-in-out;
  }
  .claro{
    --background: #15b4bc;
    --background2: #99DCDD;
    --text: #daecec;
    --text2: #605B5B;
    --border: 1px solid #0f8389;
    --shadow: 0px 1px 5px 1px #99dcdd;
    --oscuro: #0d7277;
  }
  .claro:hover{
    --background: #0f8389;
    --text: #daecec;
    --border: 1px solid #0d7277;
    --shadow: 0px 1px 5px 1px #daecec;
    --oscuro: #0d7277;
  }
  .oscuro{
    --background: #0f8389;
    --text: #daecec;
    --border: 1px solid #0d7277;
    --shadow: 0px 1px 5px 1px #daecec;
    --oscuro: #0d7277;
  }
  .oscuro:hover{
    --background: #15b4bc;
    --text: #daecec;
    --border: 1px solid #0f8389;
    --shadow: 0px 1px 5px 1px #99dcdd;
    --oscuro: #0d7277;
  }
  a{
    text-decoration: none;
    color: var(--text);
  }
  LoaderMain{
    height: 100%;
  }
  .content{
    min-height: 100vh;
  }

  .cal2{
    .vuecal__header{
      border-bottom: 4px solid #0d7277;
      background-color: #15b4bc;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .vuecal__menu{
        background-color: #15b4bc;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        border-bottom: 2px solid #0d7277;
        .vuecal__view-btn{
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          background-color: #15b4bc;
        }
      }
      .vuecal__title-bar{
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        background-color: #15b4bc;
      }
    }
    .vuecal__body{
      .vuecal__flex{
        .vuecal__bg{
          .vuecal__flex{
            .vuecal__time-column{
              display: flex;
              flex-direction: column;
              align-items: center;
              border-right: 1px solid #15b4bc;
              .vuecal__time-cell{
                display: flex;
                .vuecal__time-cell-label{
                  display: flex;
                  align-items: center;
                  color: #0d7277;
                }
                .vuecal__time-cell-line::before{
                  border-bottom: 1px solid #15b4bc;
                }
              }
            }
            .day-view{
              .vuecal__flex{
                .vuecal__cell{
                  /* .vuecal__now-line{

                  } */
                  .vuecal__flex{
                    .vuecal__cell-events{
                      .vuecal__event{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background-color: #0d7277;
                        color: white;
                        .vuecal__event-title{
                          margin: 0 5px;
                        }
                        .vuecal__event-content{
                          margin: 0 5px;
                        }
                        /* .vuecal__event-time{
                          
                        } */
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
 
</style>
