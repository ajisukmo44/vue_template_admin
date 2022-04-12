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
                        @click="addPackageModal"
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
                                  $t("package.name")
                                }}</label>
                                <input
                                  id="validationCustom01"
                                  type="text"
                                  class="form-control"
                                  :placeholder="
                                    $t('package.name')
                                  "
                                  v-model="form.package_name"
                                  :class="{
                                    'is-invalid': submitted && $v.form.package_name.$error,
                                  }"
                                />
                                <div
                                  v-if="submitted && $v.form.package_name.$error"
                                  class="invalid-feedback"
                                >
                                  <span v-if="!$v.form.package_name.required">{{
                                    $t("form.error.text")
                                  }}</span>
                                </div>
                              </div>
                            </div> 
                            <div class="col-md-12">
                              <div class="form-group">
                                <label for="validationCustom01">{{
                                  $t("package.description")
                                }}</label>
                                <input
                                  id="validationCustom01"
                                  type="text"
                                  class="form-control"
                                  :placeholder="
                                    $t('package.description')
                                  "
                                  v-model="form.package_desc"
                                  :class="{
                                    'is-invalid': submitted && $v.form.package_desc.$error,
                                  }"
                                />
                                <div
                                  v-if="submitted && $v.form.package_desc.$error"
                                  class="invalid-feedback"
                                >
                                  <span v-if="!$v.form.package_desc.required">{{
                                    $t("form.error.text")
                                  }}</span>
                                </div>
                              </div>
                            </div> 
                            <div class="col-md-12">
                              <div class="form-group">
                                <label for="validationCustom01">{{
                                  $t("package.price")
                                }}</label>
                                <input
                                  id="validationCustom01"
                                  type="text"
                                  class="form-control"
                                  :placeholder="
                                    $t('package.price')
                                  "
                                  v-model="form.price"
                                  :class="{
                                    'is-invalid': submitted && $v.form.price.$error,
                                  }"
                                />
                                <div
                                  v-if="submitted && $v.form.price.$error"
                                  class="invalid-feedback"
                                >
                                  <span v-if="!$v.form.price.required">{{
                                    $t("form.error.text")
                                  }}</span>
                                </div>
                              </div>
                            </div> 
                            <div class="col-md-12">
                              <div class="form-group">
                                <label for="validationCustom02">{{
                                  $t("package.duration")
                                }}</label>
                                <select
                                  class="custom-select"
                                  v-model="form.package_duration"
                                  :class="{
                                    'is-invalid': submitted && $v.form.package_duration.$error,
                                  }"
                                >
                                  <option value="1 Month">1 Month</option>
                                  <option value="3 Month">3 Month</option>
                                  <option value="6 Month">6 Month</option>
                                  <option value="12 Month">12 Month</option>
                                </select>
                                <div
                                  v-if="submitted && $v.form.package_duration.$error"
                                  class="invalid-feedback"
                                >
                                  <span v-if="!$v.form.package_duration.required">{{
                                    $t("form.error.text")
                                  }}</span>
                                </div>
                              </div>
                            </div>
                            <div class="col-md-12">
                            <div class="form-group">
                              <label for="validationCustom01">{{
                                $t("package.unit")
                              }}</label>
                              <input
                                id="validationCustom01"
                                type="text"
                                class="form-control"
                                :placeholder="
                                  $t('package.unit')
                                "
                                v-model="form.unit"
                                :class="{
                                  'is-invalid': submitted && $v.form.unit.$error,
                                }"
                              />
                              <div
                                v-if="submitted && $v.form.unit.$error"
                                class="invalid-feedback"
                              >
                                <span v-if="!$v.form.unit.required">{{
                                  $t("form.error.text")
                                }}</span>
                              </div>
                            </div>
                            </div> 
                             <div class="col-md-12">
                              <div class="form-group">
                                  <div class="custom-control custom-checkbox">
                                    <input id="invalidCheck" type="checkbox" :false-value="0" :true-value="1" class="custom-control-input"  v-model="form.is_vvip"/>
                                    <label
                                      class="custom-control-label"
                                      for="invalidCheck"
                                    >{{$t("package.is-vvip")}}</label>
                                  </div>
                              </div>
                            </div> 
                            <!-- <div class="col-md-12">
                              <div class="form-group">
                                <label for="validationCustom02">{{
                                  $t("package.is-vvip")
                                }}</label>
                                <select
                                  class="custom-select"
                                  v-model="form.is_vvip"
                                  :class="{
                                    'is-invalid': submitted && $v.form.is_vvip.$error,
                                  }"
                                >
                                  <option value="1">Yes</option>
                                  <option value="0">No</option>
                                </select>
                                <div
                                  v-if="submitted && $v.form.is_vvip.$error"
                                  class="invalid-feedback"
                                >
                                  <span v-if="!$v.form.is_vvip.required">{{
                                    $t("form.error.text")
                                  }}</span>
                                </div>
                              </div>
                            </div>  -->
                          </div>
                            <template #modal-footer="{ cancel }">
                              <b-button size="md" variant="danger" @click="cancel()">
                                {{$t('button.cancel.text')}}
                              </b-button>
                              <b-button size="md" variant="success" @click="addPackages">
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
                  class="text-center mb-0"
                  v-model="selected"
                  :value="row.item.id_package"
                >
                </b-form-checkbox>
                </template>
                <template #cell(package_name)="row">
                    <div >{{row.item.package_name}} <i class="bx bxs-bookmark-star ml-0 text-success" v-if="row.item.is_vvip"  title="VVIP"></i></div> 
                    
                </template>
               
                <template #cell(actions)="row">
                      <b-button class="btn btn-sm mr-1" variant="info" @click="editPackages(row.item.id_package, row.item.package_name, row.item.package_desc, row.item.price, row.item.package_duration, row.item.unit, row.item.is_vvip)"><i class="bx bx-pencil"></i> 
                      </b-button>
                       <b-modal
                        ref="ref-modal-edit"
                        :id="'modal-edit' + row.item.id_package"
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
                                  $t("package.name")
                                }}</label>
                                <input
                                  id="validationCustom01"
                                  type="text"
                                  class="form-control"
                                  :placeholder="
                                    $t('package.name')
                                  "
                                  v-model="form.package_name"
                                  :class="{
                                    'is-invalid': submitted && $v.form.package_name.$error,
                                  }"
                                />
                                <div
                                  v-if="submitted && $v.form.package_name.$error"
                                  class="invalid-feedback"
                                >
                                  <span v-if="!$v.form.package_name.required">{{
                                    $t("form.error.text")
                                  }}</span>
                                </div>
                              </div>
                            </div>  
                            <div class="col-md-12">
                              <div class="form-group">
                                <label for="validationCustom01">{{
                                  $t("package.description")
                                }}</label>
                                <input
                                  id="validationCustom01"
                                  type="text"
                                  class="form-control"
                                  :placeholder="
                                    $t('package.description')
                                  "
                                  v-model="form.package_desc"
                                  :class="{
                                    'is-invalid': submitted && $v.form.package_desc.$error,
                                  }"
                                />
                                <div
                                  v-if="submitted && $v.form.package_desc.$error"
                                  class="invalid-feedback"
                                >
                                  <span v-if="!$v.form.package_desc.required">{{
                                    $t("form.error.text")
                                  }}</span>
                                </div>
                              </div>
                            </div>
                            <div class="col-md-12">
                              <div class="form-group">
                                <label for="validationCustom01">{{
                                  $t("package.price")
                                }}</label>
                                <input
                                  id="validationCustom01"
                                  type="text"
                                  class="form-control"
                                  :placeholder="
                                    $t('package.price')
                                  "
                                  v-model="form.price"
                                  :class="{
                                    'is-invalid': submitted && $v.form.price.$error,
                                  }"
                                />
                                <div
                                  v-if="submitted && $v.form.price.$error"
                                  class="invalid-feedback"
                                >
                                  <span v-if="!$v.form.price.required">{{
                                    $t("form.error.text")
                                  }}</span>
                                </div>
                              </div>
                            </div>
                             <div class="col-md-12">
                              <div class="form-group">
                                <label for="validationCustom02">{{
                                  $t("package.duration")
                                }}</label>
                                <select
                                  class="custom-select"
                                  v-model="form.package_duration"
                                  :class="{
                                    'is-invalid': submitted && $v.form.package_duration.$error,
                                  }"
                                >
                                    <option value="1 Month">1 Month</option>
                                    <option value="3 Month">3 Month</option>
                                    <option value="6 Month">6 Month</option>
                                    <option value="12 Month">12 Month</option>
                                </select>
                                <div
                                  v-if="submitted && $v.form.package_duration.$error"
                                  class="invalid-feedback"
                                >
                                  <span v-if="!$v.form.package_duration.required">{{
                                    $t("form.error.text")
                                  }}</span>
                                </div>
                              </div>
                            </div>
                            <div class="col-md-12">
                              <div class="form-group">
                                <label for="validationCustom01">{{
                                  $t("package.unit")
                                }}</label>
                                <input
                                  id="validationCustom01"
                                  type="text"
                                  class="form-control"
                                  :placeholder="
                                    $t('package.unit')
                                  "
                                  v-model="form.unit"
                                  :class="{
                                    'is-invalid': submitted && $v.form.unit.$error,
                                  }"
                                />
                                <div
                                  v-if="submitted && $v.form.unit.$error"
                                  class="invalid-feedback"
                                >
                                  <span v-if="!$v.form.unit.required">{{
                                    $t("form.error.text")
                                  }}</span>
                                </div>
                              </div>
                            </div> 
                            <!-- <div class="col-md-12">
                              <div class="form-group">
                                <label for="validationCustom02">{{
                                  $t("package.is-vvip")
                                }}</label>
                                <select
                                  class="custom-select"
                                  v-model="form.is_vvip"
                                  :class="{
                                    'is-invalid': submitted && $v.form.is_vvip.$error,
                                  }"
                                >
                                  <option value="1">Yes</option>
                                  <option value="0">No</option>
                                </select>
                                <div
                                  v-if="submitted && $v.form.is_vvip.$error"
                                  class="invalid-feedback"
                                >
                                  <span v-if="!$v.form.is_vvip.required">{{
                                    $t("form.error.text")
                                  }}</span>
                                </div>
                              </div>
                            </div> -->
                            <div class="col-md-12">
                              <div class="form-group">
                                  <div class="custom-control custom-checkbox">
                                    <input id="invalidCheck" type="checkbox" :false-value="0" :true-value="1" class="custom-control-input"  v-model="form.is_vvip"/>
                                    <label
                                      class="custom-control-label"
                                      for="invalidCheck"
                                    >{{$t("package.is-vvip")}}</label>
                                  </div>
                              </div>
                            </div>
                          </div>
                          <template #modal-footer="{ cancel }">
                              <b-button size="md" variant="danger" @click="cancel()">
                                {{$t('button.cancel.text')}}
                              </b-button>
                              <b-button size="md" variant="success" @click="updatePackages($event, row.item.id_package)">
                                {{$t('button.save.text')}}
                              </b-button>
                            </template>
                      </b-modal>
                      <b-button class="btn btn-sm" variant="danger" @click="deletePackages(row.item.id_package)"><i class="bx bx-trash"></i> 
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
import PackageService from "@/helpers/package.service";
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
      title: this.$t("package.package-management"),
      items: [
        {
          text: this.$t("menuitems.dashboards.text"),
          href: "#",
        },
        {
          text: this.$t("package.package-management"),
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
        { key: "id_package", thClass: "d-none", tdClass: "d-none" },
         { key: "bulk",  thStyle: { width: "2%" }, label:'#'},
        {
          key: "package_name",
          sortable: true,
          label: this.$t("package.name"),
        },
        {
          key: "package_desc",
          sortable: true,
          label: this.$t("package.description"),
        },
        {
          key: "price",
          sortable: true,
          label: this.$t("package.price"),
        },
        {
          key: "package_duration",
          sortable: true,
          label: this.$t("package.duration"),
        },
        {
          key: "unit",
          sortable: true,
          label: this.$t("package.unit"),
        },
        {
          key: "actions", thStyle: { width: "10%" },
          class: "text-center",
          label: this.$t("button.action"),
        },
      ],
      form: {
            "package_name" : "",
            "package_desc" : "",
            "price" : "",
            "package_duration" : "",
            "unit" : "",
            "is_vvip" : 0
      },
      show: {
        new: false,
        conf: false,
      },
      submitted: false,
    };
  },
  validations: {
    form: {
        package_name: { required },
        package_desc: { required },
        price: { required },
        package_duration: { required },
        unit: { required },
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
                this.selected.push(this.tableData[i].id_package);
            }
        }
    },
    list() {
      // this.loading = true;
      UserService.getProfile()
      .then(response => {
        this.user_type = response.data.data.admin.role
      })
      .catch(e => {
        this.message = e.response.data.data
      });
    },
    getPackage() {
      this.loading = true;
      PackageService.getAllPackage()
        .then((response) => {
          this.tableData = [];
          response.data.data.forEach((val) => {
            const data = {
              id_package: val.id_package,
              package_name: val.package_name,
              package_desc: val.package_desc,
              price: val.price,
              package_duration: val.package_duration,
              unit: val.unit,
              is_vvip: val.is_vvip,
        
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

     getPackageUpdate() {
      PackageService.getAllPackage()
        .then((response) => {
          this.tableData = [];
          response.data.data.forEach((val) => {
            const data = {
              id_package: val.id_package,
              package_name: val.package_name,
              package_desc: val.package_desc,
              price: val.price,
              package_duration: val.package_duration,
              unit: val.unit,
              is_vvip: val.is_vvip,
        
              created_at: this.formatDate(val.created_at),
              updated_at: this.formatDate(val.updated_at),
            };
            this.tableData.push(data);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },

    addPackageModal(){
        this.$bvModal.show('modal-add')
        this.form.package_name = "";
        this.form.package_desc = "";
        this.form.price = "";
        this.form.package_duration = "";
        this.form.unit = "";
        this.form.is_vvip = 0;
    },
    addPackages(e) {
      // this.loadingAdd = true;
   
      this.submitted = true;
      this.$v.form.$touch();
      if (
        this.form.package_name == "" ||
        this.form.package_desc == "" ||
        this.form.price == "" ||
        this.form.package_duration == "" ||
        this.form.unit == ""
      ) {
        e.preventDefault();
      } else {
        const data = {
          "package_name" : this.form.package_name,
          "package_desc" : this.form.package_desc,
          "price" : this.form.price,
          "package_duration" : this.form.package_duration,
          "unit" : this.form.unit,
          "is_vvip" : this.form.is_vvip
        };
        // console.log(data);
        PackageService.addPackage(data)
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
            this.getPackageUpdate();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    editPackages(id_package, package_name, package_desc, price, package_duration, unit, is_vvip) {
      // console.log(id_package);
      this.$bvModal.show("modal-edit" + id_package);
      this.form.package_name = package_name;
      this.form.package_desc = package_desc;
      this.form.price = price;
      this.form.package_duration = package_duration;
      this.form.unit = unit;
      this.form.is_vvip = is_vvip;
    },

    updatePackages(e, id) {
      this.submitted = true;
      this.$v.form.$touch();
      if ( this.form.package_name == "" ||
        this.form.package_desc == "" ||
        this.form.price == "" ||
        this.form.package_duration == "" ||
        this.form.unit == "") {
        e.preventDefault();
      } else {
        let data = {
              "package_name" : this.form.package_name,
              "id_package" : this.form.id_package,
              "package_desc" : this.form.package_desc,
              "price" : this.form.price,
              "package_duration" : this.form.package_duration,
              "unit" : this.form.unit,
              "is_vvip" : this.form.is_vvip
        }
        //  console.log(data);
        PackageService.updatePackage(id, data)
          .then((response) => {
            let id_package = response.data.data.id_package;
            Vue.swal({
              position: "top-end",
              icon: "success",
              title: response.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            this.$bvModal.hide("modal-edit" + id_package);
            this.getPackageUpdate();
            this.resetForm();
            this.$v.$reset();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    deletePackages(id) {
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
          PackageService.deletePackage(id)
            .then((response) => {
              this.getPackageUpdate();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: response.data.message,
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
                  PackageService.bulkDeletePackage(data)
                  .then( response => {
                      this.selected = [];
                      this.getPackageUpdate();
                      Swal.fire({
                          position: "top-end",
                          icon: "success",
                          title: response.data.message,
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
        this.form.id_package = "",
        this.form.package_name = "",
        this.form.package_desc = "";
        this.form.price = "";
        this.form.package_duration = "";
        this.form.unit = "";
        this.form.is_vvip = 0;
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
    this.getPackage();
    this.totalRows = this.items.length;
  },
};
</script>

<style scoped>
.badge {
  border-radius: 2%;
}

</style>
