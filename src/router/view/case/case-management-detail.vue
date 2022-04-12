<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <!-- <div class="row mb-4">
       <div class="col-12">
        <div class="card h-100">
          <div class="card-body">
            <div class="row mb-4">
            <div class="col-6">
                <h5 class="card-title"><b>{{$t("case.title")}}</b></h5>
            </div>
            <div class="col-6 text-right">
                <b-button class="btn btn-sm px-2" variant="success"><i class="bx bx-downvote"></i> Download </b-button>
            </div>
            </div>
            <div class="row mb-4">
              <div class="col-6">
                  <p class="card-title"><b>{{$t("case.category")}}</b></p>
                  <p class="card-title"><b>{{$t("case.classification")}}</b></p>
                  <p class="card-title"><b>{{$t("case.classification")}}</b></p>
                  <p class="card-title"><b>{{$t("case.classification")}}</b></p>
              </div>
              <div class="col-6 text-right">
                  <p><b>{{$t("all.created-at")}} : </b></p>
                  <p><b>{{$t("all.updated-at")}} : </b></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

     <div class="row mb-4">
       
     </div> -->
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
           <div class="row px-2">
             <div class="col-sm-6">
             </div>
             <div class="col-sm-6 text-right">
                  <b-button class="btn btn-sm px-2" variant="success"><i class="bx bx-downvote"></i> Download </b-button>
             </div>
           </div>
            <hr />
            <div class="row px-2">
              <div class="col-6">
                <address>
                  <strong class="mb-2">{{$t("case.agent")}}</strong> <br>
                      <span v-for="agen in agen_list" :key="agen.id">
                        <img
                          src="@/assets/images/users/avatar-10.jpg"
                          class="mr-1 mt-1 rounded-circle avatar-xs"
                          alt="user-pic"
                          :title="agen.agent.account.name" 
                          />
                      </span>
                </address>
              </div>
              <div class="col-6 text-right">
                <address>
                 <strong class="font-size-15">{{$t("case.customer")}}</strong>
                  <br />{{customer.account.name}} 
                  <br />{{customer.account.phone}}
                  <br />{{customer.account.email}}
                </address>

                {{agent}}
              </div>
            </div>
          
            <div class="p-2 mt-3">
              <!-- <h3 class="font-size-16">Description</h3> -->
              <table class="table table-bordered">
                  <tbody>
                    <tr>
                      <td>{{$t("case.incident-date")}}</td>
                      <td>{{detail_case.incident_date}}</td>
                    </tr>
                    <tr>
                      <td>{{$t("case.category")}}</td>
                      <td>{{detail_case.category}}</td>
                    </tr>
                    <tr>
                      <td>{{$t("case.classification")}}</td>
                      <td>{{detail_case.classification}}</td>
                    </tr>
                    <tr>
                      <td>{{$t("case.rating")}}</td>
                      <td>
                        <span v-for="index in parseFloat(rating)" :key="index">
                           <i class="bx bx-star mr-1"></i>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>{{$t("case.feedback")}}</td>
                      <td>-</td>
                    </tr>
                     
                    <tr>
                      <td>{{$t("case.case-status")}}</td>
                      <td>
                            <span class="badge-pill badge-soft-info px-2 py-1 rounded" v-if="detail_case.case_status == 'in_handling'">
                              {{detail_case.case_status}}
                            </span>
                            <span class="badge-pill badge-soft-warning px-2 py-1 rounded" v-if="detail_case.case_status == 'accepted'">
                                {{detail_case.case_status}}
                            </span>
                            <span class="badge-pill badge-soft-success px-2 py-1 rounded"  v-if="detail_case.case_status == 'completed'">
                                 {{detail_case.case_status}}
                            </span>
                      </td>
                    </tr>
                  </tbody>
              </table>
            </div>

              <div class="p-2 mt-3">
                  <h5 class="font-size-15"><strong>{{$t("case.agen-report")}}</strong></h5>
                      <div role="tablist">
                        <b-card no-body class="mb-1 shadow-none" v-for="(report, index) in agen_list" :key="report.id">
                          <b-card-header header-tag="header" role="tab" >
                           <div class="row">
                             <div class="col-sm-10">
                                  <h6 class="m-0">
                                     <a
                                        v-b-toggle="'accordion-'+report.id"
                                        class="text-dark btn-block"
                                        href="javascript: void(0);"
                                      >{{index+1}}. {{report.agent.account.name}}</a>
                                  </h6>
                             </div>
                             <div class="col-sm-2 text-right"  v-b-toggle="'accordion-'+report.id">
                                  <i class="bx bx-chevron-down bx"> </i>
                             </div>
                           </div>
                          </b-card-header>
                          <b-collapse :id="'accordion-'+report.id"  accordion="my-accordion" role="tabpanel" >
                            <b-card-body class="border">
                              <h6 class="pt-2"><b>{{$t("case.profile")}}</b></h6>
                              <table class="table table-bordered">
                                <tr>
                                  <th width="25%">NIK</th>
                                  <td>{{report.agent.nik}}</td>
                                </tr>
                                <tr>
                                  <th width="25%">{{$t("user-management.name")}}</th>
                                  <td>{{report.agent.account.name}}</td>
                                </tr>
                                <tr>
                                  <th width="25%">{{$t("user-management.region")}}</th>
                                  <td>{{report.agent.id_region}}</td>
                                </tr>
                                <tr>
                                  <th width="25%">{{$t("user-management.email")}}</th>
                                  <td>{{report.agent.account.email}}</td>
                                </tr>
                                <tr>
                                  <th width="25%">{{$t("user-management.phone")}}</th>
                                  <td>{{report.agent.account.phone}}</td>
                                </tr>
                                <tr>
                                  <th width="25%">{{$t("user-management.birth-date")}}</th>
                                  <td>{{report.agent.birth_date}}</td>
                                </tr>
                                <tr>
                                  <th width="25%">{{$t("user-management.gender")}}</th>
                                  <td>{{report.agent.account.gender}}</td>
                                </tr>
                                <tr>
                                  <th width="25%">{{$t("user-management.address")}}</th>
                                  <td>{{report.agent.address}}</td>
                                </tr>
                              </table>

                              <h6 class="pt-2" v-if="report.report"><b>{{$t("case.report")}}</b></h6>
                              <table class="table table-bordered" v-if="report.report">
                                <tr>
                                  <th width="25%">{{$t("case.id-report")}}</th>
                                  <td>{{report.report.id_report}}</td>
                                </tr>
                                <tr>
                                  <th width="25%">{{$t("case.id-case")}}</th>
                                  <td>{{report.report.id_case}}</td>
                                </tr>
                                <tr>
                                  <th width="25%">{{$t("case.title")}}</th>
                                  <td>{{report.report.title}}</td>
                                </tr>
                                <tr>
                                  <th width="25%">Status</th>
                                  <td>
                                     <span v-if="report.report.report_status == 'finished'" class="badge badge-soft-success py-1 px-2 font-size-12 rounded">{{report.report.report_status}}</span>
                                     <span v-if="report.report.report_status == 'accepted'" class="badge badge-info py-1 px-2 font-size-12 rounded">{{report.report.report_status}}</span>   
                                  </td>
                                </tr>
                                <tr>
                                  <th width="25%">{{$t("case.title")}}</th>
                                  <td>{{report.report.title}}</td>
                                </tr>
                                <tr>
                                  <th width="25%">{{$t("case.location-address")}}</th>
                                  <td>{{report.report.location_address}}</td>
                                </tr>
                                <tr>
                                  <th width="25%">{{$t("case.description")}}</th>
                                  <td>{{report.report.description}}</td>
                                </tr>
                                <tr>
                                  <th width="25%">{{$t("case.accepted")}}</th>
                                  <td>{{formatDate(report.report.accepted)}}</td>
                                </tr>
                                <tr>
                                  <th width="25%">{{$t("case.finished")}}</th>
                                  <td>{{formatDate(report.report.finished)}}</td>
                                </tr>
                                <tr>
                                  <td colspan="2">
                                      <!-- <b>{{$t("case.picture")}}</b> <br> -->
                                      <img src="@/assets/images/blog/img-2.jpg" class="img-fluid rounded w-20 p-1" v-if="report.report.picture1">
                                      <img src="@/assets/images/blog/img-2.jpg" class="img-fluid rounded w-20 p-1" v-if="report.report.picture2">
                                      <img src="@/assets/images/blog/img-2.jpg" class="img-fluid rounded w-20 p-1" v-if="report.report.picture3">
                                      <img src="@/assets/images/blog/img-2.jpg" class="img-fluid rounded w-20 p-1" v-if="report.report.picture4">
                                      <img src="@/assets/images/blog/img-2.jpg" class="img-fluid rounded w-20 p-1" v-if="report.report.picture5">
                                  </td>
                                </tr>
                              </table>
                             
                            </b-card-body>
                          </b-collapse>
                        </b-card>
                      </div>
              </div>
             </div>
            </div>
      </div>
      <div class="col-12">
        <div class="card">
          <div class="card-body px-2">
              <h5 class="font-size-15 px-3"><strong>{{$t("case.incident-location")}}</strong></h5>
                <!-- Map with markers -->
                <div class="card px-3" v-if="detail_case.location_coordinate">
                    <gmap-map ref="mymap" :center="{ lat: parseFloat(lat), lng: parseFloat(long) }" :zoom="8" style="height: 50vh">
                        <gmap-marker
                        :position="google && new google.maps.LatLng(lat, long)"
                        ></gmap-marker>
                    </gmap-map>
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
import UserService from "@/helpers/user.service";
import CaseService from "@/helpers/case.service";
import store from '@/state/store';
import moment from "moment";
import DatePicker from "vue2-datepicker";
import Switches from "vue-switches";
import Multiselect from "vue-multiselect";
import {gmapApi} from 'vue2-google-maps';

