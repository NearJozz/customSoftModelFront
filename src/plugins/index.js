/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '@/stores'
import router from '@/router'
import Axios from '@/plugins/Axios'

export function registerPlugins (app) {
  Axios(app,pinia)
  app
    .use(vuetify)
    .use(router)
    .use(pinia)

}
