<template>
  <div v-if="dialog.type == 'delete'" class="contenedor">
    <div class="textCont">
      <div class="texto">
        <p>{{ dialog.texto }}</p>
        <div class="categoryCont">
          <p><span>ID:</span> {{ dialog.id }}</p>
          <p><span>NOMBRE:</span> {{ dialog.name }}</p>
          <p v-if="dialog.description">
            <span>DESCRIPCIÓN:</span> {{ dialog?.description }}
          </p>
        </div>
      </div>
      <div class="btnCont">
        <div class="Btn" @click="dialog.acept">ACEPTAR</div>
        <div class="Btn" @click="dialog.cancel">CANCELAR</div>
      </div>
    </div>
  </div>
  <div v-if="dialog.type == 'updateCaracteristica'" class="contenedor">
    <div class="caracFormContainer">
      <h2>MODIFICAR CARACTERÍSTICA</h2>
      <form ref="caracteristicasForm" @submit.prevent="submitForm">
        <label for="nombre">NOMBRE*</label>
        <input ref="nombre" type="text" id="nombre" :value="dialog.card.name" />

        <label for="icono">ÍCONO*</label>
        <IconList
          @update-icon="handleUpdateIcon"
          v-if="!display"
          class="lista"
        />
        <div class="actualizar" v-if="display" @click="update">
          <DinamicIcon
            :iconName="dialog.card.urlicon"
            @click="update"
            class="icono"
          />
          <p>CAMBIAR?</p>
        </div>
        <input
          ref="icono"
          type="text"
          id="icono"
          :value="dialog.card.urlicon"
        />

        <button type="submit">MODIFICAR CARACTERÍSTICA</button>
      </form>
      <div class="btnCont">
        <div class="Btn" @click="dialog.cancel">CANCELAR</div>
      </div>
    </div>
  </div>
  <div v-if="dialog.type == 'modificarCarac'" class="contenedor">
    <div class="modificarCarac">
      <label>CARACTERÍSTICAS*</label>
      <div class="caractCont">
        <div
          class="carac"
          v-for="caracteristica in dialog.totalCarac"
          :key="caracteristica?.id"
          @click="agregar(caracteristica)"
        >
          <DinamicIcon :iconName="caracteristica?.urlicon" class="icono" />
          <p>{{ caracteristica?.name }}</p>
        </div>
      </div>
      <label>AGREGADAS*</label>
      <div class="caractCont">
        <div
          class="carac"
          v-for="caracteristica in dialog.caracteristicas"
          :key="caracteristica?.id"
          @click="quitar(caracteristica)"
        >
          <DinamicIcon :iconName="caracteristica?.urlicon" class="icono" />
          <p>{{ caracteristica?.name }}</p>
          <p class="cerrar">x</p>
        </div>
      </div>
      <div class="btnCont2">
        <div class="Btn2" @click="agregarCaracteristica(dialog.card)">
          ACEPTAR
        </div>
        <div class="Btn2" @click="dialog.cancel">CANCELAR</div>
      </div>
    </div>
  </div>
  <div v-if="dialog.type == 'recategorize'" class="contenedor">
    <div class="textCont">
      <div class="texto">
        <p>{{ dialog.texto }}</p>
      </div>
      <select name="type" id="type" v-model="selected">
        <option
          v-for="category in dialog.categorys"
          :key="category?.id"
          :value="category?.id"
        >
          {{ category?.name }}
        </option>
      </select>
      <div class="btnCont">
        <div class="Btn" @click="recategorizeCard">ACEPTAR</div>
        <div class="Btn" @click="dialog.cancel">CANCELAR</div>
      </div>
    </div>
  </div>
  <div v-if="dialog.type == 'rol'" class="contenedor">
    <div class="textCont">
      <div class="texto">
        <p>{{ dialog.texto }}</p>
      </div>
      <select name="type" id="type" v-model="selected">
        <option value="ADMIN">ADMIN</option>
        <option value="USER">USER</option>
      </select>
      <div class="btnCont">
        <div class="Btn" @click="recategorizeRol">ACEPTAR</div>
        <div class="Btn" @click="dialog.cancel">CANCELAR</div>
      </div>
    </div>
  </div>
  <div v-if="dialog.type == 'filter'" class="contenedor">
    <div class="filterCont">
      <div class="cerrar" @click="close()">x</div>
      <select name="filter" id="filter" @change="onFilterChange($event)">
        <option value="seleccionar filtro">seleccionar filtro</option>
        <option
          v-for="filtro in filtros"
          :value="filtro?.name"
          :key="filtro.id"
        >
          {{ filtro?.name }}
        </option>
      </select>
    </div>
  </div>
  <div v-if="dialog.type == 'slider'" class="contenedor" id="slider">
    <Swiper
      class="Swiper"
      :slides-per-view="3"
      :space-between="10"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <div class="botonS" @click="dialog.cancel">VOLVER</div>
      <swiper-slide
        v-for="img in dialog.imgs"
        :key="img?.id"
        :class="[theme, 'card']"
      >
        <img :key="img?.id" :src="img?.path" alt="sala" />
      </swiper-slide>
    </Swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import DinamicIcon from "@/components/DinamicIcon.vue";
