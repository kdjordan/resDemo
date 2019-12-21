<template>
  <div>
    <div v-if="loading" class="loading" >
        <div class="lds-dual-ring">
            <!-- <div><div></div></div> -->
        </div>

    </div>
    <div v-else>
    <section  v-if="!loading" class="login">
        <div class="login__top">
            <img src="@/assets/img/sunriver-sm.png" class="login__top--img">
            <div class="login__top--title">AMC</div>
            <div class="login__top--subtitle">Vacation Rentals</div>
             <transition name="fade">
                <div v-show="isError" class="error login__error">{{ getErrorMessage }}</div>
             </transition>
        </div>
        <div class="login__form">
            <form @submit.prevent="loginUser">

                <input type="text" v-model="username" class="login__form--input"  placeholder="username" @focus="removeError">
                <input type="text" v-model="password" class="login__form--input"  placeholder="password" @focus="removeError">
                
                <div>
                    <button class="btn btn-primary">SUBMIT</button>
                </div>
            </form>
        </div> 
        <!-- ::{{getUserName}}<br/>
        ::{{getUserId}}<br />
        ::{{getActiveHomeId}} -->
        
    </section>
    </div>
  </div>
</template>

<script>
import DOMPurify from 'dompurify'
import { mapGetters } from 'vuex'

export default {
    layout: 'login',
    data() {
        return {
            loading: true,
            username: '',
            password: '',
            errorMessage: '',
            isError: false
        }
    },
    computed: {
        ...mapGetters({
            getUserName : 'auth/getUserName',
            getUserId : 'auth/getUserId',
            getActiveHomeId : 'reservation/getActiveHomeId'
            
        }),
        getErrorMessage() {
            return this.errorMessage;
        }
    },
    methods: {
        removeError() {
            this.isError = false;
            this.errorMessage = '';
        },
        loginUser() {
            this.loading = true;
            if(this.checkForm()) {
                this.$store.dispatch('auth/loginUser', {
                    userName: DOMPurify.sanitize(this.username.trim()),
                    password: DOMPurify.sanitize(this.password.trim())
                }).then((res) => {
                    if(res == 'invalid') {
                        this.isError = true;
                        this.errorMessage = 'Invalid Login Credentials'
                    } else if (res == 'keeper') {
                        this.$router.push(`/auth/keeper/${this.getActiveHomeId}`);
                    } else {    
                        this.$router.push(`/auth/${this.getActiveHomeId}`);
                    }
                }).catch((e) => {
                    console.log(e);
                    if(e == 401) {
                        this.isError = true;
                        this.errorMessage = 'Invalid Login Credentials'
                    } else {
                        this.isError = true;
                        this.errorMessage = e
                    }
                });
            }
        },
        checkForm() {
            if(typeof(this.username) != 'string' || this.username.length < 6 || !this.username.match(/^[0-9a-zA-Z]+$/)) {
                this.isError = true;
                this.errorMessage = 'UserName Error'
                return false;
            }

            if(typeof(this.password) != 'string' || this.password.length < 8 || !this.password.match(/^[0-9a-zA-Z]+$/)) {
                this.isError = true;
                this.errorMessage = 'Password Error'
                return false;
            }

            return true;
        },
        removeError() {
            this.isError = false;
        }
    },
    mounted() {
        // this.$store.dispatch('auth/logoutUser')
        this.loading = true;
        setTimeout(() => {
            this.$store.dispatch('auth/getLocalStorage')
            .then((res) => {
                if(res.role == 'keeper') {
                    this.$router.push(`/auth/keeper/${res.id}`);
                    return;
                } else if(res.role == 'user' || res.role == 'admin'){
                    this.$router.push(`/auth/${res.id}`);
                } else {
                    this.loading = false;
                }
               
            }).catch((e) => {
                 this.isError = true;
                this.errorMessage = e
                this.loading = false;
            });

        }, 900)
    }    

}
</script>