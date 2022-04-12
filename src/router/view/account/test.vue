<template>
    <Layout>
        <PageHeader :title="title" :items="items" />
        <div class="row">
        <div class="col-sm-12 col-md-12 col-lg-6">
            <div class="card">
            <div class="card-body text-center">
                <div>
                <b-alert v-if="isFail" show dismissible variant="danger">Password Salah</b-alert>
                    <table class="table-profile table text-left">
                        <thead>
                            <tr>
                                <td width="30%"><b>{{ $t('form.user-management.label.current_password') }}</b></td>
                                <td width="70%">
                                    <div class="input-group">
                                        <input
                                            :type="show.curr ? 'text' : 'password'"
                                            class="form-control"
                                            placeholder="*******"
                                            v-model="form.current_password"
                                            :class="{ 'is-invalid': submitted && $v.form.current_password.$error }"
                                        />
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">
                                                <div v-if="show.curr">
                                                    <i @click="show.curr = false" class="fas fa-eye-slash"></i>
                                                </div>
                                                <div v-else>
                                                    <i @click="show.curr = true" class="fas fa-eye"></i>
                                                </div>
                                            </span>
                                        </div>
                                        <div v-if="submitted && $v.form.current_password.$error" class="invalid-feedback">
                                            <span v-if="!$v.form.current_password.required">{{ $t('form.error.text') }}</span>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td width="30%"><b>{{ $t('form.user-management.label.new_password') }}</b></td>
                                <td width="70%">
                                    <div class="input-group">
                                        <input
                                        :type="show.new ? 'text' : 'password'"
                                        class="form-control"
                                        placeholder="*******"
                                        v-model="form.new_password"
                                        :class="{ 'is-invalid': submitted && $v.form.new_password.$error }"
                                        />
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">
                                                <div v-if="show.new">
                                                    <i @click="show.new = false" class="fas fa-eye-slash"></i>
                                                </div>
                                                <div v-else>
                                                    <i @click="show.new = true" class="fas fa-eye"></i>
                                                </div>
                                            </span>
                                        </div>
                                        <div v-if="submitted && $v.form.new_password.$error" class="invalid-feedback">
                                            <span v-if="!$v.form.new_password.required">{{ $t('form.error.text') }}</span>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td width="30%"><b>{{ $t('form.user-management.label.confirm_password') }}</b></td>
                                <td width="70%">
                                    <div class="input-group">
                                        <input
                                            :type="show.conf ? 'text' : 'password'"
                                            class="form-control"
                                            placeholder="*******"
                                            v-model="form.confirm_password"
                                            :class="{ 'is-invalid': submitted && $v.form.confirm_password.$error }"
                                            />
                                        <div class="input-group-prepend">
                                            <span class="input-group-text">
                                                <div v-if="show.conf">
                                                    <i @click="show.conf = false" class="fas fa-eye-slash"></i>
                                                </div>
                                                <div v-else>
                                                    <i @click="show.conf = true" class="fas fa-eye"></i>
                                                </div>
                                            </span>
                                        </div>
                                        <div v-if="submitted && $v.form.confirm_password.$error" class="invalid-feedback">
                                            <span v-if="!$v.form.confirm_password.required">{{ $t('form.error.text') }}</span>
                                            <span v-if="!$v.form.confirm_password.sameAsPassword && $v.form.confirm_password.required">{{ $t('form.error.text') }}</span>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div class="text-right mr-2">
                    <b-button class="btn" variant="primary" @click="updatePassword"> 
                        <span class="d-none d-sm-inline-block">
                            Update
                        </span>
                    </b-button>
                </div>
            </div>
            </div>
        </div>
        </div>
    </Layout>
</template>

<script>
import Layout from "../../layouts/main";
import appConfig from "@/app.config";
import PageHeader from "@/components/page-header";
import UserService from "@/helpers/user.service";
import { required, sameAs } from "vuelidate/lib/validators";
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
            title: "User Profile",
            isFail: false,
            show: {
                curr: false,
                new: false,
                conf: false,
            },
            form:{
                current_password:'',
                new_password:'',
                confirm_password:'',
            },
            submitted: false,
            items: [
                {
                text: "Home",
                href: "/"
                },
                {
                text: "Profile",
                active: true
                }
            ]
        };
    },
    validations: {
        form: {
            current_password: { required },
            new_password: { required },
            confirm_password: { required, sameAsPassword: sameAs('new_password') },
        },
    },
    methods:{
        updatePassword(){
            this.submitted = true;
            this.$v.$touch();
            if (!this.$v.$invalid) {
                UserService.changePassword(this.form)
                .then(response => {
                    Vue.swal({
                        position: "top-end",
                        icon: "success",
                        title: response.data.message,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    this.$v.$reset();
                    this.resetInput();
                })
                .catch(err => {
                    this.isFail = true
                })
            }
        },
        resetInput(){
            this.form.current_password = '';
            this.form.new_password = '';
            this.form.confirm_password = '';
        }
    },
};
</script>

<style lang="scss" scoped>
.table-profile{
    font-size: 14px;
}
</style>
