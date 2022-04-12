<template>
  <Layout>
    <PageHeader :title="title" :items="items" />
    <div class="row">
      <div class="col-sm-12 col-md-12 col-lg-8 col-xl-6">
        <div class="card">
          <div class="card-body text-center">
              <div class="mb-3">
                <img
                :src="urlImage+form.avatar"
                class="mr-3 rounded-circle avatar-xl"
                alt="user-pic"
                />
              </div>
            <div>
             <b-button class="btn btn-sm text-muted" variant="light" @click="editImages(id)"> {{ $t('user-management.change-image') }} </b-button>
            </div>
            <div class="pt-4">
                <table class="table text-left">
                    <thead>
                        <tr>
                            <td width="30%"><b>{{ $t('user-management.name') }}</b></td>
                            <td width="70%">
                                <input
                                id="validationCustom01"
                                type="text"
                                class="form-control"
                                :placeholder="$t('user-management.name')"
                                v-model="form.name"
                                :class="{ 'is-invalid': submitted && $v.form.name.$error }"
                                />
                                <div v-if="submitted && $v.form.name.$error" class="invalid-feedback">
                                    <span v-if="!$v.form.name.required">{{ $t('form.error.text') }}</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td width="30%"><b>Email</b></td>
                            <td width="70%">
                               <input
                                id="validationCustom01"
                                type="email"
                                class="form-control"
                                :placeholder="$t('user-management.email')"
                                v-model="form.email"
                                :class="{ 'is-invalid': submitted && $v.form.email.$error }"
                                />
                                <div v-if="submitted && $v.form.email.$error" class="invalid-feedback">
                                    <span v-if="!$v.form.email.required">{{ $t('form.error.text') }}</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td width="30%"><b>{{ $t('user-management.phone') }}</b></td>
                            <td width="70%">
                                <input
                                id="validationCustom01"
                                type="text"
                                class="form-control"
                                :placeholder="$t('user-management.phone')"
                                v-model="form.phone"
                                :class="{ 'is-invalid': submitted && $v.form.phone.$error }"
                                />
                                <div v-if="submitted && $v.form.phone.$error" class="invalid-feedback">
                                    <span v-if="!$v.form.phone.required">{{ $t('form.error.text') }}</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td width="30%"><b>{{ $t('user-management.gender') }}</b></td>
                            <td width="70%">
                                <input
                                id="validationCustom01"
                                type="text"
                                class="form-control"
                                :placeholder="$t('user-management.gender')"
                                v-model="form.gender"
                                :class="{ 'is-invalid': submitted && $v.form.gender.$error }"
                                />
                                <div v-if="submitted && $v.form.gender.$error" class="invalid-feedback">
                                    <span v-if="!$v.form.gender.required">{{ $t('form.error.text') }}</span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td width="30%"><b>{{ $t('user-management.user-type') }}</b></td>
                            <td width="70%"><input type="text" class="form-control bg-light" v-model="form.role" readonly></td>
                        </tr>
                        <!-- <tr>
                            <td width="30%"><b>{{ $t('user-management.active-until') }}</b></td>
                            <td width="70%"><input type="date" class="form-control bg-light" v-model="form.active_until" readonly></td>
                        </tr> -->
                        <tr>
                            <td width="30%"><b>{{ $t('user-management.created-at') }}</b></td>
                            <td width="70%"><input type="text" class="form-control bg-light" :value="formatDate(form.created_at)" readonly></td>
                        </tr>
                        <tr>
                            <td width="30%"><b>{{ $t('user-management.updated-at') }}</b></td>
                            <td width="70%"><input type="text" class="form-control bg-light" :value="formatDate(form.update_at)" readonly></td>
                        </tr>
                    </thead>
                </table>
            </div>
            <div class="text-right mr-2">
               <b-button class="btn" variant="success" @click="updateUser"> 
                  <span class="d-none d-sm-inline-block">
                     {{ $t('all.update') }}
                  </span>
                </b-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-modal
      ref="ref-modal-edit"
      :id="'modal-edit-images'+id"
      centered
      :title="$t('button.update.text')"
      title-class="font-18"
      :ok-title="$t('button.update.text')"
      :cancel-title="$t('button.cancel.text')"
      @ok="updateImagesProfile($event, id)"
  >
      <div class="row">
         <div class="col-md-12">
              <div class="form-group text-center">
                  <!-- <img :src="urlimage+form.avatar" class="avatar-xl rounded-circle mr-4"/> -->
              </div>
          </div>
          <div class="col-md-12">
              <div class="form-group">
                  <label for="validationCustom01">{{ $t('user-management.new-image') }} </label>
                    <b-form-file
                        :state="true"
                        :placeholder="$t('user-management.choose')"
                        :drop-placeholder="$t('user-management.drop')"
                        @change="ImageTarget"
                        accept="image/*"
                    >
                    </b-form-file>
              </div>
          </div>
      </div>
       <template #modal-footer="{ ok, cancel }">
                <b-button size="md" variant="danger" @click="cancel()">
                  Cancel
                </b-button>
                <b-button size="md" variant="success" @click="ok()">
                  Save
                </b-button>
        </template>
    </b-modal>
  </Layout>