import util from "@/utils/utils";
import putMethod from "@/service/putMethod";
import IconList from "./IconList.vue";

export default {
  name: "DataDialog",
  props: {},
  components: {
    Swiper,
    SwiperSlide,
    IconList,
    DinamicIcon,
  },
  emits: ["update-type", "update-rol", "update-caracteristicas"],
  computed: {
    dialog() {
      return this.$store.getters.getDialog;
    },
    filtros() {
      return this.dialog.filtros || [];
    },
  },
  data() {
    return {
      selected: null,
      display: true,
      iconName: "",
    };
  },
  methods: {
    recategorizeCard() {
      this.$emit("update-type", this.selected);
    },
    recategorizeRol() {
      this.$emit("update-rol", this.selected);
    },
    onFilterChange(event) {
      const selectedFilter = event.target.value;
      this.dialog.acept(selectedFilter);
      this.$store.dispatch("setDialog", {});
    },
    close() {
      this.$store.dispatch("setDialog", {});
    },
    agregar(car) {
      this.dialog.caracteristicas.push(car);
      const idx = this.dialog.totalCarac.indexOf(car);
      this.dialog.totalCarac.splice(idx, 1);
    },
    quitar(car) {
      this.dialog.totalCarac.push(car);
      const idx = this.dialog.caracteristicas.indexOf(car);
      this.dialog.caracteristicas.splice(idx, 1);
    },
    async agregarCaracteristica(card) {
      let dialog = {};
      util.cargarLoader("Modificando características");
      const characteristics = this.dialog.caracteristicas;
      card.characteristics = characteristics;
      const data = card;
      await putMethod.updateRoom(data);
      util.cargarLoader("");
      this.$store.dispatch("setDialog", dialog);
    },
    handleUpdateIcon(nombre) {
      this.display = true;
      this.$refs.icono.value = nombre;
      this.dialog.card.urlicon = nombre;
    },
    update() {
      this.display = false;
      this.$refs.icono.value = "";
    },
    async submitForm() {
      if (this.$refs.nombre.value.replace(/\s/g, "").length < 4) {
        util.cargarPopUp("Ingrese el nombre", "Faltan datos..");
        util.cargarLoader("");
        return;
      }
      if (this.$refs.icono.value.replace(/\s/g, "").length < 1) {
        util.cargarPopUp("Ingrese el ícono", "Faltan datos..");
        util.cargarLoader("");
        return;
      }

      const data = {
        name: this.$refs.nombre.value,
        urlicon: this.$refs.icono.value,
      };
      const id = this.dialog.card.id;

      util.cargarLoader("Modificando característica");
      await putMethod.updateCaracteristica(data, id);
      this.$refs.caracteristicasForm.reset();
      let dialog = {};
      this.$store.dispatch("setDialog", dialog);
      this.$store.dispatch("setCaracteristicas", []);
      this.$emit("update-caracteristicas");
      util.cargarLoader("");
      util.cargarPopUp("Característica modificada con éxito", "Gracias!");
    },
  },
};
</script>

