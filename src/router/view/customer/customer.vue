<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body" v-if="loading">
            <div class="row mt-5 mb-5 pb-4 mx-auto">
                <div class="col-12 p-5 m-4 text-center">
                    <div class="spinner-border text-secondary" role="status" v-if="loading">
                        <span class="sr-only">Loading..</span>
                      </div>
                </div>
            </div>
          </div>
          <div class="card-body" v-if="!tableData[0] && !loading">
              <div  class="row  mt-5 mb-5 pb-4 mx-auto">
                  <div class="col-12  p-5 my-5 text-center">
                      <span class="text-secondary">{{ $t('all.dnf') }}</span>  
                  </div>
              </div>
          </div>
          <div class="card-body" v-if="tableData[0] && !loading">
             <div class="row mb-0">
                 <div class="col-5 col-xl-7">
                  <div class="">
                      <b-dropdown class="btn-group mr-2 mb-2 mb-sm-0 border" variant="white">
                        <template slot="button-content">
                          {{ $t('table.show-label') }}
                          <i class="mdi mdi-chevron-down ml-2"></i>
                        </template>
                        <span v-for="val in pageOptions" :key="val">
                            <button class="dropdown-item" @click="perPageSelect(val)">
                              <span class="text-success" v-if="val == perPage"><b> {{val}} </b></span>
                              <span v-else>{{val}}</span>
                            </button>
                        </span>
                      </b-dropdown>
                      <b-dropdown class="btn-group mr-2 mb-2 mb-sm-0 border" variant="white" v-if="selected[0]">
                        <template slot="button-content">
                          {{ $t('button.bulk-action') }}
                          <i class="mdi mdi-chevron-down ml-2"></i>
                        </template>
                        <button class="dropdown-item" @click="bulkAction()">{{ $t('button.hapus.text') }}</button>
                      </b-dropdown>
                  </div>
              </div>
              <div class="col-4 col-xl-3">
              </div>
                <div class="col-3 col-xl-2">
                  <div class="form-group has-search">
                    <span class="bx bx-search-alt search-icon form-control-feedback"></span>
                      <b-form-input
                      v-model="filter"
                      type="search"
                      :placeholder="$t('navbar.search.text')"
                      class="form-control"
                    ></b-form-input>
                  </div>
              </div>
              <!-- end col-->
             </div>
            <!-- Table -->
            <div class="table-responsive mb-0">
              <b-table
                :items="tableData"
                :fields="fields"
                bordered
                striped
                responsive="sm"
                :per-page="perPage"
                :current-page="currentPage"
                :sort-desc.sync="sortDesc"
                :filter="filter"
                :filter-included-fields="filterOn"
                @filtered="onFiltered"
              >
              <template #head(bulk) width="4%">
                  <b-form-checkbox
                          v-model="selectAll" 
                          @change="select"
                          class="text-center mt-0">
                  </b-form-checkbox>
               </template>
              <template #cell(bulk)="row" width="4%">
              <b-form-checkbox
                class="text-center mt-2"
                v-model="selected"
                :value="row.item.id_customer"
              >
              </b-form-checkbox>
              </template>
                <template #cell(customer)="row"> 
                <div class="col-sm-12">
                    <div class="media">
                      <img
                          src="@/assets/images/users/avatar-10.jpg"
                          class="mr-3 rounded-circle avatar-sm"
                          alt="user-pic"
                          />
                      <div class="media-body">
                          {{row.item.name}}<br> 
                          <span class="text-secondary"> {{row.item.email}}</span> <br>
                      </div>
                    </div>
                </div>
                </template>
                    <template #cell(is_subscribe)="row">
                      <div  v-if="row.item.is_subscribe">
                      <span class="badge badge-success font-size-12 px-2 mb-1  rounded">
                          {{ $t("user-management.subscribe") }} 
                      </span> <br>
                      <span class="text-secondary badge badge-soft-danger p-1 px-2 font-size-11 mb-1 rounded">
                          {{ $t("user-management.expired") }} : {{row.item.subscription_expire_date}}
                      </span>  
                      </div>
                      <div  v-if="row.item.is_trial && !row.item.is_subscribe">
                      <span class="badge badge-info font-size-12 px-2 mb-1 rounded">
                            {{ $t("user-management.trial") }}  
                      </span>
                      <br>
                        <span class="text-secondary badge badge-soft-danger p-1 px-2 font-size-11 mb-1 rounded" >
                             {{ $t("user-management.expired") }}  : {{row.item.trial_expire_date}}
                          </span>
                      </div>
                      <span class="" v-if="!row.item.is_trial && !row.item.is_subscribe">
                          -
                      </span>
                </template>
                <template #cell(actions)="row">
                  <router-link :to="{ name: 'customer-management-detail', params: { id:row.item.id_customer }}" class="mr-1"> 
                    <b-button class="btn btn-sm" variant="info">View Detail</b-button>
                    </router-link>
                  <!-- <b-button class="btn btn-sm mr-1" variant="info"><i class="bx bx-pencil"></i> </b-button> -->
                  <!-- <b-button class="btn btn-sm" variant="danger" @click="deleteUser(row.item.id_customer)"><i class="bx bx-trash"></i> </b-button> -->
                </template>
              </b-table>
            </div>
             <div class="row" v-if="rows > 10">
               <div class="col-6 text-left">
                <div class="text-muted float-left">
                    {{ $t('table.show-label') }} <b>{{perPage}} </b>{{ $t('table.entri-label') }}
                </div>
              </div>
              <div class="col-6 text-right">
                <div class="dataTables_paginate paging_simple_numbers float-right">
                  <ul class="pagination pagination-rounded mb-0">
                    <!-- pagination -->
                    <b-pagination
                      v-model="currentPage"
                      :total-rows="rows"
                      :per-page="perPage"
                    ></b-pagination>
                  </ul>
                </div>
              </div>
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
import UserService from "@/helpers/user.service";
import store from '@/state/store';
import moment from "moment";

