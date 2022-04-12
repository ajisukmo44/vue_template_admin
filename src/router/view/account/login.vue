<template>
  <Layout >
    <div class="row justify-content-center loginx pt-5 mt-5">
      <div class="col-md-8 col-lg-6 col-xl-5">
        <div class="card overflow-hidden">
          <div class="">
            <div class="row">
              <div class="col-sm-12 text-center">
                <img src="@/assets/images/logo_primary.png" alt class="img-fluid p-4 my-3" width="155px" />
              </div>
            </div>
          </div>
          <div class="card-body pt-0">
            <div>
              <!-- <router-link tag="a" to="/">
                <div class="avatar-md profile-user-wid mb-4">
                  <span class="avatar-title rounded-circle bg-light">
                    <img src="@/assets/images/logo.svg" alt height="34" />
                  </span>
                </div>
              </router-link> -->
            </div>
            <b-alert v-model="isAuthError" variant="danger" class="mt-3" dismissible>{{authError}}</b-alert>

            <div
              v-if="notification.message"
              :class="'alert ' + notification.type"
            >{{notification.message}}</div>

            <b-form class="p-2" @submit.prevent="tryToLogIn">
              <b-form-group id="input-group-1"  label-for="input-1">
                <b-form-input
                  id="input-1"
                  v-model="email"
                  type="text"
                  placeholder="Enter email"
                  :class="{ 'is-invalid': submitted && $v.email.$error }"
                ></b-form-input>
                <div v-if="submitted && $v.email.$error" class="invalid-feedback">
                  <span v-if="!$v.email.required">Email is required.</span>
                  <span v-if="!$v.email.email">Please enter valid email.</span>
                </div>
              </b-form-group>
              <b-form-group id="input-group-2"  label-for="input-2">
                <b-form-input
                  id="input-2"
                  v-model="password"
                  :type="show ? 'text' : 'password'"
                  placeholder="Enter password"
                  :class="{ 'is-invalid': submitted && $v.password.$error }"
                ></b-form-input>
                <span  @click="show = false" toggle="#password-field" class="fa fa-fw fa-eye-slash field-icon toggle-password mr-2" v-if="show"></span>
                <span  @click="show = true" toggle="#password-field" class="fa fa-fw fa-eye field-icon toggle-password mr-2" v-else></span>
                <div
                  v-if="submitted && !$v.password.required"
                  class="invalid-feedback"
                >Password is required.</div>
              </b-form-group>
              <b-form-group id="input-group-3"  label-for="input-2">
               <div class="row">
                 <div class="col-sm-6">
                  <b-form-input
                  id="input-3"
                  v-model="re_number"
                  type="text"
                  placeholder="Enter chapta"
                  :class="{ 'is-invalid': submitted && $v.re_number.$error }"
                ></b-form-input>
                <div
                  v-if="submitted && !$v.re_number.required"
                  class="invalid-feedback"
                >Chapta is required.</div>
                 </div>
                 <div class="col-sm-6 text-center">
                   <h3 class="mt-1 text-secondary">{{number}}</h3>
                 </div>
               </div>
              </b-form-group>
              <div class="mt-3 my-auto">
                <b-button type="submit" variant="primary" class="btn-block">
                  <b-spinner v-if="loading" label="Loading ..."  small></b-spinner>
                  <span v-if="!loading">
                    Log In
                  </span>
                   <span v-if="loading">
                    Loading..
                  </span>
                </b-button>
              </div>
              <!-- <div class="mt-4 text-center">
                <router-link tag="a" to="/forgot-password" class="text-muted">
                  <i class="mdi mdi-lock mr-1"></i> Forgot your password?
                </router-link>
              </div> -->
            </b-form>
          </div>
          <!-- end card-body -->
        </div>
        <!-- end card -->

        <div class="mt-5 text-center">
          <!-- <p>
            Don't have an account ?
            <router-link tag="a" to="/register" class="font-weight-medium text-primary">Signup now</router-link>
          </p> -->
          <p class="text-light">
            © {{new Date().getFullYear()}} SecureMe Dashboard
            <!-- <i class="mdi mdi-heart text-danger"></i> Crafted with by Themesbrand -->
          </p>
        </div>
        <!-- end row -->
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
  </Layout>
</template>

<script>
import Layout from "../../layouts/auth";
import Vue from "vue";


import {
  authMethods,
  authBackendMethods,
  notificationMethods
} from "@/state/helpers";
import { mapState } from "vuex";

import appConfig from "@/app.config";
import { required, email } from "vuelidate/lib/validators";

/**
 * Login component
 */
export default {
  page: {
    title: "Login",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { Layout },
  data() {
    return {
      email: "",
      password: "",
      submitted: false,
      authError: null,
      tryingToLogIn: false,
      isAuthError: false,
      re_number:'',
      number:'',
      min: 1000,
      max: 9999,
      loading: false,
      show:false,
    };
  },
  validations: {
    email: { required, email },
    password: { required },
    re_number: { required },
  },
  computed: {
    ...mapState("authBackend", ["status"]),
    notification() {
      return this.$store ? this.$store.state.notification : null;
    }
  },
  created() {
    this.getRandomNumber();
  },
  methods: {
    ...authMethods,
    ...authBackendMethods,
    ...notificationMethods,
    // Try to log the user in with the username
    // and password they provided.
    getRandomNumber() {
      this.number = this.generateNumber()
    },
    generateNumber() {
      return Math.floor(Math.random()*(this.max-this.min+1)+this.min);
    },
   
    tryToLogIn() {
      this.submitted = true;
      this.loading = true;
      this.isAuthError = false;
      // stop here if form is invalid
      this.$v.$touch();

      if (this.$v.$invalid) {
        if (this.$store.state.notification != null) {
          setTimeout(() =>{
            this.loading = false;
          }, 500)
        }
        return;
      } else {
        if(this.number == this.re_number){
            // console.log('chapta benar');
            const { email, password } = this;
            if (email && password) {
            this.login({ email, password });
            console.log(this.email, this.password);
            if (this.$store.state.notification != null) {
              setTimeout(() =>{
                this.loading = false;
              }, 1500)
            }
            // this.getRandomNumber();
            }
        }  else{
            this.isAuthError = true;
            this.authError = "Chapta don't match";
            this.getRandomNumber();
            setTimeout(() =>{
              this.loading = false;
            }, 1500)
        }
      }
    }
  }
};
</script>

<style scope>
body {
  /* background-color: #2C2E43; */
  padding: 0;
  margin: 0;
}
.img-fluid{
  height:195px;
}
.field-icon {
  float: right;
  margin-left: -25px;
  margin-top: -25px;
  position: relative;
  z-index: 2;
  margin-right:10px;
}

</style>
