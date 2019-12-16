<template>

    <div class="make-res">
        <div class="make-res__title">Make a reservation</div>
        <form @submit.prevent="makeRes" class="make-res__form">
            <div class="make-res__input-box">
                
                <flat-pickr v-model="dates" :config="config" @on-change="removeDateError"></flat-pickr>
            
            </div>
            
            <div class="make-res__input-box m-top-2">
                <label for="guest" :class="{invalid: guestError}">Guest</label>
                <input type="text" name="guest" v-model.trim="guest" class="make-res__input-field" placeholder="">
            </div>
            <div class="make-res__input-box">
                <label for="phone" :class="{invalid: phoneError}">Phone</label>
                <input type="phone" name="phone" v-model.trim="phone" class="make-res__input-field" placeholder="">
            </div>
            <div class="flex-items__spaced--edit full-width">
                
                <Messages />

            <div class="right-item__indicator--edit">
                <button class="btn btn-primary btn-lrg" :disabled="getErrors">reserve</button>
            </div>
      </div>
            <!-- {{activeHomes}} -->
        </form>
    </div>
</template>

<script> 
import Messages from '@/components/UI/Messages'
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import { mapGetters } from 'vuex'

export default {
    props: ['homeId'],
    components: {
        flatPickr,
        Messages
    },
    data() {
        return {
            dates: null,
            guest: null,
            phone: null,
            config: {
                inline: true,
                mode: "range",
                dateFormat: "Y-m-d",
                disable: this.$store.state.reservation.disabledDates
            },
        }
    },
    computed: {
        ...mapGetters({
            userId: 'reservation/getUserId',
            disabledDates: 'reservation/getDisabledDates',
            phoneError: 'errors/getPhoneError',
            guestError: 'errors/getGuestError',
            adminError: 'errors/getAdminError',
            activeHomes: 'reservation/getActiveUserHomes'

        }),
        //** FN : makes button inactive if any errors are noticed
        getErrors() {
            if(this.dates == null || (this.guest == '' || this.guest == null) || 
                (this.phone == '' || this.phone == null) || (this.dates == null || this.adminError)) {
                return true;
            } else {
                return false;
            }
        }
    },
    watch: {
        //** FN : throws error if guest input is empty, also removes it if not
        guest() {
            if(this.guest == '') {
                this.$store.commit('errors/setGuestError', {status: true, mssg: 'Guest is Empty'})
            } else {
                this.$store.commit('errors/setGuestError', {status: false, mssg: ''})
            }
        },
        //** FN : throws error if phone input is empty, also removes it if not
        phone() {
            if(this.phone == '') {
                this.$store.commit('errors/setPhoneError', {status: true, mssg: 'Phone is Empty'})
            } else {
                this.$store.commit('errors/setPhoneError', {status: false, mssg: ''})
            }
        },
    },
    methods: {
        //** FN : removes dateError state if user has begun to address date error 
        removeDateError() {
            this.$store.commit('errors/setAdminError', {status: false, mssg: ''})
        },
        //** FN : checks to make sure fields are complete
        //**    : if good, dispathces data to module for axios call to DB
        //**    : after successfull insertion, resets reservation state for another entry
        makeRes() {
            if(this.checkForm()) {
                this.$store.dispatch('reservation/makeReservation', {
                    dates: this.dates,
                    guest: this.guest,
                    phone: this.phone,
                }).then((res) => {
                    if(res == 'success') {
                        this.$store.commit('errors/setAdminError', {status: false, mssg: ''})
                        this.dates = null;
                        this.guest = null;
                        this.phone = null;
                    } else {
                        this.$store.commit('errors/setAdminError', {status: true, mssg: 'Error Making Reservation'})
                    }
                }).catch(() => {
                        
                });
            }
        },
        //** FN    : checks to make sure dates are within range and formatted properly
        //**       : also checks to make sure phone and guest are present
        //** CALLS : date validation helper functions
        //** RTRN  : boolean true if everythins is good to go, false if error present
        checkForm() {
            
            if(!this.dates.includes('to') || !this.dates.length == 24 || this.checkDates()) {
                this.$store.commit('errors/setAdminError', {status: true, mssg: 'Improper Date Selection'})
                return false;
            } else if(this.guest == ''){
                this.$store.commit('errors/setAdminError', {status: true, mssg: 'Guest name Required'})
                guestError = true;
                return false;
            } else if(this.phone == '') {
                this.$store.commit('errors/setAdminError', {status: true, mssg: 'Phone # Required'})
                phoneError = true;
                return false;
            } else {
                return true;
            }
        },
        //** FN   : checks dates to make sure they are NOT in the past
        //** RTRN : boolean true if dates are good
        checkDates() {
            if(new Date(this.dates.split('to')[0].trim().replace(/-/g, '\/')) < new Date() || 
                new Date(this.dates.split('to')[1].trim().replace(/-/g, '\/')) < new Date()) {
                    return true;
            } else {
                return false;
            }
        }
    },
    //** FN : sets up store with data needed for new reservations
    //**    : need user data and home data for rendering unavailable dates
//     async mounted() {
//     try{
//         console.log('grabbing')
//         console.log(this.$store.state.auth.user_Id)
//         let data = await this.$store.dispatch('admin/getUserData', this.$store.getters['auth/getUserId'])
//         let ans = await this.$store.dispatch('admin/initMakeRes', data.homesArray);
//         if(ans == 'error') {
//             this.$store.commit('errors/setAdminError', {status: true, mssg: 'Error Loading User'})
//         }
//     } catch (e) {
//         console.log(e)
//     }
// }
}
</script>
<style lang="scss">
.full-width {
    width: 100%;
}
.disabled {
    background: white;
}
</style>