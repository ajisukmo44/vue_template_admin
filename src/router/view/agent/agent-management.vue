<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body" v-if="loading" >
            <div class="row mt-5 mb-5 pb-4 mx-auto">
                <div class="col-12 p-5 m-4 text-center">
                    <div class="spinner-border text-secondary" role="status" v-if="loading">
                        <span class="sr-only">Loading..</span>
                      </div>
                </div>
            </div>
          </div>
  
          <div class="card-body" v-if="!loading && user_type == 'su'">
             <div class="row mb-0">
                 <div class="col-5 col-xl-7">
                  <div class="">
                     <b-button
                        @click="addAgentModal"
                        variant="success"
                        class="btn mr-1"
                      >
                        {{ $t("button.add.text") }}
                        <i class="mdi mdi-plus mr-1"></i>
                      </b-button>

                     <b-modal
                          id="modal-add"
                          centered
                          :title="$t('button.add.text')"
                          title-class="font-18"
                          :ok-title="$t('button.save.text')"
                          :cancel-title="$t('button.cancel.text')"
                        >
                          <div class="row">
                            <div class="col-md-12">
                              <div class="form-group">
                                <label for="validationCustom01">
                                 NIK 
                                 </label>
                                <input
                                  id="validationCustom01"
                                  type="number"
                                  class="form-control"
                                  placeholder="NIK"
                                  v-model="form.agent.nik"
                                  :class="{
                                    'is-invalid': submitted && $v.form.agent.nik.$error,
                                  }"
                                />
                                <div
                                  v-if="submitted && $v.form.agent.nik.$error"
                                  class="invalid-feedback"
                                >
                                  <span v-if="!$v.form.agent.nik.required">{{
                                    $t("form.error.text")
                                  }}</span>
                                </div>
                              </div>
                            </div>
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
                                  v-model="form.agent.name"
                                  :class="{
                                    'is-invalid': submitted && $v.form.agent.name.$error,
                                  }"
                                />
                                <div
                                  v-if="submitted && $v.form.agent.name.$error"
                                  class="invalid-feedback"
                                >
                                  <span v-if="!$v.form.agent.name.required">{{
                                    $t("form.error.text")
                                  }}</span>
                                </div>
                              </div>
                            </div>   
                            <div class="col-md-12">
                              <div class="form-group">
                                <label for="validationCustom01">
                                  {{ $t("user-management.birth-date")}}
                                </label>
                                <input
                                  id="validationCustom01"
                                  type="date"
                                  class="form-control"
                                 :placeholder="$t('user-management.birth-date')"
                                  v-model="form.agent.birth_date"
                                  :class="{
                                    'is-invalid':
                                      submitted && $v.form.agent.birth_date.$error,
                                  }"
                                />
                                <div
                                  v-if="submitted && $v.form.agent.birth_date.$error"
                                  class="invalid-feedback"
                                >
                                  <span v-if="!$v.form.agent.birth_date.required">{{
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
                                  v-model="form.agent.email"
                                  :class="{
                                    'is-invalid': submitted && $v.form.agent.email.$error,
                                  }"
                                />
                                <div
                                  v-if="submitted && $v.form.agent.email.$error"
                                  class="invalid-feedback"
                                >
                                  <span v-if="!$v.form.agent.email.required">{{
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
                                  v-model="form.agent.phone"
                                  :class="{
                                    'is-invalid': submitted && $v.form.agent.phone.$error,
                                  }"
                                />
                                <div
                                  v-if="submitted && $v.form.agent.phone.$error"
                                  class="invalid-feedback"
                                >
                                  <span v-if="!$v.form.agent.phone.required">{{
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
                                  v-model="form.agent.gender"
                                  :class="{
                                    'is-invalid': submitted && $v.form.agent.gender.$error,
                                  }"
                                >
                                 <option value="L" class="form-control">{{ $t("user-management.male") }}</option>
                                 <option value="P" class="form-control">{{ $t("user-management.female")}}</option>
                                </select>
                                <div
                                  v-if="submitted && $v.form.agent.gender.$error"
                                  class="invalid-feedback"
                                >
                                  <span v-if="!$v.form.agent.gender.required">{{
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
                                  v-model="form.agent.id_region"
                                  :class="{
                                    'is-invalid': submitted && $v.form.agent.id_region.$error,
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
                                  v-if="submitted && $v.form.agent.id_region.$error"
                                  class="invalid-feedback"
                                >
                                  <span v-if="!$v.form.agent.id_region.required">{{
                                    $t("form.error.text")
                                  }}</span>
                                </div>
                              </div>
                            </div>

                            <div class="col-md-12">
                              <div class="form-group">
                                <label for="validationCustom01">{{
                                  $t("user-management.address")
                                }}</label>
                                <input
                                  id="validationCustom01"
                                  type="text"
                                  class="form-control"
                                  :placeholder="
                                    $t('user-management.address')
                                  "
                                  v-model="form.agent.address"
                                  :class="{
                                    'is-invalid': submitted && $v.form.agent.address.$error,
                                  }"
                                />
                                <div
                                  v-if="submitted && $v.form.agent.address.$error"
                                  class="invalid-feedback"
                                >
                                  <span v-if="!$v.form.agent.address.required">{{
                                    $t("form.error.text")
                                  }}</span>
                                </div>
                              </div>
                            </div>   

                            <!-- <div class="col-md-12">
                              <div class="form-group">
                                <label for="validationCustom01">
                                  Password
                                </label>
                                <input
                                  id="validationCustom01"
                                  type="password"
                                  class="form-control"
                                  placeholder="password"
                                  v-model="form.agent.password"
                                  :class="{
                                    'is-invalid': submitted && $v.form.agent.password.$error,
                                  }"
                                />
                                <div
                                  v-if="submitted && $v.form.agent.password.$error"
                                  class="invalid-feedback"
                                >
                                  <span v-if="!$v.form.agent.password.required">{{
                                    $t("form.error.text")
                                  }}</span>
                                </div>
                              </div>
                            </div> -->
                          </div>
                            <template #modal-footer="{ cancel }">
                              <b-button size="md" variant="danger" @click="cancel()">
                                {{$t('button.cancel.text')}}
                              </b-button>
                              <b-button size="md" variant="success" @click="addAgent" :class="{'disabled ': loading_add}">
                                 <b-spinner variant="light" small v-if="loading_add"></b-spinner> {{$t('button.save.text')}}
                              </b-button>
                            </template>
                      </b-modal>

                      <b-dropdown class="btn-group mr-2 mb-2 mb-sm-0 border" variant="white"  ref="dropdown">
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
                :value="row.item.id_agent"
              >
              </b-form-checkbox>
              </template>
                <template #cell(agent)="row"> 
                <div class="col-sm-12">
                    <div class="media">
                      <img
                          src="@/assets/images/users/avatar-10.jpg"
                          class="mr-3 rounded-circle avatar-sm"
                          alt="user-pic"
                          />
                      <div class="media-body">
                         {{row.item.account.name}}<br>
                          <span class="text-secondary"> {{row.item.account.email}}</span> <br>
                      </div>
                    </div>
                </div>
                </template>
                <template #cell(agent_status)="row">
                      <div  v-if="row.item.is_ready" class="mb-1">
                        <span class="badge badge-soft-success font-size-12 rounded">
                          {{  $t('user-management.is-ready') }}
                        </span>
                      </div>
                      <div  v-if="row.item.is_in_case" class="mb-1">
                        <span class="badge badge-soft-warning font-size-12 p-1 rounded">
                           {{  $t('user-management.is-in-case') }}
                        </span>
                      </div>
                      <span class="" v-if="!row.item.is_ready && !row.item.is_in_case">
                          -
                      </span>
                </template>
                <template #cell(actions)="row">
                    <router-link :to="{ name: 'agent-management-detail', params: { id:row.item.id_agent }}" class="mr-1 btn btn-sm btn-info"> 
                         View
                    </router-link>
                    <b-dropdown class="card-drop" variant="white" right toggle-class="p-0">
                        <template v-slot:button-content>
                              <b-button class="btn btn-sm" variant="secondary"> More <i class="mdi mdi-dots-vertical ml-1"></i></b-button>
                        </template>
                        <b-dropdown-item>
                          <span  class="btn-block" @click="
                              editAgent(
                                row.item.id_agent,
                                row.item.name,
                                row.item.phone,
                                row.item.nik,
                                row.item.gender,
                                row.item.email,
                                row.item.address,
                                row.item.birth_date,
                                row.item.id_region
                              )"><i class="bx bx-pencil text-info mr-1"></i>  Edit </span>
                        </b-dropdown-item>
                            <b-modal
                              ref="ref-modal-edit"
                              :id="'modal-edit' + row.item.id_agent"
                              centered
                              :title="$t('button.update.text')"
                              title-class="font-17"
                              :ok-title="$t('button.update.text')"
                              :cancel-title="$t('button.cancel.text')"
                            >
                                <div class="row">
                                  <div class="col-md-12">
                                    <div class="form-group">
                                      <label for="validationCustom01">
                                      NIK 
                                      </label>
                                      <input
                                        id="validationCustom01"
                                        type="number"
                                        class="form-control bg-light"
                                        placeholder="NIK"
                                        v-model="form.agent.nik"
                                        readonly
                                      />
                                      <div
                                        v-if="submitted && $v.form.agent.nik.$error"
                                        class="invalid-feedback"
                                      >
                                        <span v-if="!$v.form.agent.nik.required">{{
                                          $t("form.error.text")
                                        }}</span>
                                      </div>
                                    </div>
                                  </div>
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
                                        v-model="form.agent.name"
                                        :class="{
                                          'is-invalid': submitted && $v.form.agent.name.$error,
                                        }"
                                      />
                                      <div
                                        v-if="submitted && $v.form.agent.name.$error"
                                        class="invalid-feedback"
                                      >
                                        <span v-if="!$v.form.agent.name.required">{{
                                          $t("form.error.text")
                                        }}</span>
                                      </div>
                                    </div>
                                  </div>   
                                  <div class="col-md-12">
                                    <div class="form-group">
                                      <label for="validationCustom01">
                                        {{ $t("user-management.birth-date")}}
                                      </label>
                                      <input
                                        id="validationCustom01"
                                        type="date"
                                        class="form-control"
                                      :placeholder="$t('user-management.birth-date')"
                                        v-model="form.agent.birth_date"
                                        :class="{
                                          'is-invalid':
                                            submitted && $v.form.agent.birth_date.$error,
                                        }"
                                      />
                                      <div
                                        v-if="submitted && $v.form.agent.birth_date.$error"
                                        class="invalid-feedback"
                                      >
                                        <span v-if="!$v.form.agent.birth_date.required">{{
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
                                        v-model="form.agent.email"
                                        :class="{
                                          'is-invalid': submitted && $v.form.agent.email.$error,
                                        }"
                                      />
                                      <div
                                        v-if="submitted && $v.form.agent.email.$error"
                                        class="invalid-feedback"
                                      >
                                        <span v-if="!$v.form.agent.email.required">{{
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
                                        v-model="form.agent.phone"
                                        :class="{
                                          'is-invalid': submitted && $v.form.agent.phone.$error,
                                        }"
                                      />
                                      <div
                                        v-if="submitted && $v.form.agent.phone.$error"
                                        class="invalid-feedback"
                                      >
                                        <span v-if="!$v.form.agent.phone.required">{{
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
                                        v-model="form.agent.gender"
                                        :class="{
                                          'is-invalid': submitted && $v.form.agent.gender.$error,
                                        }"
                                      >   
                                        <option value="L" class="form-control">{{ $t("user-management.male") }}</option>
                                        <option value="P" class="form-control">{{ $t("user-management.female")}}</option>
                                      </select>
                                      <div
                                        v-if="submitted && $v.form.agent.gender.$error"
                                        class="invalid-feedback"
                                      >
                                        <span v-if="!$v.form.agent.gender.required">{{
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
                                        v-model="form.agent.id_region"
                                        :class="{
                                          'is-invalid': submitted && $v.form.agent.id_region.$error,
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
                                        v-if="submitted && $v.form.agent.id_region.$error"
                                        class="invalid-feedback"
                                      >
                                        <span v-if="!$v.form.agent.id_region.required">{{
                                          $t("form.error.text")
                                        }}</span>
                                      </div>
                                    </div>
                                  </div>

                                  <div class="col-md-12">
                                    <div class="form-group">
                                      <label for="validationCustom01">{{
                                        $t("user-management.address")
                                      }}</label>
                                      <input
                                        id="validationCustom01"
                                        type="text"
                                        class="form-control"
                                        :placeholder="
                                          $t('user-management.address')
                                        "
                                        v-model="form.agent.address"
                                        :class="{
                                          'is-invalid': submitted && $v.form.agent.address.$error,
                                        }"
                                      />
                                      <div
                                        v-if="submitted && $v.form.agent.address.$error"
                                        class="invalid-feedback"
                                      >
                                        <span v-if="!$v.form.agent.address.required">{{
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
                                    <b-button size="md" variant="success" @click="updateAgent($event, row.item.id_agent)" :class="{'disabled ': loading_add}">
                                      <b-spinner variant="light" small v-if="loading_add"></b-spinner> {{$t('button.save.text')}}
                                    </b-button>
                                  </template>
                            </b-modal>
                        
                        <b-dropdown-item>
                            <span class="btn-block" @click="
                            changePassword(
                              row.item.id_agent,
                              row.item.email
                              )"><i class="bx bx bxs-lock text-info mr-1"></i> {{$t("user-management.reset-password")}} </span>
                        </b-dropdown-item>
                        <b-modal
                          ref="ref-modal-change-pass"
                          :id="'modal-change-password' + row.item.id_agent"
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
                              <b-button size="md" variant="danger" @click="cancel()" :class="{'disabled ': loading_add}">
                                {{$t('button.cancel.text')}}
                              </b-button>
                              <b-button size="md" variant="success" @click="updatePassword($event, row.item.id_agent)">
                                {{$t('button.save.text')}}
                              </b-button>
                            </template>
                        </b-modal>
                        <b-dropdown-item>
                            <span class="btn-block" @click="deleteAgent(row.item.id_agent)"><i class="bx bx-trash text-danger mr-1"></i>  {{$t('button.hapus.text')}} </span>
                        </b-dropdown-item>
                  </b-dropdown>
                </template>
              </b-table>
               <div v-if="!tableData[0]">
                <div  class="row  mt-5 mb-5 pb-4 mx-auto">
                    <div class="col-12  p-5 my-5 text-center">
                        <span class="text-secondary">{{ $t('all.dnf') }}</span>  
                    </div>
                </div>
              </div>
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
import UserService from "@/helpers/user.service";
import AgenService from "@/helpers/agen.service";
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
      title: this.$t("user-management.agen-management"),
      items: [
        {
          text: this.$t("menuitems.dashboards.text"),
          href: "#",
        },
        {
          text: this.$t("user-management.agen-management"),
          active: true,
        },
      ],
      region:[],
      loading:false,
      loading_add:false,
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
        { key: "id_agen", thClass: "d-none", tdClass: "d-none" },
         { key: "bulk",  thStyle: { width: "2%" }, label:'#'},
        {
          key: "agent",
          sortable: true,
          label: this.$t("user-management.agent"),
        },
        // {
        //   key: "gender",
        //   sortable: true,
        //   label: 'G',
        // },
        {
          key: "id_region",
          sortable: true,
          label: this.$t("user-management.region"),
        },
        // {
        //   key: "birth_date",
        //   sortable: true,
        //   label: this.$t("user-management.birth-date"),
        // },
        { 
          key: "agent_status",
          sortable: true,
          label: this.$t("user-management.agent-status"),
        },
        { key: "avatar", thClass: "d-none", tdClass: "d-none" },
        {
          key: "actions",
          class: "text-center",
          label: this.$t("user-management.action"),
        },
      ],
      form: {
        agent: {
          "name"      : "",
          "phone"     : "",
          "gender"    : "",
          "email"     : "",
          "nik"       : "",
          "address"   : "",
          "birth_date": "",
          "id_region" : ""
        },
        pass: {
          id_agent: "",
          new_password: "",
          confirm_password: ""
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
      agent: {
        name: { required },
        phone: { required },
        gender: { required },
        email: { required },
        nik: { required },
        address: { required },
        birth_date: { required },
        password: { required },
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
                this.selected.push(this.tableData[i].id_agent);
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
    getAgent() {
      this.loading = true;
      AgenService.getAllAgent()
        .then((response) => {
          this.tableData = [];
          console.log(response.data.data);
          response.data.data.forEach((val) => {
            const data = {
              id_agent: val.id_agent,
              nik: val.nik,
              address: val.address,
              birth_date: val.birth_date,
              agent_location: val.agent_location,
              agent_status: val.agent_status,
              is_ready: val.is_ready,
              is_in_case: val.is_in_case,
              auto_recieve: val.auto_recieve,
              device_name: val.device_name,
              device_token: val.device_token,
              id_region: val.id_region,
              name: val.account.name,
              phone: val.account.phone,
              email: val.account.email,
              gender: val.account.gender,
              account: val.account,
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

    getAgentUpdate() {
      AgenService.getAllAgent()
        .then((response) => {
          this.tableData = [];
          // console.log(response.data.data);
          response.data.data.forEach((val) => {
            const data = {
              id_agent: val.id_agent,
              nik: val.nik,
              address: val.address,
              birth_date: val.birth_date,
              agent_location: val.agent_location,
              agent_status: val.agent_status,
              is_ready: val.is_ready,
              is_in_case: val.is_in_case,
              auto_recieve: val.auto_recieve,
              device_name: val.device_name,
              device_token: val.device_token,
              id_region: val.id_region,
              name: val.account.name,
              phone: val.account.phone,
              email: val.account.email,
              gender: val.account.gender,
              account: val.account,
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
    addAgentModal(){
        this.$bvModal.show('modal-add')
        this.form.agent.name = "";
        this.form.agent.phone = "";
        this.form.agent.gender = "";
        this.form.agent.email = "";
        this.form.agent.id_region = "";
        this.form.agent.nik = "";
        this.form.agent.address = "";
        this.form.agent.birth_date = "";
        // this.form.agent.password = "";
    },
    addAgent(e) {
      this.submitted = true;
      this.$v.form.agent.$touch();
      if (
        this.form.agent.name == "" ||
        this.form.agent.phone == "" ||
        this.form.agent.gender == "" ||
        this.form.agent.email == "" ||
        this.form.agent.id_region == "" ||
        this.form.agent.nik == "" ||
        this.form.agent.address == "" ||
        this.form.agent.birth_date == ""
      ) {
        e.preventDefault();
      } else {
        this.loading_add = true;
        const data = {
          name: this.form.agent.name,
          phone: this.form.agent.phone,
          email: this.form.agent.email,
          gender: this.form.agent.gender,
          id_region: this.form.agent.id_region,
          nik: this.form.agent.nik,
          address: this.form.agent.address,
          birth_date: this.form.agent.birth_date,
          // password: this.form.agent.password,
        };

        console.log(data);
        AgenService.addAgent(data)
          .then((response) => {
            this.getAgentUpdate();
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
            this.loading_add = false;
          })
          .catch((err) => {
            console.log(err);
            this.loading_add = false;
          });
      }
    },
    editAgent(id_agent, name, phone, nik, gender, email, address, birth_date, id_region) {
      console.log(id_region);
      this.$bvModal.show("modal-edit" + id_agent);
      this.form.agent.name = name;
      this.form.agent.phone = phone;
      this.form.agent.gender = gender;
      this.form.agent.email = email;
      this.form.agent.nik = nik;
      this.form.agent.address = address;
      this.form.agent.birth_date = birth_date;
      this.form.agent.id_region = id_region;
    },

    updateAgent(e, id) {
      this.submitted = true;
      this.$v.form.agent.$touch();
      if ( this.form.agent.name == "" ||
        this.form.agent.phone == "" ||
        this.form.agent.gender == "" ||
        this.form.agent.email == "" ||
        this.form.agent.id_region == "" ||
        this.form.agent.nik == "" ||
        this.form.agent.address == "" ||
        this.form.agent.birth_date == "") {
        e.preventDefault();
      } else {
        this.loading_add = true;
        let data = {
              "name"      : this.form.agent.name,
              "phone"     : this.form.agent.phone,
              "gender"    : this.form.agent.gender,
              "email"     : this.form.agent.email,
              "user_type" : 'agent',
              "nik"       : this.form.agent.nik,
              "address"   : this.form.agent.address,
              "birth_date": this.form.agent.birth_date,
              "id_region" : this.form.agent.id_region,
        }
        console.log(data);
        AgenService.updateAgent(id, data)
          .then((response) => {
            this.loading_add = false;
            let id_agent = response.data.data.id_user;
            this.getAgentUpdate();
            Vue.swal({
              position: "top-end",
              icon: "success",
              title: response.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            this.resetForm();
            this.$v.$reset();
            this.$bvModal.hide("modal-edit" + id_agent);
          })
          .catch((err) => {
            console.log(err);
            this.loading_add = false;
          });
      }
    },
    deleteAgent(id) {
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
          AgenService.deleteAgent(id)
            .then((response) => {
              this.getAgentUpdate();
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
    changePassword(id_agent, email) {
      this.form.pass.email = email;
      this.form.pass.id_agent = id_agent;
      this.$bvModal.show("modal-change-password"+id_agent);
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
        console.log(data);
        AgenService.updatePasswordAgent(data)
          .then((response) => {
            console.log(response);
            this.getAgentUpdate();
            Vue.swal({
              position: "top-end",
              icon: "success",
              title: response.data.message,
              showConfirmButton: false,
              timer: 1500,
            });
            this.$bvModal.hide("modal-change-password"+this.form.pass.id_agent);
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
                console.log(data);
                  AgenService.bulkDeleteAgent(data)
                  .then( response => {
                      this.selected = [];
                      this.getAgentUpdate();
                      Swal.fire({
                          position: "top-end",
                          icon: "success",
                          title: this.$t('alert.alert-delete-web'),
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
        this.form.agent.name = "",
        this.form.agent.phone = "",
        this.form.agent.gender = "",
        this.form.agent.email = "",
        this.form.agent.id_region = "",
        this.form.agent.nik = "",
        this.form.agent.address = "",
        this.form.agent.birth_date = "",
        this.form.agent.password = ""
      }, 2000);
    },
    formatDate(value) {
      return moment(value).format("YYYY-MM-DD hh:mm");
    },
  },
  beforeMount(){
    this.list();
  },
  mounted() {
    this.totalRows = this.items.length;
    this.getAgent();
    this.getRegion();
  },
};
</script>

<style scoped>
.badge {
  border-radius: 2%;
}

</style>
