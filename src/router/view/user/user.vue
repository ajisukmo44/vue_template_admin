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
                        @click="addUserModal"
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
                                  $t("user-management.name")
                                }}</label>
                                <input
                                  id="validationCustom01"
                                  type="text"
                                  class="form-control"
                                  :placeholder="
                                    $t('user-management.name')
                                  "
                                  v-model="form.user.name"
                                  :class="{
                                    'is-invalid': submitted && $v.form.user.name.$error,
                                  }"
                                />
                                <div
                                  v-if="submitted && $v.form.user.name.$error"
                                  class="invalid-feedback"
                                >
                                  <span v-if="!$v.form.user.name.required">{{
                                    $t("form.error.text")
                                  }}</span>
                                </div>
                              </div>
                            </div>   
                            <div class="col-md-12">
                              <div class="form-group">
                                <label for="validationCustom01">{{
                                  $t("user-management.email")
                                }}</label>
                                <input
                                  id="validationCustom01"
                                  type="email"
                                  class="form-control"
                                  :placeholder="
                                    $t('user-management.email')
                                  "
                                  v-model="form.user.email"
                                  :class="{
                                    'is-invalid': submitted && $v.form.user.email.$error,
                                  }"
                                />
                                <div
                                  v-if="submitted && $v.form.user.email.$error"
                                  class="invalid-feedback"
                                >
                                  <span v-if="!$v.form.user.email.required">{{
                                    $t("form.error.text")
                                  }}</span>
                                </div>
                              </div>
                            </div>
                            <div class="col-md-12">
                              <div class="form-group">
                                <label for="validationCustom01">
                                 {{ $t('user-management.phone') }}
                                 </label>
                                <input
                                  id="validationCustom01"
                                  type="text"
                                  class="form-control"
                                  :placeholder="$t('user-management.phone')"
                                  v-model="form.user.phone"
                                  :class="{
                                    'is-invalid': submitted && $v.form.user.phone.$error,
                                  }"
                                />
                                <div
                                  v-if="submitted && $v.form.user.phone.$error"
                                  class="invalid-feedback"
                                >
                                  <span v-if="!$v.form.user.phone.required">{{
                                    $t("form.error.text")
                                  }}</span>
                                </div>
                              </div>
                            </div>

                            <div class="col-md-12">
                              <div class="form-group">
                                <label for="validationCustom02">{{
                                  $t("user-management.gender")
                                }}</label>
                                <select
                                  class="custom-select"
                                  v-model="form.user.gender"
                                  :class="{
                                    'is-invalid': submitted && $v.form.user.gender.$error,
                                  }"
                                >
                                    <option value="L" class="form-control">{{ $t("user-management.male") }}</option>
                                    <option value="P" class="form-control">{{ $t("user-management.female")}}</option>
                                </select>
                                <div
                                  v-if="submitted && $v.form.user.gender.$error"
                                  class="invalid-feedback"
                                >
                                  <span v-if="!$v.form.user.gender.required">{{
                                    $t("form.error.text")
                                  }}</span>
                                </div>
                              </div>
                            </div>

                            <div class="col-md-12">
                              <div class="form-group">
                                <label for="validationCustom02">{{
                                  $t("user-management.region")
                                }}</label>
                                <select
                                  class="custom-select"
                                  v-model="form.user.id_region"
                                  :class="{
                                    'is-invalid': submitted && $v.form.user.id_region.$error,
                                  }"
                                >
                                   <option
                                      v-for="rg in region"
                                      :key="rg.id_region"
                                      :value="rg.id_region"
                                    >{{rg.region_name}} ({{rg.region_number}})
                                  </option>
                                </select>
                                <div
                                  v-if="submitted && $v.form.user.id_region.$error"
                                  class="invalid-feedback"
                                >
                                  <span v-if="!$v.form.user.id_region.required">{{
                                    $t("form.error.text")
                                  }}</span>
                                </div>
                              </div>
                            </div>

                             <div class="col-md-12">
                              <div class="form-group">
                                <label for="validationCustom02">{{
                                  $t("user-management.role")
                                }}</label>
                                <select
                                  class="custom-select"
                                  v-model="form.user.role"
                                  :class="{
                                    'is-invalid': submitted && $v.form.user.role.$error,
                                  }"
                                >
                                  <option value="su">Superadmin</option>
                                  <option value="cs">Customer Service</option>
                                </select>
                                <div
                                  v-if="submitted && $v.form.user.role.$error"
                                  class="invalid-feedback"
                                >
                                  <span v-if="!$v.form.user.role.required">{{
                                    $t("form.error.text")
                                  }}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                            <template #modal-footer="{ cancel }">
                              <b-button size="md" variant="danger" @click="cancel()" :class="{'disabled ': loading_add}">
                                {{$t('button.cancel.text')}}
                              </b-button>
                              <b-button size="md" variant="success" @click="addUser" :class="{'disabled ': loading_add}">
                                <b-spinner variant="light" small v-if="loading_add"></b-spinner> {{$t('button.save.text')}}
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
                  :value="row.item.id_admin"
                >
                </b-form-checkbox>
                </template>
                <template #cell(admin)="row"> 
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
                <template #cell(role)="row">
                      <div  v-if="row.item.role == 'su'">
                        <span class="badge-pill badge-soft-success p-1 font-size-12 rounded">
                           Superadmin
                        </span>
                      </div>
                      <div  v-if="row.item.role == 'cs'">
                        <span class="badge-pill badge-soft-info p-1 font-size-12 rounded">
                           Customer Service
                        </span>
                      </div>
                </template>
                <template #cell(status)="row">
                      <div  v-if="row.item.is_active" class="mb-1">
                        <span class="badge-pill badge-soft-success p-1  font-size-12 rounded">
                          {{  $t('user-management.active') }}
                        </span>
                      </div>
                      <div  v-if="row.item.is_login" class="mb-1">
                        <span class="badge-pill badge-soft-info p-1 font-size-12 rounded">
                           {{  $t('user-management.is-login') }}
                        </span>
                      </div>
                      <div  v-if="row.item.is_online" class="mb-1">
                        <span class="badge-pill badge-soft-primary font-size-12 rounded">
                           {{  $t('user-management.is-online') }}
                        </span>
                      </div>
                      <span class="" v-if="!row.item.is_online && !row.item.is_login && !row.item.is_active">
                          -
                      </span>
                </template>
                <template #cell(actions)="row">
                  <b-dropdown class="card-drop" variant="white" right toggle-class="p-0">
                        <template v-slot:button-content>
                         <b-button class="btn btn-sm border" variant="secondary"> More <i class="mdi mdi-dots-vertical ml-0"></i></b-button>
                        </template>

                        <b-dropdown-item>
                            <span class="btn-block" @click="
                            editUser(
                              row.item.id_admin,
                              row.item.name,
                              row.item.phone,
                              row.item.role,
                              row.item.gender,
                              row.item.email,
                              row.item.id_region
                              )"><i class="bx bx-pencil text-info mr-1"></i> Edit </span>
                        </b-dropdown-item>
                        <b-modal
                          ref="ref-modal-edit"
                          :id="'modal-edit' + row.item.id_admin"
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
                                    $t("user-management.name")
                                  }}</label>
                                  <input
                                    id="validationCustom01"
                                    type="text"
                                    class="form-control"
                                    :placeholder="
                                      $t('user-management.name')
                                    "
                                    v-model="form.user.name"
                                    :class="{
                                      'is-invalid': submitted && $v.form.user.name.$error,
                                    }"
                                  />
                                  <div
                                    v-if="submitted && $v.form.user.name.$error"
                                    class="invalid-feedback"
                                  >
                                    <span v-if="!$v.form.user.name.required">{{
                                      $t("form.error.text")
                                    }}</span>
                                  </div>
                                </div>
                              </div>   
                              <div class="col-md-12">
                                <div class="form-group">
                                  <label for="validationCustom01">{{
                                    $t("user-management.email")
                                  }}</label>
                                  <input
                                    id="validationCustom01"
                                    type="email"
                                    class="form-control"
                                    :placeholder="
                                      $t('user-management.email')
                                    "
                                    v-model="form.user.email"
                                    :class="{
                                      'is-invalid': submitted && $v.form.user.email.$error,
                                    }"
                                  />
                                  <div
                                    v-if="submitted && $v.form.user.email.$error"
                                    class="invalid-feedback"
                                  >
                                    <span v-if="!$v.form.user.email.required">{{
                                      $t("form.error.text")
                                    }}</span>
                                  </div>
                                </div>
                              </div>
                              <div class="col-md-12">
                                <div class="form-group">
                                  <label for="validationCustom01">
                                  {{ $t('user-management.phone') }}
                                  </label>
                                  <input
                                    id="validationCustom01"
                                    type="text"
                                    class="form-control"
                                    :placeholder="$t('user-management.phone')"
                                    v-model="form.user.phone"
                                    :class="{
                                      'is-invalid': submitted && $v.form.user.phone.$error,
                                    }"
                                  />
                                  <div
                                    v-if="submitted && $v.form.user.phone.$error"
                                    class="invalid-feedback"
                                  >
                                    <span v-if="!$v.form.user.phone.required">{{
                                      $t("form.error.text")
                                    }}</span>
                                  </div>
                                </div>
                              </div>

                              <div class="col-md-12">
                                <div class="form-group">
                                  <label for="validationCustom02">{{
                                    $t("user-management.gender")
                                  }}</label>
                                  <select
                                    class="custom-select"
                                    v-model="form.user.gender"
                                    :class="{
                                      'is-invalid': submitted && $v.form.user.gender.$error,
                                    }"
                                  >
                                      <option value="L" class="form-control">{{ $t("user-management.male") }}</option>
                                      <option value="P" class="form-control">{{ $t("user-management.female")}}</option>
                                  </select>
                                  <div
                                    v-if="submitted && $v.form.user.gender.$error"
                                    class="invalid-feedback"
                                  >
                                    <span v-if="!$v.form.user.gender.required">{{
                                      $t("form.error.text")
                                    }}</span>
                                  </div>
                                </div>
                              </div>

                              <div class="col-md-12">
                                <div class="form-group">
                                  <label for="validationCustom02">{{
                                    $t("user-management.region")
                                  }}</label>
                                  <select
                                    class="custom-select"
                                    v-model="form.user.id_region"
                                    :class="{
                                      'is-invalid': submitted && $v.form.user.id_region.$error,
                                    }"
                                  >
                                    <option
                                      v-for="rg in region"
                                      :key="rg.id_region"
                                      :value="rg.id_region"
                                    >{{rg.region_name}} ({{rg.region_number}})
                                  </option>
                                  </select>
                                  <div
                                    v-if="submitted && $v.form.user.id_region.$error"
                                    class="invalid-feedback"
                                  >
                                    <span v-if="!$v.form.user.id_region.required">{{
                                      $t("form.error.text")
                                    }}</span>
                                  </div>
                                </div>
                              </div>

                              <div class="col-md-12">
                                <div class="form-group">
                                  <label for="validationCustom02">{{
                                    $t("user-management.role")
                                  }}</label>
                                  <select
                                    class="custom-select"
                                    v-model="form.user.role"
                                    :class="{
                                      'is-invalid': submitted && $v.form.user.role.$error,
                                    }"
                                  >
                                    <option value="su">Superadmin</option>
                                    <option value="cs">Customer Service</option>
                                  </select>
                                  <div
                                    v-if="submitted && $v.form.user.role.$error"
                                    class="invalid-feedback"
                                  >
                                    <span v-if="!$v.form.user.role.required">{{
                                      $t("form.error.text")
                                    }}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <template #modal-footer="{ cancel }">
                                <b-button size="md" variant="danger" @click="cancel()" :class="{'disabled ': loading_add}">
                                  {{$t('button.cancel.text')}}
                                </b-button>
                                <b-button size="md" variant="success" @click="updateUsers($event, row.item.id_admin)" :class="{'disabled ': loading_add}">
                                   <b-spinner variant="light" small v-if="loading_add"></b-spinner> {{$t('button.save.text')}}
                                </b-button>
                              </template>
                        </b-modal>

                         <b-dropdown-item>
                            <span class="btn-block" @click="
                            changePassword(
                              row.item.id_admin,
                              row.item.email
                              )"><i class="bx bx bxs-lock text-info mr-1"></i> {{$t("user-management.reset-password")}} </span>
                        </b-dropdown-item>
                        <b-modal
                          ref="ref-modal-change-pass"
                          :id="'modal-change-password' + row.item.id_admin"
                          centered
                          :title="$t('button.update.text')"
                          title-class="font-18"
                          :ok-title="$t('button.update.text')"
                          :cancel-title="$t('button.cancel.text')"
                        >
                          <div class="row">
                             <div class="col-md-12">
                              <div class="form-group">
                                <label for="validationCustom01">{{
                                  $t("user-management.email")
                                }}</label>
                                  <input
                                    type="email"
                                    class="form-control bg-light"
                                    v-model="row.item.email"
                                    readonly
                                  />
                              </div>
                            </div>
                            <div class="col-md-12">
                              <div class="form-group">
                                <label for="validationCustom01">{{
                                  $t("user-management.new-password")
                                }}</label>
                                <div class="input-group">
                                  <input
                                    :type="show.new ? 'text' : 'password'"
                                    class="form-control"
                                    placeholder="*******"
                                    v-model="form.pass.new_password"
                                    :class="{
                                      'is-invalid':
                                        submitted &&
                                        $v.form.pass.new_password.$error,
                                    }"
                                  />
                                  <div class="input-group-prepend">
                                    <span class="input-group-text">
                                      <div v-if="show.new">
                                        <i
                                          @click="show.new = false"
                                          class="fas fa-eye-slash"
                                        ></i>
                                      </div>
                                      <div v-else>
                                        <i
                                          @click="show.new = true"
                                          class="fas fa-eye"
                                        ></i>
                                      </div>
                                    </span>
                                  </div>
                                  <div
                                    v-if="
                                      submitted && $v.form.pass.new_password.$error
                                    "
                                    class="invalid-feedback"
                                  >
                                    <span
                                      v-if="!$v.form.pass.new_password.required"
                                      >{{ $t("form.error.text") }}</span
                                    >
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div class="col-md-12">
                              <div class="form-group">
                                <label for="validationCustom01">{{
                                  $t("user-management.confirm-password")
                                }}</label>
                                <div class="input-group">
                                  <input
                                    :type="show.conf ? 'text' : 'password'"
                                    class="form-control"
                                    placeholder="*******"
                                    v-model="form.pass.confirm_password"
                                    :class="{
                                      'is-invalid':
                                        submitted &&
                                        $v.form.pass.confirm_password.$error,
                                    }"
                                  />
                                  <div class="input-group-prepend">
                                    <span class="input-group-text">
                                      <div v-if="show.conf">
                                        <i
                                          @click="show.conf = false"
                                          class="fas fa-eye-slash"
                                        ></i>
                                      </div>
                                      <div v-else>
                                        <i
                                          @click="show.conf = true"
                                          class="fas fa-eye"
                                        ></i>
                                      </div>
                                    </span>
                                  </div>
                                  <div
                                    v-if="
                                      submitted &&
                                        $v.form.pass.confirm_password.$error
                                    "
                                    class="invalid-feedback"
                                  >
                                    <span
                                      v-if="!$v.form.pass.confirm_password.required"
                                      >{{ $t("form.error.text") }}</span
                                    >
                                    <span
                                      v-if="
                                        !$v.form.pass.confirm_password
                                          .sameAsPassword &&
                                          $v.form.pass.confirm_password.required
                                      "
                                      >{{ $t("form.error.match") }}</span
                                    >
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                           <template #modal-footer="{ cancel }">
                              <b-button size="md" variant="danger" @click="cancel()">
                                {{$t('button.cancel.text')}}
                              </b-button>
                              <b-button size="md" variant="success" @click="updatePassword($event, row.item.id_admin)">
                                {{$t('button.save.text')}}
                              </b-button>
                            </template>
                        </b-modal>
                        <b-dropdown-item>
                            <span @click="deleteuser(row.item.id_admin)"  class="btn-block"><i class="bx bx-trash text-danger mr-1"></i> {{$t('button.hapus.text')}}  </span>
                        </b-dropdown-item>
                  </b-dropdown>
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
import AgenService from "@/helpers/agen.service";
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
      title: this.$t("user-management.user-management"),
      items: [
        {
          text: this.$t("menuitems.dashboards.text"),
          href: "#",
        },
        {
          text: this.$t("user-management.user-management"),
          active: true,
        },
      ],
      loading: false,
      loading_add: false,
      region: [],
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
        { key: "id_admin", thClass: "d-none", tdClass: "d-none" },
         { key: "bulk",  thStyle: { width: "2%" }, label:'#'},
        {
          key: "admin",
          sortable: true,
          label: this.$t("user-management.user"),
        },
        {
          key: "phone",
          sortable: true,
          label: this.$t("user-management.phone"),
        },
        {
          key: "role",
          sortable: true,
          label: this.$t("user-management.role"),
        },
        {
          key: "status",
          sortable: true,
          label: this.$t("user-management.status"),
        },
        { 
          key: "created_at",
          sortable: true,
          label: this.$t("all.created-at"),
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
          "name"      : "",
          "phone"     : "",
          "gender"    : "",
          "email"     : "",
          "role"      : "",
          "id_region" : ""
        },
        pass: {
          id_admin: "",
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
  validations: {
    form: {
      user: {
        name: { required },
        phone: { required },
        gender: { required },
        email: { required },
        role: { required },
        id_region: {},
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
        this.selected = [];
        if (!this.selectAll) {
            for (let i in this.tableData) {
                this.selected.push(this.tableData[i].id_admin);
            }
        }
    },
    list() {
      this.loading = true;
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
      RegionService.getAllRegion()
        .then((response) => {
          this.region = [];
          // console.log(response.data.data);
          response.data.data.forEach((val) => {
            const data = {
              id_region: val.id_region,
              region_name: val.region_name,
              region_number: val.region_number,
            };
            this.region.push(data);
          });
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
        });
    },

    getUser() {
      this.loading = true;
      UserService.getAllUser()
        .then((response) => {
          this.tableData = [];
          // console.log(response.data.data);
          response.data.data.forEach((val) => {
            const data = {
              id_admin: val.id_admin,
              is_online: val.is_online,
              id_region: val.id_region,
              role: val.role,
           
              id_user: val.account.id_user,
              name: val.account.name,
              phone: val.account.phone,
              gender: val.account.gender,
              email: val.account.email,
              email_verified_at: val.account.email_verified_at,
              profile_pict: val.account.profile_pict,
              is_active: val.account.is_active,
              active_until: val.account.active_until,
              is_login: val.account.is_login,

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

    getUserUpdate() {
      UserService.getAllUser()
        .then((response) => {
          this.tableData = [];
          // console.log(response.data.data);
          response.data.data.forEach((val) => {
            const data = {
              id_admin: val.id_admin,
              is_online: val.is_online,
              id_region: val.id_region,
              role: val.role,
           
              id_user: val.account.id_user,
              name: val.account.name,
              phone: val.account.phone,
              gender: val.account.gender,
              email: val.account.email,
              email_verified_at: val.account.email_verified_at,
              profile_pict: val.account.profile_pict,
              is_active: val.account.is_active,
              active_until: val.account.active_until,
              is_login: val.account.is_login,

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
    addUserModal(){
        this.$bvModal.show('modal-add')
        this.form.user.name = "";
        this.form.user.phone = "";
        this.form.user.gender = "";
        this.form.user.email = "";
        this.form.user.id_region = "";
        this.form.user.role = "";
    },
    addUser(e) {
      // this.loadingAdd = true;
   
      this.submitted = true;
      this.$v.form.user.$touch();
      if (
        this.form.user.name == "" ||
        this.form.user.phone == "" ||
        this.form.user.gender == "" ||
        this.form.user.email == "" ||
        this.form.user.id_region == "" ||
        this.form.user.role == ""
      ) {
        e.preventDefault();
      } else {
        this.loading_add = true;
        const data = {
          name: this.form.user.name,
          phone: this.form.user.phone,
          email: this.form.user.email,
          gender: this.form.user.gender,
          id_region: this.form.user.id_region,
          role: this.form.user.role,
        };
        UserService.addUser(data)
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
            this.getUserUpdate();
            this.loading_add = false;
          })
          .catch((err) => {
            console.log(err);
            this.loading_add = false;
          });
      }
    },
    editUser(id_admin, name, phone, role, gender, email, id_region) {
      this.$bvModal.show("modal-edit" + id_admin);
      this.form.user.name = name;
      this.form.user.phone = phone;
      this.form.user.gender = gender;
      this.form.user.email = email;
      this.form.user.role = role;
      this.form.user.id_region = id_region;
    },

    updateUsers(e, id) {
     
      this.submitted = true;
      this.$v.form.user.$touch();
      if ( this.form.user.name == "" ||
        this.form.user.phone == "" ||
        this.form.user.gender == "" ||
        this.form.user.email == "" ||
        this.form.user.id_region == "" ||
        this.form.user.role == "") {
        e.preventDefault();
      } else {
        this.loading_add = true;
        let data = {
              "name"      : this.form.user.name,
              "phone"     : this.form.user.phone,
              "gender"    : this.form.user.gender,
              "email"     : this.form.user.email,
              "user_type" : 'admin',
              "role"      : this.form.user.role,
              "id_region" : this.form.user.id_region,
        }
        UserService.updateUser(id, data)
          .then((response) => {
            let id_admin = response.data.data.id_user;
            Vue.swal({
              position: "top-end",
              icon: "success",
              title: response.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            this.$bvModal.hide("modal-edit" + id_admin);
            this.getUserUpdate();
            this.resetForm();
            this.$v.$reset();
            this.loading_add = false;
          })
          .catch((err) => {
            console.log(err);
            this.loading_add = false;
          });
      }
    },
    deleteuser(id) {
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
          UserService.deleteUser(id)
            .then((response) => {
              this.getUserUpdate();
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
    changePassword(id_admin, email) {
      this.form.pass.email = email;
      this.form.pass.id_admin = id_admin;
      this.$bvModal.show("modal-change-password"+id_admin);
    },
    updatePassword(e, id) {
      this.submitted = true;
      this.$v.form.pass.$touch();
      if (this.$v.form.pass.$invalid) {
        e.preventDefault();
      } else {
        let data = {
          "newpassword": this.form.pass.new_password,
          "confirmpassword": this.form.pass.confirm_password,
          "email": this.form.pass.email
        }
        // console.log(data);
        UserService.updatePasswordAdmin(data)
          .then((response) => {
            this.getUserUpdate();
            Vue.swal({
              position: "top-end",
              icon: "success",
              title: response.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            this.$bvModal.hide("modal-change-password"+this.form.pass.id_admin);
            this.$v.$reset();
            this.resetForm();
          })
          .catch((err) => {
            console.log(err);
            this.$v.$reset();
            this.resetForm();
          });
      }
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
                  UserService.bulkDeleteUser(data)
                  .then( response => {
                      this.selected = [];
                      this.getUserUpdate();
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
        this.form.user.name = "",
        this.form.user.phone = "",
        this.form.user.gender = "",
        this.form.user.email = "",
        this.form.user.id_region = "",
        this.form.user.role = ""
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
    this.getUser();
    this.getRegion();
  },
};
</script>

<style scoped>
.badge {
  border-radius: 2%;
}

</style>
