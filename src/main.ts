import { createApp, h, provide } from 'vue'
import { apolloClient } from "./graphql";
import { DefaultApolloClient } from '@vue/apollo-composable'
import App from './App.vue'
import router from './routes';
import './style.css'

createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
})
.use(router)
.mount('#app')