<style scoped lang="scss">
.contenedor {
  z-index: 2;
  position: absolute;
  width: 100%;
  height: 100%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  .filterCont {
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-75%, -25%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 25%;
    height: 25%;
    background-color: #99dcdd;
    border: 2px solid #0f8389;
    .cerrar {
      position: absolute;
      display: flex;
      align-self: flex-end;
      padding: 15px 20px;
      background-color: #15b4bc;
      border: 1px solid #0f8389;
      color: #daecec;
      outline-offset: 0;
      font-weight: bold;
      border-radius: 50%;
      margin-right: 10px;
      top: 10px;
      cursor: pointer;
      justify-content: center; /* Center horizontally */
      align-items: center;
    }
    #filter {
      padding: 10px;
      border: 2px solid #0f8389;
      background-color: #15b4bc;
      cursor: pointer;
      color: #daecec;
    }
  }
  .swiper {
    width: 90vw;
    height: auto;
    margin: 0;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 100%;
      height: 25vw;
      border-radius: 15px;
    }
  }
  .textCont {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
    height: auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #afedee;
    color: #0d7277;
    border: 3px solid #0d7277;
    border-radius: 10px;
    .texto {
      width: 80%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #0d7277;
      .categoryCont {
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex-wrap: wrap;
        padding: 20px;
        p {
          display: flex;
          align-items: center;
          justify-content: space-around;
          width: 100%;
          border: 1px solid #0d7277;
          margin: 5px;
          padding: 10px;
          border-radius: 5px;
        }
      }
    }
    .btnCont {
      display: flex;
      align-items: center;
      justify-content: center;
      .Btn {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 15px;
        border: 2px solid #0f8389;
        color: #0f8389;
        cursor: pointer;
        margin: 10px;
        padding: 10px 50px;
        font-weight: bold;
        width: 50%;
      }
      .Btn:hover {
        background-color: #99dcdd;
      }
    }
  }
  .modificarCarac {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #afedee;
    color: var(--text);
    border: 3px solid #0d7277;
    border-radius: 10px;
    label {
      margin: 10px;
    }
    .caractCont {
      display: flex;
      align-items: center;
      justify-content: space-around;
      background-color: white;
      border: 2px solid #0d7277;
      border-radius: 10px;
      padding: 15px;
      .carac {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        border: 1px solid #0d7277;
        border-radius: 10px;
        background-color: #99dcdd;
        width: auto;
        height: auto;
        cursor: pointer;
        transition: 0.3s ease-in-out;
        margin: 4px;
        .icono {
          display: flex;
          align-items: center;
          justify-content: center;
          width: auto;
          height: auto;
          padding: 5px;
        }
        p {
          font-size: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 5px;
          color: black;
        }
        .cerrar {
          padding: 1px 5px;
          border: 1px solid #0d7277;
          border-radius: 10px;
        }
      }
      .carac:hover {
        box-shadow: 0px 0px 5px 5px #99dcdd;
      }
    }
    .btnCont2 {
      display: flex;
      align-items: center;
      justify-content: center;
      .Btn2 {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 15px;
        border: 2px solid #0f8389;
        color: #0f8389;
        cursor: pointer;
        margin: 10px;
        padding: 10px 50px;
        font-weight: bold;
        width: 50%;
      }
      .Btn2:hover {
        background-color: #99dcdd;
      }
    }
  }
  .caracFormContainer {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 60%;
    height: auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #afedee;
    color: var(--text);
    border: 3px solid #0d7277;
    border-radius: 10px;
    .btnCont {
      display: flex;
      align-items: center;
      justify-content: center;
      .Btn {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 15px;
        border: 2px solid #0f8389;
        color: #0f8389;
        cursor: pointer;
        margin: 10px;
        padding: 10px 50px;
        font-weight: bold;
        width: 50%;
      }
      .Btn:hover {
        background-color: #99dcdd;
      }
    }
    form {
      width: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: white;
      border: 2px solid #0d7277;
      border-radius: 10px;
      padding: 15px;
      label {
        padding: 5px;
        margin-bottom: 8px;
        border-radius: 10px;
      }
      input {
        padding: 8px;
        margin-bottom: 16px;
        outline-offset: 0;
        background-color: white;
        border: 2px solid #0d7277;
        border-radius: 10px;
      }
      .lista {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        border: 2px solid #0d7277;
        border-radius: 10px;
        padding: 15px;
        height: auto;
      }
      .actualizar {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .icono {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 5px;
          border: 1px solid #0d7277;
          border-radius: 50%;
          background-color: #99dcdd;
          cursor: pointer;
        }
        .icono:hover {
          border: 1px solid #99dcdd;
          background-color: #0d7277;
        }
        p {
          cursor: pointer;
          padding: 10px;
        }
      }
      #icono {
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
        transition: 0.5s ease-in-out;
      }
      button:hover {
        background-color: #069fa7;
        transition: 0.5s ease-in-out;
      }
    }
  }
}
.botonS {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  border: 2px solid #0f8389;
  color: #0a585c;
  cursor: pointer;
  margin: 10px;
  margin-left: 25vw; 
  padding: 10px 50px;
  font-weight: bold;
  width: 50%;
  background-color: #069fa7;
}
.botonS:hover {
  background-color: #99dcdd;
}

@media only screen and (max-width: 480px) {
  #slider .swiper {
    img {
      width: 108%;
      height: 30vw;
    }
  }
  .contenedor {
    .filterCont {
      left: 65%;
      width: 60%;
      height: 50%;
    }
    .cerrar {
      height: 10vw;
      width: 10vw;
      font-size: 5vw;
      align-self: center;
    }
    #filter {
      margin-top: -60%;
    }
  }
}
</style>
