import createStore from '@/store'

const regExp = {
  regTexto : /^[a-zA-ZÀ-ÿ\s]{3,20}$/,
  regEmail : /^[a-zA-Z0-9_.+-]+@[a-zA-Z]+\.[a-zA-Z]{2,13}$/,
  regContrasenia: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[a-zA-Z\d!@#$%^&*()_+]{8,12}$/
};
const { regTexto, regEmail, regContrasenia } = regExp;

const cargarPopUp = (texto, titulo) =>{
    let cargando = {
      isCargando: true,
      texto: texto,
      titulo: titulo
    }
    createStore.dispatch('setPopup', cargando)
  }


  const cargarLoader = texto =>{
    let cargando = {}
      texto == "" ?
      cargando={ isCargando: false, texto: texto } :
      cargando={ isCargando: true, texto: texto }
    createStore.dispatch('setCargando', cargando)
  }

  const validarDatos = (dato,tipo) => {
    let result = {
      isValid:false,
      texto: ""
    }
    switch (tipo) {
      case "nombre":
        result = {
          isValid:regTexto.test(dato),
          texto:"El nombre no cumple el formato"
        }
        break;
      case "apellido":
        result = {
          isValid:regTexto.test(dato),
          texto:"El apellido no cumple el formato"
        }
        break;
      case "email":
        result = {
          isValid:regEmail.test(dato),
          texto:"El email no cumple el formato"
        }
        break;
      case "password":
        result = {
          isValid:regContrasenia.test(dato),
          texto:"El password no cumple el formato"
        }
        break;
    }
    return result
  }

  const iconList = [
    'camera', 'user', 'music', 'tooth', 'building', 'book', 'gamepad', 'coffee', 'smile', 'pager',
    'snowflake', 'key', 'bell','envelope', 'paint-brush', 'cutlery', 'lightbulb',
    'headphones', 'hospital', 'medkit', 'syringe', 'flask', 'thermometer-half', 'lungs', 'brain', 'walking',
    'eye', 'wheelchair', 'briefcase-medical', 'prescription-bottle', 'first-aid', 'crutch',
    'laptop-medical', 'x-ray', 'procedures', 'clipboard-list', 'vial', 'viruses','stethoscope', 
    'shield-alt', 'baby', 'thermometer', 'teeth-open','ambulance', 'tachometer',
    'hand-holding-medical', 'book-medical', 'microscope', 'shield-virus', 'pills', 'band-aid',
    'eye-dropper', 'eye-slash', 'glasses', 'hospital-user', 'id-card', 'puzzle-piece', 'restroom', 'skull-crossbones','tablets', 'teeth',
    'user-injured', 'user-md', 'user-nurse', 'virus', 'virus-slash', 'baby-carriage', 'bed',
    'child', 'clipboard-check', 'heart', 'heartbeat', 'blind', 'hospital-symbol','prescription', 'hospital-alt', 
    'clinic-medical', 'vials', 'wifi','notes-medical','truck-medical','pump-medical', 'user-doctor',
    'virus-covid-slash','radiation','mask-ventilator','lungs-virus','heart-pulse','bandage','bacteria',
    'ban-smoking','smoking','phone-volume','volume-xmark','volume-high','print', 'file-contract'
  ]

  const util = {
    cargarPopUp: cargarPopUp,
    cargarLoader: cargarLoader,
    validarDatos: validarDatos,
    iconList: iconList
  }

  export default util