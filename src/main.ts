import { createApp, provide, h } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import App from './App.vue'
import router from './routes'
import { apolloClient } from './plugins/apollo'
import './style.css'

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
    return () => h(App)
  }
})

app.use(router)
app.mount('#app')