export default {
  page: {
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: { Layout, PageHeader },
  data() {
    return {
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
          active: true,
        },
      ],
      loading:false,
      tableData:[],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filter: null,
      filterOn: [],
      sortDesc: false,
      selected:[],
      selectAll: false,
      fields: [
        { key: "id_customer", thClass: "d-none", tdClass: "d-none" },
         { key: "bulk",  thStyle: { width: "2%" }, label:'#'},
        {
          key: "customer",
          sortable: true,
          label: this.$t("user-management.customer"),
        },
        {
          key: "phone",
          sortable: true,
          label: this.$t("user-management.phone"),
        },
        {
          key: "gender",
          sortable: true,
          label: this.$t("user-management.gender"),
        },
        { 
          key: "is_subscribe",
          sortable: true,
          label: this.$t("user-management.subscribe"),
        },
        { key: "avatar", thClass: "d-none", tdClass: "d-none" },
        {
          key: "actions",
          class: "text-center",
          label: this.$t("user-management.action"),
        },
      ],
      form: {
        user: {
          username: "",
          email: "",
          password: "",
          active_until: "",
          user_type: "",
          is_active: 0,
        },
        pass: {
          new_password: "",
          confirm_password: "",
        },
      },
      show: {
        new: false,
        conf: false,
      },
      submitted: false,
    };
  },
  computed: {
    rows() {
      return this.tableData.length;
    },
  },
  methods: {
    select() {
        this.selected = [];
        if (!this.selectAll) {
            for (let i in this.tableData) {
                this.selected.push(this.tableData[i].id_customer);
            }
        }
    },
    list(){
      UserService.getProfile()
      .then(response => {
        console.log(response.data.data);
        this.user_type = response.data.data.admin.role;
      })
      .catch(e => {
        this.message = e.response.data.data
      });
    },
    getCustomer() {
      this.loading = true;
      CustomerService.getAllCustomer()
        .then((response) => {
          this.tableData = [];
          console.log(response.data.data);
          response.data.data.forEach((val) => {
            const data = {
              id_customer: val.id_customer,
              name: val.account.name,
              phone: val.account.phone,
              gender: val.account.gender,
              email: val.account.email,
              email_verified_at: val.account.email_verified_at,
              avatar: val.account.profile_pict,

              id_package: val.id_package,  
              is_subscribe: val.is_subscribe,
              is_pay: val.is_pay,  
              is_banned: val.device_token,
              is_trial: val.is_trial,  
              subscription_expire_date: this.formatDate(val.subscription_expire_date),  
              trial_expire_date: this.formatDate(val.trial_expire_date),
              device_name: val.device_name,  
              device_token: val.device_token,

              created_at: this.formatDate(val.created_at),
              updated_at: this.formatDate(val.updated_at),
            };
            this.tableData.push(data);
            this.loading = false;
          });
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },

    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    onDelete(id) {
      console.log("delete data:", id);
    },
    onView(id) {
      console.log("details data:", id);
    },
    perPageSelect(val){
      this.perPage = val;
      console.log(this.perPage);
      this.$refs.dropdown.hide();
    },
    formatDate(value) {
      return moment(value).format("YYYY-MM-DD");
    },
  },
  beforeMount(){
    this.list();
  },
  mounted() {
    this.totalRows = this.items.length;
    this.getCustomer();
  },
};
</script>

<style scoped>
.badge {
  border-radius: 2%;
}

</style>
