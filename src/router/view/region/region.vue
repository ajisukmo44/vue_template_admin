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
                     <b-button
                        @click="addRegionModal"
                        variant="success"
                        class="btn mr-1"
                      >
                        {{ $t("button.add.text") }}
                        <i class="mdi mdi-plus mr-1"></i>
                      </b-button>

                     <b-modal
                          id="modal-add"
                          centered
                          bordered
                          :title="$t('button.add.text')"
                          title-class="font-18"
                          :ok-title="$t('button.save.text')"
                          :cancel-title="$t('button.cancel.text')"
                        >
                          <div class="row">
                            <div class="col-md-12">
                              <div class="form-group">
                                <label for="validationCustom01">{{
                                  $t("region.region-name")
                                }}</label>
                                <input
                                  id="validationCustom01"
                                  type="text"
                                  class="form-control"
                                  :placeholder="
                                    $t('region.region-name')
                                  "
                                  v-model="form.region_name"
                                  :class="{
                                    'is-invalid': submitted && $v.form.region_name.$error,
                                  }"
                                />
                                <div
                                  v-if="submitted && $v.form.region_name.$error"
                                  class="invalid-feedback"
                                >
                                  <span v-if="!$v.form.region_name.required">{{
                                    $t("form.error.text")
                                  }}</span>
                                </div>
                              </div>
                            </div>  
                             <div class="col-md-12">
                              <div class="form-group">
                                <label for="validationCustom01">{{
                                  $t("region.region-number")
                                }}</label>
                                <input
                                  id="validationCustom01"
                                  type="text"
                                  class="form-control"
                                  :placeholder="
                                    $t('region.region-number')
                                  "
                                  v-model="form.region_number"
                                  :class="{
                                    'is-invalid': submitted && $v.form.region_number.$error,
                                  }"
                                />
                                <div
                                  v-if="submitted && $v.form.region_number.$error"
                                  class="invalid-feedback"
                                >
                                  <span v-if="!$v.form.region_number.required">{{
                                    $t("form.error.text")
                                  }}</span>
                                </div>
                              </div>
                            </div>   
                          </div>
                            <template #modal-footer="{ cancel }">
                              <b-button size="md" variant="danger" @click="cancel()">
                                {{$t('button.cancel.text')}}
                              </b-button>
                              <b-button size="md" variant="success" @click="addRegions">
                                {{$t('button.save.text')}}
                              </b-button>
                            </template>
                      </b-modal>

                      <b-dropdown class="btn-group mr-2 mb-2 mb-sm-0 border rounded" variant="white"  ref="dropdown">
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
            <div class="table-responsive mb-0" :class="{ 'pb-5' : rows < 10 }">
              <div v-if="!loading && user_type == 'su'">
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
                  :value="row.item.id_region"
                >
                </b-form-checkbox>
                </template>
               
                <template #cell(actions)="row">
                      <b-button class="btn btn-sm mr-1" variant="info" @click="editRegion(row.item.id_region, row.item.region_name, row.item.region_number)"><i class="bx bx-pencil"></i> 
                      </b-button>
                       <b-modal
                        ref="ref-modal-edit"
                        :id="'modal-edit' + row.item.id_region"
                        centered
                        :title="$t('button.update.text')"
                        title-class="font-17"
                        :ok-title="$t('button.update.text')"
                        :cancel-title="$t('button.cancel.text')"
                      >
                          <div class="row">
                            <div class="col-md-12">
                              <div class="form-group">
                                <label for="validationCustom01">{{
                                  $t("region.region-name")
                                }}</label>
                                <input
                                  id="validationCustom01"
                                  type="text"
                                  class="form-control"
                                  :placeholder="
                                    $t('region.region-name')
                                  "
                                  v-model="form.region_name"
                                  :class="{
                                    'is-invalid': submitted && $v.form.region_name.$error,
                                  }"
                                />
                                <div
                                  v-if="submitted && $v.form.region_name.$error"
                                  class="invalid-feedback"
                                >
                                  <span v-if="!$v.form.region_name.required">{{
                                    $t("form.error.text")
                                  }}</span>
                                </div>
                              </div>
                            </div>   
                             <div class="col-md-12">
                              <div class="form-group">
                                <label for="validationCustom02">{{
                                  $t("region.region-number")
                                }}</label>
                                <input
                                  id="validationCustom01"
                                  type="text"
                                  class="form-control"
                                  :placeholder="
                                    $t('region.region-number')
                                  "
                                  v-model="form.region_number"
                                  :class="{
                                    'is-invalid': submitted && $v.form.region_number.$error,
                                  }"
                                />
                                <div
                                  v-if="submitted && $v.form.region_number.$error"
                                  class="invalid-feedback"
                                >
                                  <span v-if="!$v.form.region_number.required">{{
                                    $t("form.error.text")
                                  }}</span>
                                </div>
                              </div>
                            </div> 
                          </div>
                          <template #modal-footer="{ cancel }">
                              <b-button size="md" variant="danger" @click="cancel()">
                                {{$t('button.cancel.text')}}
                              </b-button>
                              <b-button size="md" variant="success" @click="updateRegions($event, row.item.id_region)">
                                {{$t('button.save.text')}}
                              </b-button>
                            </template>
                      </b-modal>
                      <b-button class="btn btn-sm" variant="danger" @click="deleteRegions(row.item.id_region)"><i class="bx bx-trash"></i> 
                      </b-button>
                </template>
                </b-table>
              </div>
              <div v-if="!tableData[0] && !loading">
                <div  class="row  mt-5 mb-5 pb-4 mx-auto">
                    <div class="col-12  p-5 my-5 text-center">
                        <span class="text-secondary">{{ $t('all.dnf') }}</span>  
                    </div>
                </div>
              </div>
            </div>
            
            <div class="row" v-if="rows > 10 && user_type == 'su'">
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
import UserService from "@/helpers/user.service";
import RegionService from "@/helpers/region.service";
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
      title: this.$t("region.region-management"),
      items: [
        {
          text: this.$t("menuitems.dashboards.text"),
          href: "#",
        },
        {
          text: this.$t("region.region-management"),
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
        { key: "id_region", thClass: "d-none", tdClass: "d-none" },
         { key: "bulk",  thStyle: { width: "2%" }, label:'#'},
        {
          key: "region_name",
          sortable: true,
          label: this.$t("region.region-name"),
        },
         {
          key: "region_number",  
          thStyle: { width: "15%" },
          sortable: true,
          label: this.$t("region.region-number"),
        },
        { 
          key: "created_at", 
          thStyle: { width: "15%" }, 
          sortable: true,
          label: this.$t("all.created-at"),
        },
        {
          key: "actions", 
          thStyle: { width: "15%" },
          class: "text-center",
          label: this.$t("button.action"),
        },
      ],
      form: {
          "region_name" : "",
          "region_number" : "",
      },
      submitted: false,
    };
  },
  validations: {
    form: {
        region_name: { required },
        region_number: { required }
    },
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
                this.selected.push(this.tableData[i].id_region);
            }
        }
    },
    list() {
      // this.loading = true;
      UserService.getProfile()
      .then(response => {
        // console.log( response.data.data)
        this.user_type = response.data.data.admin.role
      })
      .catch(e => {
        this.message = e.response.data.data
      });
    },
    getRegion() {
      this.loading = true;
      RegionService.getAllRegion()
        .then((response) => {
          this.tableData = [];
          // console.log(response.data.data);
          response.data.data.forEach((val) => {
            const data = {
              id_region: val.id_region,
              region_name: val.region_name,
              region_number: val.region_number,
        
              created_at: this.formatDate(val.created_at),
              updated_at: this.formatDate(val.updated_at),
            };
            this.tableData.push(data);
            this.loading = false;
          });
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },

    getRegionUpdate() {
      RegionService.getAllRegion()
        .then((response) => {
          this.tableData = [];
          // console.log(response.data.data);
          response.data.data.forEach((val) => {
            const data = {
              id_region: val.id_region,
              region_name: val.region_name,
              region_number: val.region_number,

              created_at: this.formatDate(val.created_at),
              updated_at: this.formatDate(val.updated_at)
            };
            this.tableData.push(data);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addRegionModal(){
        this.$bvModal.show('modal-add')
        this.form.region_name = "";
        this.form.region_number = "";
    },
    addRegions(e) {
      // this.loadingAdd = true;
      this.submitted = true;
      this.$v.form.$touch();
      if (
        this.form.region_name == ""  || 
        this.form.region_number == ""
      ) {
        e.preventDefault();
      } else {
        const data = {
          region_name: this.form.region_name,
          region_number: this.form.region_number,
        };
        // console.log(data);
        RegionService.addRegion(data)
          .then((response) => {
            Vue.swal({
              position: "top-end",
              icon: "success",
              title: response.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            this.resetForm();
            this.$v.$reset();
            this.$bvModal.hide('modal-add');
            this.getRegionUpdate();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    editRegion(id_region, region_name, region_number) {
      // console.log(id_region);
      this.$bvModal.show("modal-edit" + id_region);
      this.form.region_name = region_name;
      this.form.region_number = region_number;
    },

    updateRegions(e, id) {
      this.submitted = true;
      this.$v.form.$touch();
      if ( this.form.region_name == "" || this.form.region_number == "") {
        e.preventDefault();
      } else {
        let data = {
              "region_name" : this.form.region_name,
              "region_number" : this.form.region_number,
        }
        // console.log(data);
        RegionService.updateRegion(id, data)
          .then((response) => {
            let id_region = response.data.data.id_region;
            // console.log(id_region);
            Vue.swal({
              position: "top-end",
              icon: "success",
              title: response.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            this.$bvModal.hide("modal-edit" + id_region);
            this.getRegionUpdate();
            this.resetForm();
            this.$v.$reset();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    deleteRegions(id) {
      Swal.fire({
        title: this.$t("button.delete.modal.confirmText[0]"),
        text: this.$t("button.delete.modal.confirmText[1]"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#34c38f",
        cancelButtonColor: "#f46a6a",
        cancelButtonText: this.$t("button.cancel.text"),
        confirmButtonText: this.$t("button.delete.text"),
      }).then((result) => {
        if (result.isConfirmed) {
          // console.log(id);
          RegionService.deleteRegion(id)
            .then((response) => {
              this.getRegionUpdate();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title:  response.data.message,
                showConfirmButton: false,
                timer: 1500,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },
    bulkAction(){
          Swal.fire({
              title: this.$t('button.delete.modal.confirmText[0]'),
              text: this.$t('button.delete.modal.confirmText[1]'),
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#34c38f",
              cancelButtonColor: "#f46a6a",
              cancelButtonText: this.$t('button.cancel.text'),
              confirmButtonText: this.$t('button.delete.text')
          }).then((result) => {
              if (result.isConfirmed) {
                var data = this.selected;
                // console.log(data);
                  RegionService.bulkdeleteRegion(data)
                  .then( response => {
                      this.selected = [];
                      this.getRegionUpdate();
                      Swal.fire({
                          position: "top-end",
                          icon: "success",
                          title:  response.data.message,
                          showConfirmButton: false,
                          timer: 1500
                      });
                  })
                  .catch( err => {
                      console.log(err);
                  });
              }
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
    resetForm() {
      setTimeout(() => {
        this.form.region_name = "",
        this.form.region_number = ""
      }, 2000);
    },
    formatDate(value) {
      return moment(value).format("YYYY-MM-DD, hh:mm");
    },
  },
  beforeMount(){
    this.list();
  },
  mounted() {
    this.totalRows = this.items.length;
    this.getRegion();
  },
};
</script>

<style scoped>
.badge {
  border-radius: 2%;
}

</style>
