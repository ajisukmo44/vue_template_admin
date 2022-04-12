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
                        @click="addClassificationModal"
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
                                  $t("classification.classification-name")
                                }}</label>
                                <input
                                  id="validationCustom01"
                                  type="text"
                                  class="form-control"
                                  :placeholder="
                                    $t('classification.classification-name')
                                  "
                                  v-model="form.classification_name"
                                  :class="{
                                    'is-invalid': submitted && $v.form.classification_name.$error,
                                  }"
                                />
                                <div
                                  v-if="submitted && $v.form.classification_name.$error"
                                  class="invalid-feedback"
                                >
                                  <span v-if="!$v.form.classification_name.required">{{
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
                              <b-button size="md" variant="success" @click="addClassifications">
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
                  class="text-center mt-2"
                  v-model="selected"
                  :value="row.item.id_classification"
                >
                </b-form-checkbox>
                </template>
               
                <template #cell(actions)="row">
                      <b-button class="btn btn-sm mr-1" variant="info" @click="editClassification(row.item.id_classification, row.item.classification_name)"><i class="bx bx-pencil"></i> 
                      </b-button>
                       <b-modal
                        ref="ref-modal-edit"
                        :id="'modal-edit' + row.item.id_classification"
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
                                  $t("classification.classification-name")
                                }}</label>
                                <input
                                  id="validationCustom01"
                                  type="text"
                                  class="form-control"
                                  :placeholder="
                                    $t('classification.classification-name')
                                  "
                                  v-model="form.classification_name"
                                  :class="{
                                    'is-invalid': submitted && $v.form.classification_name.$error,
                                  }"
                                />
                                <div
                                  v-if="submitted && $v.form.classification_name.$error"
                                  class="invalid-feedback"
                                >
                                  <span v-if="!$v.form.classification_name.required">{{
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
                              <b-button size="md" variant="success" @click="updateClassifications($event, row.item.id_classification)">
                                {{$t('button.save.text')}}
                              </b-button>
                            </template>
                      </b-modal>
                      <b-button class="btn btn-sm" variant="danger" @click="deleteClassifications(row.item.id_classification)"><i class="bx bx-trash"></i> 
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
import ClassificationService from "@/helpers/classification.service";
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
      title: this.$t("classification.classification-management"),
      items: [
        {
          text: this.$t("menuitems.dashboards.text"),
          href: "#",
        },
        {
          text: this.$t("classification.classification-management"),
          active: true,
        },
      ],
      loading:false,
      tableData:[{'id_classification': 1, 'classification_name': 'Pengawalan', 'created_at': '2022-11-11'},{'id_classification': 2, 'classification_name': 'Pengamanan','created_at': '2022-11-11'},{'id_classification': 3, 'classification_name': 'Umum','created_at': '2022-11-11'},{'id_classification': 4, 'classification_name': 'Lainya','created_at': '2022-11-11'}],
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
        { key: "id_classification", thClass: "d-none", tdClass: "d-none" },
         { key: "bulk",  thStyle: { width: "2%" }, label:'#'},
        {
          key: "classification_name",
          sortable: true,
          label: this.$t("classification.classification-name"),
        },
        { 
          key: "created_at", thStyle: { width: "15%" }, 
          sortable: true,
          label: this.$t("all.created-at"),
        },
        {
          key: "actions", thStyle: { width: "10%" },
          class: "text-center",
          label: this.$t("button.action"),
        },
      ],
      form: {
          "classification_name" : "",
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
        classification_name: { required },
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
                this.selected.push(this.tableData[i].id_classification);
            }
        }
    },
    list() {
      // this.loading = true;
      UserService.getProfile()
      .then(response => {
        console.log( response.data.data)
        this.user_type = response.data.data.admin.role
      })
      .catch(e => {
        this.message = e.response.data.data
      });
    },
    getClassification() {
      this.loading = true;
      ClassificationService.getAllUser()
        .then((response) => {
          this.tableData = [];
          console.log(response.data.data);
          response.data.data.forEach((val) => {
            const data = {
              id_classification: val.id_classification,
              classification_name: val.classification_name,
        
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

    getClassificationUpdate() {
      ClassificationService.getAllUser()
        .then((response) => {
          this.tableData = [];
          console.log(response.data.data);
          response.data.data.forEach((val) => {
            const data = {
              id_classification: val.id_classification,
              classification_name: val.classification_name,
            };
            this.tableData.push(data);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addClassificationModal(){
        this.$bvModal.show('modal-add')
        this.form.classification_name = "";
    },
    addClassifications(e) {
      // this.loadingAdd = true;
   
      this.submitted = true;
      this.$v.form.$touch();
      if (
        this.form.classification_name == "" 
      ) {
        e.preventDefault();
      } else {
        const data = {
          classification_name: this.form.classification_name,
        };
        console.log(data);
        // ClassificationService.addClassification(data)
        //   .then((response) => {
        //        console.log('false');
        //     Vue.swal({
        //       position: "top-end",
        //       icon: "success",
        //       title: response.data.message,
        //       showConfirmButton: false,
        //       timer: 1500,
        //     });
        //     this.resetForm();
        //     this.$v.$reset();
        //     this.$bvModal.hide('modal-add');
        //     this.getClassificationUpdate();
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
      }
    },
    editClassification(id_classification, classification_name) {
      console.log(id_classification);
      this.$bvModal.show("modal-edit" + id_classification);
      this.form.classification_name = classification_name;
    },

    updateClassifications(e, id) {
      this.submitted = true;
      this.$v.form.$touch();
      if ( this.form.classification_name == "") {
        e.preventDefault();
      } else {
        let data = {
              "classification_name" : this.form.classification_name,
              "id_classification" : this.form.id_classification,
        }
        console.log(data);
        // ClassificationService.updateClassification(id, data)
        //   .then((response) => {
        //     let id_classification = response.data.data.id_user;
        //     console.log(id_classification);
        //     Vue.swal({
        //       position: "top-end",
        //       icon: "success",
        //       title: response.data.message,
        //       showConfirmButton: false,
        //       timer: 1500,
        //     });
        //     this.$bvModal.hide("modal-edit" + id_classification);
        //     this.getClassificationUpdate();
        //     this.resetForm();
        //     this.$v.$reset();
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
      }
    },
    deleteClassifications(id) {
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
          console.log(id);
          // ClassificationService.deleteClassification(id)
          //   .then((response) => {
          //     this.getClassificationUpdate();
          //     Swal.fire({
          //       position: "top-end",
          //       icon: "success",
          //       title: response.data.message,
          //       showConfirmButton: false,
          //       timer: 1500,
          //     });
          //   })
          //   .catch((err) => {
          //     console.log(err);
          //   });
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
                console.log(data);
                  // ClassificationService.bulkdeleteClassification(data)
                  // .then( response => {
                  //     this.selected = [];
                  //     this.getClassificationUpdate();
                  //     Swal.fire({
                  //         position: "top-end",
                  //         icon: "success",
                  //         title: this.$t('alert.alert-delete-web'),
                  //         showConfirmButton: false,
                  //         timer: 1500
                  //     });
                  // })
                  // .catch( err => {
                  //     console.log(err);
                  // });
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
        this.form.user.id_classification = "",
        this.form.user.classification_name = ""
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
    // this.getClassification();
  },
};
</script>

<style scoped>
.badge {
  border-radius: 2%;
}

</style>