</template>

<script>
import Layout from "../../layouts/main";
import appConfig from "@/app.config";
import PageHeader from "@/components/page-header";
import UserService from "@/helpers/user.service";
import { required } from "vuelidate/lib/validators";
import store from '@/state/store';
import moment from 'moment';
import Swal from "sweetalert2";
import Vue from "vue";

/**
 * Profile component
 */
export default {
  page: {
    title: "User Profile",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout, PageHeader },
  data() {
    return {
      urlImage: process.env.VUE_APP_BASE_API_URL_AVATAR,
      title: this.$t("user-management.user-profile"),
      id:'',
      image_avatar:'',
      form:{
        role: "",
        id_user: "",
        name: "",
        phone: "",
        gender: "",
        email: "",
        email_verified_at: "",
        avatar: "",
        active_until: "",
        created_at: "",
        update_at: ""
      },
      submitted: false,
      items: [
        {
          text: "Home",
          href: "/"
        },
        {
          text: this.$t("user-management.user-profile"),
          active: true
        }
      ]
    };
  },
  validations: {
    form: {
        name: { required },
        email: { required },
        gender: { required },
        phone: { required },
    },
},
  mounted(){
    this.list();
  },
  methods:{
    list() {
      UserService.getProfile()
      .then(response => {
        // this.form = response.data.data;
        console.log(response.data);
        this.form.role = response.data.data.admin.role,
        this.form.id_user = response.data.data.id_admin,
        this.form.name = response.data.data.name,
        this.form.phone = response.data.data.phone,
        this.form.gender = response.data.data.gender,
        this.form.email = response.data.data.email,
        this.form.email_verified_at = response.data.data.email_verified_at,
        this.form.avatar = response.data.data.profile_pict,
        this.form.active_until = response.data.data.active_until,
        this.form.created_at = response.data.data.created_at,
        this.form.update_at = response.data.data.update_at,
        console.log(response.data.data);
      })
      .catch(e => {
        this.message = e.response.data.data
      });
    },
    ImageTarget(evt){
      this.image_avatar = evt.target.files[0];
    },
    updateImagesProfile(){
      const formImages = new FormData();
      formImages.append('avatar', this.image_avatar, this.image_avatar.name);
      console.log( this.image_avatar, this.image_avatar.name);
        UserService.updateUserAvatar(formImages)
        .then( response => {
            this.list();
            /** update data localstorage user */
            const user = JSON.parse(localStorage.getItem('user'))
            user.avatar = response.data.data.avatar;
            localStorage.setItem('user', JSON.stringify(user));
            /** event to read changes in localstorage user  */
            window.dispatchEvent(new CustomEvent('ava-changed', {
              detail: {
                avatar: response.data.data.avatar
              }
            }));

            Vue.swal({
                position: "top-end",
                icon: "success",
                title: response.data.message,
                showConfirmButton: false,
                timer: 1500
            });
            this.$v.$reset();
        })
        .catch(err => {
            console.log(err);
      });
    },
    updateUser(e){
      this.submitted = true;
      this.$v.$touch();
      if (this.form.name == '' || this.form.email == '' || this.form.phone == '' || this.form.gender == '') {
          e.preventDefault();
      }
      else{
        let data = {
          "name" : this.form.name,
          "phone" : this.form.phone,
          "gender" : this.form.gender,
          "email" : this.form.email
        }
        console.log(data);
          UserService.updateProfile(data)
          .then( response => {
              console.log(response);
              this.list();
              Vue.swal({
                  position: "top-end",
                  icon: "success",
                  title: response.data.message,
                  showConfirmButton: false,
                  timer: 1500
              });
              this.$v.$reset();
          })
          .catch(err => {
              console.log(err);
          });
      }
    },
    formatDate(value){
      return moment(value).format("YYYY-MM-DD, hh:mm:ss");
    },
    editImages(id){
        this.$bvModal.show('modal-edit-images'+id)
    },
  },
  mounted(){
    this.list();
  }
};
</script>

<style lang="scss" scoped>
.table-profile{
    font-size: 14px;
}
</style>
