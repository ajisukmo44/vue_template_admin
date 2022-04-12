import Vue from 'vue'
import vueCompositionApi from '@vue/composition-api'
Vue.use(vueCompositionApi)
import VueRouter from 'vue-router'
import App from './App.vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import GmapCluster from 'vue2-google-maps/dist/components/cluster'

import store from './state/store'
import i18n from './i18n'
import router from './router/index'
import Vuelidate from 'vuelidate'
import VueSweetalert2 from 'vue-sweetalert2'
import VueMask from 'v-mask'
import VueHtml2pdf from 'vue-html2pdf'

import VueCytoscape from "vue-cytoscape";
import BootstrapVue from 'bootstrap-vue'
import VueApexCharts from 'vue-apexcharts'
import VueWordCloud from 'vuewordcloud'
import vco from "v-click-outside"

import VueVideoPlayer from "vue-video-player";
import "video.js/dist/video-js.css";
import "vue-video-player/src/custom-theme.css";
import "videojs-flash";
import "videojs-contrib-hls/dist/videojs-contrib-hls";

import { initFirebaseBackend } from './authUtils'
import { configureBackend } from './helpers/auth-backend';



const firebaseConfig = {
  apiKey: process.env.VUE_APP_APIKEY,
  authDomain: process.env.VUE_APP_AUTHDOMAIN,
  databaseURL: process.env.VUE_APP_VUE_APP_DATABASEURL,
  projectId: process.env.VUE_APP_PROJECTId,
  storageBucket: process.env.VUE_APP_STORAGEBUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGINGSENDERID,
  appId: process.env.VUE_APP_APPId,
  measurementId: process.env.VUE_APP_MEASUREMENTID
};

if (process.env.VUE_APP_DEFAULT_AUTH === "firebase") {
  initFirebaseBackend(firebaseConfig);
} else {
  configureBackend();
}

if(localStorage.getItem('theme') === 'dark') {
  require("@/design/index.scss");
} else {
  require("@/design/index.scss");
}

Vue.use(VueCytoscape)
Vue.use(VueRouter)
Vue.component('apexchart', VueApexCharts)
Vue.component('GmapCluster', GmapCluster)
Vue.use(VueMask)
Vue.use(BootstrapVue)
Vue.use(Vuelidate)
Vue.use(vco)
Vue.use(VueSweetalert2)
Vue.use(VueHtml2pdf)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyC7by8rqUbuDbM4eJogW4tONHZzl66D5CA',
    libraries: ['places','geometry','drawing','visualization'],
  },
  installComponents: true
})
Vue.use(VueWordCloud)
Vue.use(VueVideoPlayer)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  fallbackLocale: 'en',
  render: h => h(App)
}).$mount('#app')