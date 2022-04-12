<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
          <div class="row mt-5 mb-5 pb-4 mx-auto" v-if="loading">
                <div class="col-12 p-5 m-4 text-center">
                    <div class="spinner-border text-secondary" role="status" v-if="loading">
                        <span class="sr-only">Loading..</span>
                      </div>
                </div>
            </div>
             <div class="row mb-0" v-if="!loading">
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
                            <button class="dropdown-item" @click="bulkAction()">Delete</button>
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
            <div class="table-responsive mb-0" :class="{ 'pb-5' : rows < 10 }">
              <div v-if="!loading">
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
                      class="text-center mt-0"
                          v-model="selected"
                          :value="row.item.id_case"
                        >
                      </b-form-checkbox>
                </template>
                <template #cell(case)="row">
                  <div class="col-sm-12">
                    <div class="media">
                      <img
                          src="@/assets/images/users/avatar-10.jpg"
                          class="mr-3 rounded-circle avatar-xs"
                          alt="user-pic"
                          />
                      <div class="media-body">
                        <b> {{row.item.customer.name}}</b> <br>
                        <p class="text-muted">{{row.item.incident_date}} </p> 
                      </div>
                    </div>
                </div>

                </template>
                <template #cell(id_agent)="row">
                    <div class="col-sm-12">
                        <span v-for="agen in row.item.agentincase" :key="agen.id">
                          <img
                            src="@/assets/images/users/avatar-10.jpg"
                            class="mr-1 rounded-circle avatar-xs"
                            alt="user-pic"
                            :title="agen.account.name" 
                            />
                        </span>
                    </div>    
                </template>

                <template #cell(classification)="row">
                      <span>{{row.item.classification}}</span>
                      <br>
                      <span class="text-muted"><i class="bx bxs-purchase-tag mr-1"></i>{{row.item.category}}</span>
                </template>
                 <template #cell(case_status)="row">
                      <span class="badge-pill badge-soft-info px-2 py-1 rounded" v-if="row.item.case_status == 'in_handling'">
                          {{row.item.case_status}}
                      </span>
                      <span class="badge-pill badge-soft-warning px-2 py-1 rounded" v-if="row.item.case_status == 'accepted'">
                          {{row.item.case_status}}
                      </span>
                      <span class="badge-pill badge-soft-success px-2 py-1 rounded"  v-if="row.item.case_status == 'completed'">
                          {{row.item.case_status}}
                      </span>
                </template>
                <template #cell(actions)="row">
                   <router-link :to="'/case-management-detail/'+row.item.id_case" class="btn btn-info btn-sm mr-1"> {{$t('button.detail')}} </router-link>
                   <button class="btn btn-danger btn-sm"><i class="bx bx-trash-alt"></i></button>
                </template>
              </b-table>
            </div>
            <div class="row" v-if="rows > 10">
              <div class="col">
                <div
                  class="dataTables_paginate paging_simple_numbers float-right"
                >
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

export default {
  page: {
    meta: [{ name: "description", content: appConfig.description }],
  },
  components: { Layout, PageHeader, DatePicker },
  data() {
    return {
      urlImage: process.env.VUE_APP_BASE_API_URL_AVATAR,
      user_type: '',
      tableData: [],
      daterange:'',
      loading: false,
      title: this.$t("case.case-management"),
      items: [
        {
          text: this.$t("menuitems.dashboards.text"),
          href: "#",
        },
        {
          text: this.$t("case.case-management"),
          active: true,
        },
      ],
      selected:[],
      selectAll: false,
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filter: null,
      filterOn: [],
      sortDesc: false,
      fields: [
        { key: "id_user", thClass: "d-none", tdClass: "d-none" },
        { key: "bulk",  thStyle: { width: "2%" }, label:'#'},
        {
          key: "case",
          sortable: true,
          label: this.$t("case.incident-date"),
        },
        {
          key: "id_agent",
          sortable: true,
          label: this.$t("case.agent"),
        },
        { key: "avatar", thClass: "d-none", tdClass: "d-none" },
        {
          key: "classification",
          sortable: true,
          label: this.$t("case.classification"),
        },
        {
          key: "case_status",
          sortable: true,
          label: this.$t("case.case-status"),
        },
        {
          key: "actions",
          class: "text-center",
          label: this.$t("button.action"),
        },
      ],
    };
  },
  validations: {
    form: {
      user: {
        username: { required },
        email: { required },
        active_until: { required },
        password: { required },
        user_type: { required },
        is_active: {},
      },
      pass: {
        new_password: { required },
        confirm_password: { required, sameAsPassword: sameAs("new_password") },
      },
    },
  },
  computed: {
    rows() {
      return this.tableData.length;
    },
  },
  methods: {
    select() {
        // console.log('selected');
        this.selected = [];
        if (!this.selectAll) {
            for (let i in this.tableData) {
                this.selected.push(this.tableData[i].id_case);
            }
        }
    },

    list() {
      UserService.getProfile()
      .then(response => {
        this.user_type = response.data.data.admin.role
      })
      .catch(e => {
        this.message = e.response.data.data
      });
    },
    
    getCase() {
      this.loading = true;
      CaseService.getAllCase()
        .then((response) => {
          this.tableData = [];
          response.data.data.forEach((val) => {
            const data = {
              id_case: val.id_case,
              category: val.category,
              classification: val.classification,
              incident_date: this.formatDate(val.incident_date),
              location_coordinate: val.location_coordinate,
              id_customer: val.id_customer,
              rating: val.rating,
              feedback: val.feedback,
              case_status: val.status,
              agentincase: val.agentincase,
              customer: val.customer,
              created_at: this.formatDate(val.created_at),
              updated_at: this.formatDate(val.updated_at),
            };
            this.tableData.push(data);
          });
           this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    },
    // bulkAction(){
    //       Swal.fire({
    //           title: this.$t('button.delete.modal.confirmText[0]'),
    //           text: this.$t('button.delete.modal.confirmText[1]'),
    //           icon: "warning",
    //           showCancelButton: true,
    //           confirmButtonColor: "#34c38f",
    //           cancelButtonColor: "#f46a6a",
    //           cancelButtonText: this.$t('button.cancel.text'),
    //           confirmButtonText: this.$t('button.delete.text')
    //       }).then((result) => {
    //           if (result.isConfirmed) {
    //             var data = this.selected;
    //               WebsiteService.websiteBulkWebInfo(data)
    //               .then( response => {
    //                   this.selected = [];
    //                   this.getWebsiteInfo();
    //                   Swal.fire({
    //                       position: "top-end",
    //                       icon: "success",
    //                       title: this.$t('alert.alert-delete-web'),
    //                       showConfirmButton: false,
    //                       timer: 1500
    //                   });
    //               })
    //               .catch( err => {
    //                   console.log(err);
    //               });
    //           }
    //       });
    // },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    perPageSelect(val){
      this.perPage = val;
    },
    formatDate(value) {
      return moment(value).format("YYYY-MM-DD, hh:mm");
    },
  },
  beforeMount(){
    // this.list();
    this.getCase();
  },
  mounted() {
    this.totalRows = this.items.length;
  },
};
</script>

<style scoped>
.badge {
  border-radius: 2%;
}

</style>
