import { createStore } from "vuex"

export default createStore({
  state: {
    theme: "claro",
    loader: {
      cargando: false,
      textoCargando: "",
    },
    popup: {
      cargando: false,
      textoPopup: "",
      tituloPopup: "",
    },
    rooms: [],
    typeRooms: [],
    caracteristicas: [],
    dialog:{},
    user:{},
    userRooms:[],
    filtros:[],
  },
  mutations: {
    setTheme(state, theme) {
      state.theme = theme
    },
    setCargando(state, { isCargando, texto }) {
      state.loader.cargando = isCargando
      state.loader.textoCargando = texto
    },
    setPopup(state, { isCargando, texto, titulo }) {
      state.popup.cargando = isCargando
      state.popup.textoPopup = texto
      state.popup.tituloPopup = titulo
    },
    setRooms(state, room){
      state.rooms = room
    },
    setTypeRooms(state, typeRooms){
      state.typeRooms = typeRooms
    },
    setCaracteristicas(state, caracteristicas){
      state.caracteristicas = caracteristicas
    },
    setFiltros(state, filtros){
      state.filtros = filtros
    },
    setDialog(state, dialog){
      state.dialog = dialog
    },
    setUser(state, user){
      state.user = user
    },
    setUserRooms(state, userRooms){
      state.userRooms = userRooms
    },
  },
  actions: {
    setTheme({ commit }, theme) {
      commit("setTheme", theme)
    },
    setCargando({ commit }, cargando) {
      commit("setCargando", cargando)
    },
    setPopup({ commit }, popup) {
      commit("setPopup", popup)
    },
    setRooms({ commit }, room) {
      commit("setRooms", room)
    },
    setTypeRooms({ commit }, typeRooms) {
      commit("setTypeRooms", typeRooms)
    },
    setCaracteristicas({ commit }, caracteristicas) {
      commit("setCaracteristicas", caracteristicas)
    },
    setFiltros({ commit }, filtros) {
      commit("setFiltros", filtros)
    },
    setDialog({ commit }, dialog) {
      commit("setDialog", dialog)
    },
    setUser({ commit }, user) {
      commit("setUser", user)
    },
    setUserRooms({ commit }, userRooms) {
      commit("setUserRooms", userRooms)
    },
  },
  getters: {
    getTheme: state => state.theme,
    getCargando: state => state.loader.cargando,
    getTextoCargando: state => state.loader.textoCargando,
    getTextoPopUp: state => state.popup.textoPopup,
    getTituloPopUp: state => state.popup.tituloPopup,
    getPopUp: state => state.popup.cargando,
    getRooms: state => state.rooms,
    getTypeRooms: state => state.typeRooms,
    getCaracteristicas: state => state.caracteristicas,
    getFiltros: state => state.filtros,
    getDialog: state => state.dialog,
    getUser: state => state.user,
    getUserRooms: state => state.userRooms,
  },
});
