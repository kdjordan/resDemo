<template>
  <div>
    <section class="login">
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
                
                <nuxt-link to="/admin/users" style="color:black;">Admin</nuxt-link><br />
                <nuxt-link to="/auth/" style="color:black;">Reservations</nuxt-link>
                
            </form>
        </div> 
        ::{{getUserName}}<br/>
        ::{{getUserId}}
    </section>
  </div>
</template>

<script>
import DOMPurify from 'dompurify'
import { mapGetters } from 'vuex'

export default {
    layout: 'login',
    data() {
        return {
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
            getIsAdmin : 'auth/getIsAdmin',
            activeHomes: 'reservation/getActiveUserHomes'
            
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
            if(this.checkForm()) {
                this.$store.dispatch('auth/loginUser', {
                    userName: DOMPurify.sanitize(this.username.trim()),
                    password: DOMPurify.sanitize(this.password.trim())
                }).then((res) => {
                    if(res == 'invalid') {
                        this.isError = true;
                        this.errorMessage = 'Invalid Login Credentials'
                    } else {
                        console.log('====')
                        console.log(this.activeHomes)
                        this.$router.push(`/auth/${this.getUserId}`)
                    }
                    // this.$router.push('/admin');
                }).catch((e) => {
                    console.log(e);
                    if(e == 401) {
                        this.isError = true;
                        this.errorMessage = 'Invalid Login Credentials'
                    } else {
                         this.isError = true;
                        this.errorMessage = 'Not Working'
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
    }
    

}
</script>

<style lang="scss">
.login {
    text-align: center;
    color: $color1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;

    &__top {
        margin-bottom: 2rem;
        &--img {
            width: 25%;
            border-radius: 50%;
            border: 5px solid $color1;
            margin-bottom: 2rem;
        }
        &--title {
            font-size: 4rem;
        }
        &--subtitle {
            font-size: 2rem;
            text-transform: uppercase;
        }
    }

    &__form {
        width: 20rem;

        &--input {
            width: 100%;
            font-size: 1.6rem;
            font-weight: 300;
            border: none;
            border-bottom: 1px solid $color1;
            display: block;
            padding-bottom: .5rem;
            margin: 3rem 0;

        }
        &--input:focus {
            outline: none;
        }
    }

    &__btn {
        padding: 1rem 2rem;
        border-radius: 10px;
        background: $color1;
        color: #fff;
        transition: all .4s;
        cursor: pointer;
        
    }

    &__btn:focus {
        outline: none;
    }
    &__btn:active,
    &__btn:hover {
        
        background: transparent;
        color: $color1;
    }

    &__error {
        margin-top: 1rem;
        width: 50%;
        margin: 0 auto;
    }
}

input::placeholder {
    font-size: 1.2rem;
    text-transform: uppercase;
    letter-spacing: 5px;
    text-align: center;
}

</style>