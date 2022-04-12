<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row mb-4">
      <div class="col-12">
        <div class="card h-100">
          <div class="card-body">
            <div class="row">
              <div class="col-sm-7">
                  <b-button class="btn" variant="primary"><i class="bx bx-map-pin mr-1"></i> {{$t("agen-detail.current-location")}} </b-button>
              </div>
              <div class="col-sm-3 text-right p-0">
                  <div class="form-group mb-3">
                    <date-picker v-model="daterange" class="text-center" placeholder="Date Range" range append-to-body lang="en" confirm></date-picker>
                  </div>
              </div>
              <!-- <div class="col-sm-2">
                  <b-button class="btn btn-block" variant="success" @click="Tracking"><i class="bx bx-map-pin mr-1"></i> Tracking</b-button>
              </div> -->
              <div class="col-sm-2 col-xl-2  text-right pl-1">
                    <b-button class="btn btn-block " variant="success" @click="Tracking" :class="{'disabled ': loading_tracking}">
                       <b-spinner variant="light" small v-if="loading_tracking"></b-spinner> Tracking
                    </b-button>
              </div>
            </div>
         
          path : {{path}} x <br> track :  {{trackerpoint}}  x <br> line1 : {{line1}}
          <GmapMap
              ref="mymap"
              :center= center
              :zoom= zoom
              class="maps"
              @click="measureDistance"
                :options="mapTheme()"
            >
             <div ref="custom" class="flex flex-col items-center custom-control">
                <!-- <button title="Measure Distance" class="mb-2 mr-2 px-2 py-2 text-xs rounded-sm shadow hover:bg-gray-200 pointer" :class="measure_distance == true ? 'bg-blue-300' : 'bg-white' " @click="distanceMode()">
                  <img src="https://img.icons8.com/external-those-icons-lineal-color-those-icons/24/000000/external-distance-maps-and-locations-those-icons-lineal-color-those-icons-2.png"/>
                </button> -->
                <button title="Point of Interest" class="mb-2 mr-2 bg-white px-2 py-2 text-xs rounded-sm shadow hover:bg-gray-200 pointer" @click="poiView()">
                  <img :src='poi == true ? "https://img.icons8.com/glyph-neue/24/24991f/point-of-interest.png" : "https://img.icons8.com/glyph-neue/24/525252/point-of-interest.png" '/>
                </button>
              </div>
              <GmapMarker
    :key="index"
    v-for="(m, index) in markers"
    :position="m.position"
    :clickable="true"
    :draggable="true"
    @click="center=m.position"
  />

                <GMapCluster
                :minimumClusterSize="5"
                :styles="clusterIcon"
                :zoomOnClick="true"
                class="clusterMap" >
                <GMapMarker
                  v-for="map in result_tracking" 
                  :key="map.id"
                  :clickable="true"
                  :options="{ position: {lat: parseFloat(map.lat), lng: parseFloat(map.lng)}}"
                  :icon='{
                    path: "M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z",
                    fillColor: "#000",
                    fillOpacity: 1,
                    strokeColor: "#636363",
                    strokeWeight: 0.5,
                    rotation: 0,
                    scale: 1.8,
                    anchor: {x: 10, y:15}
                  }'
                  @click="openMarker(map.id)"
                >
                <GMapInfoWindow
                :closeclick="true"
                @closeclick="openMarker(null)"
                :opened="openedMarkerID === map.id_report"
                >
                  <div>
                    <h4>Title : {{map.title}}</h4>
                    <h5>Date : {{map.incident_date}}</h5>
                    <p class="mt-2" style="width: 200px;">
                      {{map.description}}
                    </p>
                  </div>
                </GMapInfoWindow>
                </GMapMarker>
              </GMapCluster>

              <GMapMarker
                v-if="firstpoint.on == true"
                ref="first_point"
                :label="{
                  text: '0 km',
                  color: theme == 'dark' ? '#e5e7eb' : '#000000',
                  fontWeight: 'bold'
                }"
                :clickable="true"
                :options="{position: {lat: parseFloat(firstpoint.lat), lng: parseFloat(firstpoint.lng)}}"
                :icon="{
                  url: theme == 'dark' ? 'https://img.icons8.com/windows/30/e5e7eb/wind-speed-less-1.png' : 'https://img.icons8.com/windows/30/000000/wind-speed-less-1.png',
                  width: 50,
                  height: 50,
                  textSize: 12,
                  anchor: {x: 14, y: 16},
                  labelOrigin : {x: 5, y: -5},
                }"
                @click="unsetDistanceMarker('first')"
              />

              <GMapMarker
                v-if="secondpoint.on == true"
                ref="second_point"
                :label="{
                  text: distance+' km',
                  color: theme == 'dark' ? '#e5e7eb' : '#000000',
                  fontWeight: 'bold'
                }"
                :clickable="true"
                :options="{position: {lat: parseFloat(secondpoint.lat), lng: parseFloat(secondpoint.lng)}}"
                :icon="{
                  url: theme == 'dark' ? 'https://img.icons8.com/windows/30/e5e7eb/wind-speed-less-1.png' : 'https://img.icons8.com/windows/30/000000/wind-speed-less-1.png',
                  width: 50,
                  height: 50,
                  textSize: 12,
                  anchor: {x: 16, y: 16},
                  labelOrigin : {x: 5, y: -5},
                }"
                @click="unsetDistanceMarker('second')"
              />

              <GMapPolyline 
                v-if="firstpoint.on == true && secondpoint.on == true"
                :options="{ 
                  strokeColor: theme == 'dark' ? '#9ca3af' : '#212121', 
                  strokeOpacity: 0.8, 
                  strokeWeight: 3
                }"
                :path="[
                {lat: firstpoint.lat, lng: firstpoint.lng},
                {lat: secondpoint.lat, lng: secondpoint.lng}
                ]"
                :editable="false"
              />

              <GMapMarker
                v-for="(track, index) in trackerpoint" 
                :key="track.id"
                :label="{
                  text:String(index+1),
                  color: theme == 'dark' ? '#e5e7eb' : '#e5e7eb',
                  fontWeight: 'bold'
                }"
                :clickable="true"
                :options="{ position: {lat: parseFloat(track.lat), lng: parseFloat(track.lng)}}"
                :icon="{
                  url: theme == 'dark' ? 'https://img.icons8.com/ios-filled/50/991b1b/street-view.png' : 'https://img.icons8.com/ios-filled/50/EF4444/street-view.png',
                  textSize: 12,
                  anchor: {x: 25, y: 45},
                  labelOrigin : {x: 25, y: 22},
                }"
                @click="openMarker(track.id)"
              >
                <GMapInfoWindow
                :closeclick="true"
                @closeclick="openMarker(null)"
                :opened="openedMarkerID === track.id"
                >
                  <div>
                    <h4>LatLong : {{track.lat}}, {{track.lng}}</h4>
                    <h4>Date : {{track.date}}</h4>
                  </div>
                </GMapInfoWindow>
              </GMapMarker>
          </GmapMap>

          </div>
        </div>
      </div>
       <div class="col-12">
        <div class="card h-100">
          <div class="card-body">
              <h5 class="card-title"><b>{{$t("agen-detail.tracking-record")}}</b></h5>
               <div class="table-responsive">
                 {{line1}}
                 <table class="table table-bordered text-muted">
                   <thead v-if="result_tracking[0]">
                     <tr> 
                       <th class="text-center" width="3%">#</th>
                       <th>{{$t("agen-detail.date-time")}}</th>
                       <th>{{$t("agen-detail.location")}} </th>
                     </tr>
                   </thead>
                   <tbody v-if="result_tracking[0]">
                     <tr v-for="data in result_tracking" :key="data.id" >
                       <td width="3%" class="text-center">
                         <b-form-checkbox class="text-center mt-0" :checked="setCheck(data.id)"  @change="setTrackerPoint(data.id, data.lat, data.lng, data.delivery_time)">
                         </b-form-checkbox>
                       </td>
                       <td>{{formatDate(data.delivery_time)}}</td>
                       <td>{{data.coordinate}}</td>
                     </tr>
                   </tbody>
                    <tbody v-if="!result_tracking[0]">
                      <tr>
                        <td colspan="3" class="text-center text-muted p-5">{{$t('all.dnf')}}</td>
                      </tr>
                   </tbody>
                 </table>
               </div>
          </div>
        </div>
      </div>
    </div>

     <div class="row mb-4">
      <div class="col-6">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title"><b>{{$t("agen-detail.agent-info")}}</b></h5>
               <div class="table-responsive">
                 <table class="table table-bordered text-muted">
                   <tbody>
                     <tr>
                       <td width="25%">{{$t("user-management.name")}}</td>
                       <td>{{agent.name}}</td>
                     </tr>
                        <tr>
                       <td>NIK</td>
                       <td>{{agent.nik}}</td>
                     </tr>
                     <!-- <tr>
                       <td>{{$t("user-management.username")}}</td>
                       <td>{{agent.username}}</td>
                     </tr> -->
                     <tr>
                       <td>{{$t("user-management.birth-date")}}</td>
                       <td>{{agent.birth_date}}</td>
                     </tr>
                     <tr>
                       <td>{{$t("user-management.gender")}}</td>
                       <td>
                         <span v-if="agent.gender == 'L'">{{ $t("user-management.male")}}</span>
                         <span v-if="agent.gender == 'P'">{{ $t("user-management.female")}}</span>
                       </td>
                     </tr>
                     <tr>
                       <td>{{$t("user-management.email")}}</td>
                       <td>{{agent.email}}</td>
                     </tr>
                     <tr>
                       <td>{{$t("user-management.phone")}}</td>
                       <td>{{agent.phone}}</td>
                     </tr>
                    <tr>
                       <td>{{$t("user-management.address")}}</td>
                       <td>{{agent.address}}</td>
                     </tr>
                     <tr>
                       <td>{{$t("user-management.region")}}</td>
                       <td>{{agent.agent_location}}</td>
                     </tr>
                    <tr>
                       <td>{{$t("user-management.agent-status")}}</td>
                       <td>
                            <span class="badge-pill badge-soft-info px-2 py-1 rounded mr-1" v-if="agent.auto_recieve">
                               {{$t("user-management.auto-recieve")}}
                            </span>
                            <span class="badge-pill badge-soft-warning px-2 py-1 rounded mr-1" v-if="agent.is_in_case">
                                {{$t("user-management.is-in-case")}}
                            </span>
                            <span class="badge-pill badge-soft-success px-2 py-1 rounded mr-1"  v-if="agent.is_ready">
                                {{$t("user-management.is-ready")}}
                            </span>
                       </td>
                     </tr>
                     <tr>
                       <td>{{$t("user-management.is-ready")}}</td>
                       <td>{{agent.is_ready}}</td>
                     </tr>
                     <tr>
                       <td>{{$t("all.updated-at")}}</td>
                       <td>{{agent.updated_at}}</td>
                     </tr>
                    <tr>
                       <td>{{$t("all.created-at")}}</td>
                       <td>{{agent.created_at}}</td>
                     </tr>
                   </tbody>
                 </table>
               </div>
          </div>
        </div>
      </div>
       <div class="col-6">
        <div class="card h-100">
          <div class="card-body">
              <h5 class="card-title"><b>{{$t("agen-detail.device-info")}}</b></h5>
               <div class="table-responsive">
                 <table class="table table-bordered text-muted">
                   <tbody>
                     <tr>
                       <td width="25%">{{$t("agen-detail.model")}}</td>
                       <td>Android SDK built for x86</td>
                     </tr>
                     <tr>
                       <td>ID</td>
                       <td>QSR1.190920.001</td>
                     </tr>
                     <tr>
                       <td>SDK</td>
                       <td>27</td>
                     </tr>
                     <tr>
                       <td>{{$t("agen-detail.manufacture")}}</td>
                       <td>Google</td>
                     </tr>
                     <tr>
                       <td>{{$t("agen-detail.brand")}}</td>
                       <td>Google</td>
                     </tr>
                     <tr>
                       <td>{{$t("agen-detail.user")}}</td>
                       <td>android-build</td>
                     </tr>
                     <tr>
                       <td>{{$t("agen-detail.type")}}</td>
                       <td>User</td>
                     </tr>
                     <tr>
                       <td>{{$t("agen-detail.base")}}</td>
                       <td>1</td>
                     </tr>
                       <tr>
                       <td>{{$t("agen-detail.incremental")}}</td>
                       <td>5891938</td>
                     </tr>
                     <tr>
                       <td>{{$t("agen-detail.board")}}</td>
                       <td>goldfish_x86</td>
                     </tr>
                     <tr>
                       <td>{{$t("agen-detail.host")}}</td>
                       <td>wpra9.hot.corp.google.com</td>
                     </tr>
                     <tr>
                       <td>{{$t("agen-detail.finger-print")}}</td>
                       <td>google/sdk_gphone_x86/generic_x86:10/QSR1.190920.001/5891938:user/release-keys</td>
                     </tr>
                      <tr>
                       <td>{{$t("agen-detail.version-code")}}</td>
                       <td>10</td>
                     </tr>
                   </tbody>
                 </table>
               </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import Vue from "vue";
