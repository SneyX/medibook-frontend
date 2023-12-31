import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import '@fortawesome/fontawesome-free/css/all.css'
import ShareButton from './components/ShareButton'

const app = createApp(App)

app.use(router)
app.use(store)
app.use('share', ShareButton)

app.mount('#app')