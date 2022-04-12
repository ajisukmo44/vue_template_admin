<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
      <div class="row mb-4">
      <div class="col-xl-5">
        <div class="card overflow-hidden">
          <div class="bg-soft-primary">
            <div class="row">
              <div class="col-7">
                <div class="text-primary p-3">
                  <!-- <h5 class="text-primary">Welcome Back !</h5>
                  <p>It will seem like simplified</p> -->
                </div>
              </div>
              <div class="col-5 align-self-end">
                <img src="@/assets/images/profile-img.png" alt class="img-fluid" />
              </div>
            </div>
          </div>
          <div class="card-body pt-0">
            <div class="row">
              <div class="col-sm-6">
                <div class="avatar-md profile-user-wid mb-4">
                  <img
                    src="@/assets/images/users/avatar-10.jpg"
                    alt
                    class="img-thumbnail rounded-circle"
                  />
                </div>
                <h4 class="font-size-16 text-truncate"><b> {{customer.name}}</b></h4>
                <p class="text-muted mb-0 text-truncate"> {{customer.email}}</p>
              </div>

              <div class="col-sm-6">
                <div class="pt-4">
                  <div class="row">
                    <div class="col-12 mb-2">
                      <span class="btn btn-success rounded p-1 px-2 mr-1 mb-1 font-size-12" v-if="customer.is_subscribe"> <i class="bx bx-check-square font-size-12"></i>  {{$t("user-management.subscribe")}} </span>
                      <span class="btn btn-info rounded p-1 px-2 mr-1 mb-1  font-size-12" v-if="customer.is_trial && !customer.is_subscribe"><i class="bx bx-calendar font-size-12"></i>  {{$t("user-management.trial")}} </span>
                      <span class="btn btn-primary rounded p-1 px-2 mr-1 mb-1 font-size-12" v-if="customer.is_pay"><i class="bx bx-money font-size-12"></i>  {{$t("user-management.pay")}} </span>
                      <span class="btn btn-danger rounded p-1 px-2 mr-1 mb-1 font-size-12" v-if="customer.is_banned"><i class="bx bx-lock font-size-12"></i>  {{$t("user-management.banned")}} </span>
                      <span class="btn btn-light rounded p-1 px-2 mr-1 font-size-12" v-if="!customer.is_banned && !customer.is_pay && !customer.is_trial && !customer.is_subscribe"> - </span>
                      <div v-if="customer.is_subscribe">
                          <span class="btn btn-sm btn-secondary mb-1">{{$t("user-management.expired")}} : {{customer.subscription_expire_date}} </span>
                      </div>
                      <div v-if="customer.is_trial && !customer.is_subscribe">
                          <span class="btn btn-sm btn-secondary mb-1">{{$t("user-management.expired")}} : {{customer.trial_expire_date}}</span>
                      </div>
                    </div>
                  </div>
                  <!-- <div class="mt-4">
                    <a href class="btn btn-success btn-sm">
                      {{$t("user-management.subscribe")}}
                    </a>
                  </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- end card -->

        <div class="card border-top">
          <div class="card-body">
            <strong class="card-title mb-1">{{$t("user-management.personal-information")}}</strong>
            <div class="table-responsive mb-0">
              <table class="table">
                <tbody>
                  <tr>
                    <th scope="row" width="30%">{{$t("user-management.name")}} </th>
                    <td> {{customer.name}}</td>
                  </tr>
                  <tr>
                    <th scope="row">{{$t("user-management.phone")}}</th>
                    <td> {{customer.phone}}</td>
                  </tr>
                  <tr>
                    <th scope="row">{{$t("user-management.gender")}}</th>
                    <td> {{customer.gender}}</td>
                  </tr>
                   <!-- <tr>
                    <th scope="row">{{$t("user-management.status")}}</th>
                    <td>
                      <span class="badge badge-success rounded p-1 px-2 mr-1 font-size-12" v-if="customer.is_subscribe">  {{$t("user-management.subscribe")}} </span>
                      <span class="badge badge-warning rounded p-1 px-2 mr-1 font-size-12" v-if="customer.is_trial">  {{$t("user-management.trial")}} </span>
                      <span class="badge badge-primary rounded p-1 px-2 mr-1 font-size-12" v-if="customer.is_pay">  {{$t("user-management.pay")}} </span>
                      <span class="badge badge-danger rounded p-1 px-2 mr-1 font-size-12" v-if="customer.is_banned">  {{$t("user-management.banned")}} </span>
                      <span class="badge badge-light rounded p-1 px-2 mr-1 font-size-12" v-if="!customer.is_banned && !customer.is_pay && !customer.is_trial && !customer.is_subscribe"> - </span>
                    </td>
                  </tr> -->
                  <!-- <tr v-if="customer.is_subscribe">
                    <th scope="row">{{$t("user-management.subscription-expire-date")}}</th>
                    <td> {{customer.subscription_expire_date}}</td>
                  </tr>
                  <tr v-if="customer.is_trial">
                    <th scope="row">{{$t("user-management.trial-expire-date")}}</th>
                    <td> {{customer.trial_expire_date}}</td>
                  </tr> -->
                  <tr>
                    <th scope="row">{{$t("user-management.device-name")}}</th>
                    <td>{{customer.device_name}}</td>
                  </tr>
                  <tr>
                    <th scope="row">{{$t("user-management.device-token")}}</th>
                    <td>{{customer.device_token}}</td>
                  </tr>
                  <tr>
                    <th scope="row">Status</th>
                    <td>
                      <span class="badge badge-soft-success rounded p-1 px-2 mr-1 font-size-12" v-if="customer.is_active">  Active</span>
                      <span class="badge badge--soft-danger rounded p-1 px-2 mr-1 font-size-12" v-if="!customer.is_active">  Non Active </span>  
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">{{$t("all.created-at")}}</th>
                    <td> {{customer.created_at}}</td>
                  </tr>
                  <tr>
                    <th scope="row">{{$t("all.updated-at")}}</th>
                    <td> {{customer.updated_at}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <!-- end card -->
      </div>

      <div class="col-xl-7">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title mb-2">{{$t("user-management.order-history")}}</h5>
            <div class="table-responsive mb-0">
              <table class="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th scope="col" class="text-center" width="5%">#</th>
                    <th scope="col">{{$t("case.title")}}</th>
                    <th scope="col">{{$t("case.incident-date")}}</th>
                    <th scope="col">Status</th>
                    <th scope="col" class="text-left" width="10%">{{$t("button.action")}}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row" class="text-center">1</th>
                    <td>Pengamanan </td>
                    <td>2 September, 2019</td>
                    <td>Selesai</td>
                    <td><a href="http://" target="_blank" rel="noopener noreferrer" class="text-info">{{$t("button.view")}}</a></td>
                  </tr>
                  <tr>
                    <th scope="row" class="text-center">2</th>
                    <td>Pengamanan </td>
                    <td>2 September, 2019</td>
                    <td>Selesai</td>
                    <td><a href="http://" target="_blank" rel="noopener noreferrer" class="text-info">{{$t("button.view")}}</a></td>
                  </tr>
                     <tr>
                    <th scope="row" class="text-center">3</th>
                    <td>Pengamanan </td>
                    <td>2 September, 2019</td>
                    <td>Selesai</td>
                    <td><a href="http://" target="_blank" rel="noopener noreferrer" class="text-info">{{$t("button.view")}}</a></td>
                  </tr>
                  <tr>
                    <th scope="row" class="text-center">4</th>
                    <td>Pengamanan </td>
                    <td>2 September, 2019</td>
                    <td>Selesai</td>
                    <td><a href="http://" target="_blank" rel="noopener noreferrer" class="text-info">{{$t("button.view")}}</a></td>
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
import CustomerService from "@/helpers/customer.service";
import store from '@/state/store';
import moment from "moment";

export default {
  page: {
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: { Layout, PageHeader },
  data() {
    return {
      id: this.$route.params.id,
      urlImage: process.env.VUE_APP_BASE_API_URL_AVATAR,
      user_type: '',
      title: this.$t("user-management.customer-management"),
      items: [
        {
          text: this.$t("menuitems.dashboards.text"),
          href: "#",
        },
         {
          text: this.$t("user-management.customer-management"),
          href: "/customer-management",
        },
        {
          text: this.$t("user-management.customer-management-detail"),
          active: true,
        },
      ],
      customer: [],
    };
  },
 
  methods: {
    getCustomerDetail() {
      CustomerService.getDetailCustomer(this.id)
        .then((response) => {
          this.customer = [];
            const data = {
              id_customer: response.data.data.id_customer,
              name: response.data.data.account.name,
              phone: response.data.data.account.phone,
              gender: response.data.data.account.gender,
              email: response.data.data.account.email,
              email_verified_at: response.data.data.account.email_verified_at,
              profile_pict: response.data.data.account.profile_pict,

              id_package: response.data.data.id_package,  
              is_subscribe: response.data.data.is_subscribe,
              is_pay: response.data.data.is_pay,  
              is_banned: response.data.data.is_banned,
              is_trial: response.data.data.is_trial,  
              is_active: response.data.data.account.is_active,
              subscription_expire_date: this.formatDate(response.data.data.subscription_expire_date),  
              trial_expire_date: this.formatDate(response.data.data.trial_expire_date),
              device_name: response.data.data.device_name,  
              device_token: response.data.data.device_token,

              created_at: this.formatDate(response.data.data.created_at),
              updated_at: this.formatDate(response.data.data.updated_at),
            };
            this.customer = data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  
    formatDate(value) {
      return moment(value).format("YYYY-MM-DD, hh:mm");
    },
  },
  beforeMount(){
    // this.list();
  },
  mounted() {
    this.getCustomerDetail();
  },
};
</script>

<style scoped>
.badge {
  border-radius: 2%;
}

</style>