import Swal from "sweetalert2";
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
import appConfig from "@/app.config";
import { required, sameAs } from "vuelidate/lib/validators";
import AgenService from "@/helpers/agen.service";
import store from '@/state/store';
import moment from "moment";
import DatePicker from "vue2-datepicker";
import Switches from "vue-switches";
import Multiselect from "vue-multiselect";
// import * as VueGoogleMaps from 'vue2-google-maps'

export default {
  page: {
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: { Layout, PageHeader,  DatePicker, Switches, Multiselect},
  data() {

     let clusterStyles = [{
      url: "/static/rec50.png",
      width: 50,
      height: 50,
      textSize: 12,
      textColor: '#fff',
      anchorText : [19, 0],
    }]

    return {
      id: this.$route.params.id,
      urlImage: process.env.VUE_APP_BASE_API_URL_AVATAR,
      user_type: '',
      agent: "",
      theme: "light",
      daterange: "",
      loading_tracking: false,
      result_tracking: [],
      title: this.$t("user-management.agen-management-detail"),
      items: [
        {
          text: this.$t("menuitems.dashboards.text"),
          href: "#",
        },
        {
          text: this.$t("user-management.agen-management"),
          href: "#",
        },
         {
          text: this.$t("user-management.agen-management-detail"),
          active: true,
        },
      ],
      markers: [
        {
          position: { lat: -7.783992353559322, lng: 110.37170620265111 }
        },
        {
          position: { lat: -7.77062298441253, lng: 110.46041339623409 }
        }
      ],
      maploc:[],
      openedMarkerID: null,
      clusterIcon: clusterStyles,
      track_location:true,
      path: [],
      drawpath: false,
      measure_distance: false,
      distance: "",
      poi: false,
      firstpoint: {
        on: false,
        lat: 0,
        lng: 0
      },
      secondpoint: {
        on: false,
        lat: 0,
        lng: 0
      },
      start_point: {
        lat: 0,
        lng: 0
      },
      end_point: {
        lat: 0,
        lng: 0
      },
      trackerpoint: [],
      center: {lat: -2.687944013464189, lng: 117.81568343337175},
      zoom: 5,
      line1: [],
  }
},
//  computed: {
//     // google: VueGoogleMaps

//     // AIzaSyC7by8rqUbuDbM4eJogW4tONHZzl66D5CA

//   },

 methods: {
    getAgent() {
      AgenService.getDetailAgent(this.id)
        .then((response) => {
            this.agent = "";
            const data = {
              id_agent: response.data.data.id_agent,
              nik: response.data.data.nik,
              address: response.data.data.address,
              birth_date: response.data.data.birth_date,
              agent_location: response.data.data.agent_location,
              agent_status: response.data.data.agent_status,
              is_ready: response.data.data.is_ready,
              is_in_case: response.data.data.is_in_case,
              auto_recieve: response.data.data.auto_recieve,
              device_name: response.data.data.device_name,
              device_token: response.data.data.device_token,
              id_region: response.data.data.id_region,
              name: response.data.data.account.name,
              phone: response.data.data.account.phone,
              gender: response.data.data.account.gender,
              email: response.data.data.account.email,
              email_verified_at: response.data.data.account.email_verified_at,
              profile_pict: response.data.data.account.profile_pict,
              is_active: response.data.data.account.is_active,
              active_until: response.data.data.account.active_until,
              is_login: response.data.data.account.is_login,
              created_at: this.formatDate(response.data.data.created_at),
              updated_at: this.formatDate(response.data.data.updated_at),
            };
            this.agent = data;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    mapTheme(){
      let darkMode = {
        styles: [
            {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
            {
                featureType: 'administrative.locality',
                elementType: 'labels.text.fill',
                stylers: [{color: '#d59563'}]
            },
            {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: this.poi == true ? [{color: '#d59563'}] : [{visibility: 'off'}] 
            },
            {
                featureType: 'poi',
                elementType: 'labels.icon',
                stylers: this.poi == true ? [] : [{visibility: 'off'}] 
            },
            {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: this.poi == true ? [{color: '#d59563'}] : [{visibility: 'off'}] 
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.icon',
                stylers: this.poi == true ? [] : [{visibility: 'off'}] 
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: this.poi == true ? [{color: '#d59563'}] : [{visibility: 'off'}] 
            },
            {
              featureType: "poi.business",
              stylers: this.poi == true ? [{color: '#d59563'}] : [{visibility: 'off'}]
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{color: '#38414e'}]
            },
            {
                featureType: 'road',
                elementType: 'geometry.stroke',
                stylers: [{color: '#212a37'}]
            },
            {
                featureType: 'road',
                elementType: 'labels.text.fill',
                stylers: [{color: '#9ca5b3'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{color: '#746855'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{color: '#1f2835'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'labels.text.fill',
                stylers: [{color: '#f3d19c'}]
            },
            {
                featureType: 'transit',
                elementType: 'geometry',
                stylers: this.poi == true ? [{color: '#d59563'}] : [{visibility: 'off'}] 
            },
            {
                featureType: 'transit',
                elementType: 'labels.icon',
                stylers: this.poi == true ? [] : [{visibility: 'off'}] 
            },
            {
                featureType: 'transit.station',
                elementType: 'labels.text.fill',
                stylers: this.poi == true ? [{color: '#d59563'}] : [{visibility: 'off'}] 
            },
            {
                featureType: 'water',
                elementType: 'geometry',
                stylers: [{color: '#17263c'}]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{color: '#515c6d'}]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.stroke',
                stylers: [{color: '#17263c'}]
            }
        ]
      };

      let lightMode =  {
        styles: [
            {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: this.poi == true ? [{visibility: 'on'}] : [{visibility: 'off'}]
            },
            {
                featureType: 'poi',
                elementType: 'labels.icon',
                stylers: this.poi == true ? [{visibility: 'on'}] : [{visibility: 'off'}] 
            },
            {
                featureType: 'poi.park',
                elementType: 'geometry',
                stylers: this.poi == true ? [{visibility: 'on'}] : [{visibility: 'off'}]
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.icon',
                stylers: this.poi == true ? [{visibility: 'on'}] : [{visibility: 'off'}] 
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: this.poi == true ? [{visibility: 'on'}] : [{visibility: 'off'}]
            },
            {
                featureType: 'transit',
                elementType: 'geometry',
                stylers: this.poi == true ? [{visibility: 'on'}] : [{visibility: 'off'}]
            },
            {
                featureType: 'transit',
                elementType: 'labels.icon',
                stylers: this.poi == true ? [{visibility: 'on'}] : [{visibility: 'off'}]
            },
            {
                featureType: 'transit.station',
                elementType: 'labels.text.fill',
                stylers: this.poi == true ? [{visibility: 'on'}] : [{visibility: 'off'}]
            },
        ]
      };

      if (this.theme != 'dark') {
        return lightMode;
      }else{
        return  darkMode;
      }
    },

    measureDistance(event){
      if (this.measure_distance == true) {
        this.setDistanceMarker(event.latLng.lat(), event.latLng.lng())
      } else {
        console.log('Normal Mode');
      }
    },

    getDistance(){
      const latA = parseFloat(this.firstpoint.lat);
      const lngA = parseFloat(this.firstpoint.lng);
      const latB = parseFloat(this.secondpoint.lat);
      const lngB = parseFloat(this.secondpoint.lng);
      let d = (google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(latA, lngA), new google.maps.LatLng(latB, lngB))/1000).toFixed(2);

      this.distance = d
    },

    setDistanceMarker(lat, lng){
      if(this.firstpoint.on == false){
        this.firstpoint.on  = true;
        this.firstpoint.lat = lat;
        this.firstpoint.lng = lng;
      }else if(this.secondpoint.on == false){
        this.secondpoint.on  = true;
        this.secondpoint.lat = lat;
        this.secondpoint.lng = lng;
      }else{
        this.resetDistanceMarker();
      }

      this.getDistance();
    },

    unsetDistanceMarker(point){
      if(point == 'first'){
        this.firstpoint.on  = false;
        this.firstpoint.lat = 0;
        this.firstpoint.lng = 0;
      }else if(point == 'second'){
        this.secondpoint.on  = false;
        this.secondpoint.lat = 0;
        this.secondpoint.lng = 0;
      }
    },

    resetDistanceMarker(){
      this.firstpoint.on  = false;
      this.firstpoint.lat = 0;
      this.firstpoint.lng = 0;
      this.secondpoint.on  = false;
      this.secondpoint.lat = 0;
      this.secondpoint.lng = 0;
    },

    distanceMode(){
      if (this.measure_distance == true) {
          this.measure_distance = false
          this.resetDistanceMarker();
      }else{
        this.measure_distance = true
      }
    },

    poiView(){
      if (this.poi == true) {
          this.poi = false
          console.log('poi->', this.poi);
      }else{
        this.poi = true
        console.log('poi->', this.poi);
      }
    },

    Tracking(){
      this.loading_tracking = true;
      this.result_tracking = [];
      let time = this.daterange;
      let startx = time[0];
      let endx = time[1];
      let start = this.formatDateRange(startx);
      let end = this.formatDateRange(endx);
      let data = {
            "date_start" : start,
            "date_end" : end
       }
      console.log(data);
       AgenService.TrackingAgent(this.id, data)
        .then((response) => {
          console.log(response.data.data);
          // this.result_tracking = response.data.data;
          this.loading_tracking = false;
           response.data.data.forEach((val) => {
            const data = {
              id: val.id,
              id_user: val.id_user,
              lat: val.lat,
              lng: val.lng,
              updated_at: val.updated_at,
              coordinate: val.coordinate,
              created_at: val.created_at,
              delivery_time: val.delivery_time
            };
            this.result_tracking.push(data);
          });
        })
        .catch((err) => {
          console.log(err);
          this.loading_tracking = false;
        });
    },

   openMarker(id) {
      this.openedMarkerID = id
    },

    trafficMode() {
      this.$refs.mymap.$mapPromise.then(map => {
        const trafficLayer = new google.maps.TrafficLayer()
        trafficLayer.setMap(map);
      });
    },

    setCheck(id){
      for (let i = 0; i < this.line1.length; i++) {
        if (id == this.line1[i].id) {
          return true;
        }  
      }
      return false
    },

    setTrackerPoint(id, lat, lng, date){
      let data = {
        id: id,
        lat: lat,
        lng: lng,
        date: date
      }
      console.log(data);
      this.$refs.mymap.$mapPromise.then(map => {
        if (this.trackerpoint.length == 0) {
          console.log('ifff');
          this.trackerpoint.push(data);
          this.path.push({lat: parseFloat(lat), lng: parseFloat(lng)});
          this.center = {lat: parseFloat(lat), lng: parseFloat(lng)};
          this.zoom = 12;
          this.line1.push({
            "id": id,
            // "path" : new google.maps.Polyline({map: map,
            //   strokeColor: this.theme == 'dark' ? "#991b1b" : "#EF4444", 
            //   stokeOpacity: 0.5,
            //   strokeWeight: 2,
            //   geodesic: true,
            //   path: this.path
            // })
          });
        }else{
          console.log('else');
          if (this.checkTrackerPoint(id) == 'unchecked') {
            this.trackerpoint.push(data);
            this.path.push({lat: parseFloat(lat), lng: parseFloat(lng)});
            this.center = {lat: parseFloat(lat), lng: parseFloat(lng)};
            this.zoom = 12;
            this.line1.push({
              "id": id,
              // "path" : new google.maps.Polyline({map: map,
              //   strokeColor: this.theme == 'dark' ? "#991b1b" : "#EF4444", 
              //   stokeOpacity: 0.5,
              //   strokeWeight: 2,
              //   geodesic: true,
              //   path: this.path
              // })
            });
          } else if (this.checkTrackerPoint(id) == 'checked') {
            let indexpoint = '';
            let indexpath = '';
            this.trackerpoint.map(function(val, index) {
              if (val.id == id) {
                indexpoint = index;
              }
            })
            this.path.map(function(val, index) {
              if (parseFloat(val.lat) == parseFloat(lat)) {
                indexpath = index;
              }
            })
            this.trackerpoint.splice(indexpoint, 1);
            this.path.splice(indexpath, 1);
            this.zoom = 12;
            for (let i = 0; i < this.line1.length; i++) {
              this.line1[i].path.setMap(null)
            }
            this.line1.push({
              "id": id,
              // "path" : new google.maps.Polyline({map: map,
              //   strokeColor: this.theme == 'dark' ? "#991b1b" : "#EF4444", 
              //   stokeOpacity: 0.5,
              //   strokeWeight: 2,
              //   geodesic: true,
              //   path: this.path
              // })
            });
          }
        }
      });
    },

    checkTrackerPoint(id){
      for (let i = 0; i < this.trackerpoint.length; i++) {
        if (id == this.trackerpoint[i].id) {
          return 'checked';
        }
      }
      return 'unchecked';
    },

    setControl(){
      const centerControlDiv = this.$refs.custom;
      this.$refs.mymap.$mapPromise.then(map => {
        map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(centerControlDiv);
      });
    },

     startIcon(){
      const icon = {
        path: "M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z",
        fillColor: "blue",
        fillOpacity: 1,
        strokeColor: "#636363",
        strokeWeight: 0.5,
        rotation: 0,
        scale: 1.8,
        anchor: new google.maps.Point(0, 0)
      }
      return icon;
    },

    endIcon(){
      const icon = {
        path: "M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z",
        fillColor: "green",
        fillOpacity: 1,
        strokeColor: "#636363",
        strokeWeight: 0.5,
        rotation: 0,
        scale: 1.8,
        anchor: new google.maps.Point(0, 0)
      }

      return icon;
    },

    formatDateRange(value) {
      return moment(value).format("YYYY-MM-DD");
    },
    

    formatDate(value) {
      return moment(value).format("YYYY-MM-DD, hh:mm:ss");
    },
  },
  mounted() {
    this.getAgent();
    // this.trackLocation();
    this.setControl();
    this.trafficMode();
  },
}
</script>

<style scoped>
.badge {
  border-radius: 2%;
}

.maps{
  width: 100%;
  height: 560px;
}
.clusterMap .cluster img{
  object-fit: cover !important;
}
.custom-scroll::-webkit-scrollbar {
  width: 0px;
}

</style>