export default {
  page: {
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: { Layout, PageHeader,  DatePicker, Switches, Multiselect},
  data() {
    return {
      id_case: this.$route.params.id,
      urlImage: process.env.VUE_APP_BASE_API_URL_AVATAR,
      user_type: '',
      detail_case: [],
      lat:"",
      long:"",
      rating:"",
      agen_list:[],
      customer:[],
      daterange: "",
      title: this.$t("case.case-management-detail"),
      items: [
        {
          text: this.$t("menuitems.dashboards.text"),
          href: "#",
        },
        {
          text: this.$t("case.case-management"),
          href: "/case-management",
        },
         {
          text: this.$t("case.case-management-detail"),
          active: true,
        },
      ],
       markers: [
        {
          position: { lat: -7.783992353559322, lng: 110.37170620265111 }
        },
      ],
    }
  },
  computed: {  
       google: gmapApi,
  },
  watch: { 
          address: {
              handler: function(n, o) {
                  console.log(JSON.stringify(n));
                  this.count1 = n.count;
              },
              deep: true  
          }
  },
  methods: {
    getDetail(){
      CaseService.getCaseDetail(this.id_case)
        .then((response) => {
          this.detail_case = [];
          console.log(response.data.data);
            const data = {
              id_case: response.data.data.id_case,
              category: response.data.data.category,
              classification: response.data.data.classification,
              incident_date: this.formatDate(response.data.data.incident_date),
              location_coordinate: response.data.data.location_coordinate,
              id_customer: response.data.data.id_customer,
              rating: response.data.data.rating,
              feedback: response.data.data.feedback,
              case_status: response.data.data.status,
              created_at: this.formatDate(response.data.data.created_at),
              updated_at: this.formatDate(response.data.data.updated_at),
            };
            this.detail_case = data;
            this.agen_list = response.data.data.agentincasedetail;
            this.customer = response.data.data.customerdetail;
            let coordinate = response.data.data.location_coordinate;
            let location = coordinate.split(',');
            this.lat = location[0];
            this.long = location[1];
            this.rating = response.data.data.rating;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    formatDate(value) {
      return moment(value).format("YYYY-MM-DD, hh:mm");
    },
  },
  mounted(){
    this.getDetail();
    this.$watch(()=>this.openMap, () => {
          if (this.openMap == true) {
            var latlong = this.detail_case.incident_date;
              console.log(latlong);
              this.geocodedAddress();
          }
      })
  }
}
</script>

<style scoped>
.badge {
  border-radius: 2%;
}
.w-20{
  width: 20%;
}

</style>
