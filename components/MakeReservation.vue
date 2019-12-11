<template>

    <div class="make-res">
        <div class="make-res__title">Make a reservation</div>
        <form @submit.prevent="makeRes" class="make-res__form">
            <div class="make-res__input-box">
                
                <flat-pickr v-model="dates" :config="config"></flat-pickr>
            
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
                <button class="btn btn-primary" :disabled="getErrors">reserve</button>
            </div>
      </div>
            {{this.$store.state.reservation.userActiveHomes[0]}}<hr > 
            dates:{{dates == null}}
            dates:{{phone == ''}}
            dates:{{guest == ''}}
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
            guest: '',
            phone: '',
            config: {
                inline: true,
                mode: "range",
                dateFormat: "Y-m-d",
                disable: this.$store.state.reservation.disabledDates
            },
            phoneError: false,
            guestError: false
        }
    },
    computed: {
        ...mapGetters({
            userId: 'reservation/getUserId',
            disabledDates: 'reservation/getDisabledDates'
        }),
        getErrors() {
            if(this.dates == null || this.guest == '' || this.phone == '') {
                return true;
            } else {
                return false;
            }
        }
    },
    methods: {
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
                        this.guest = '';
                        this.phone = '';
                    } else {
                        this.$store.commit('errors/setAdminError', {status: true, mssg: 'Error Making Reservation'})
                    }
                }).catch(() => {
                        
                });
            }
        },
        checkForm() {
               if(!this.dates.includes('to')) {
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
        }
    },
    mounted() {
            this.$store.dispatch('admin/initMakeRes', this.$store.state.reservation.userId)
            //based on homesArray - gert active Homes

            //load homesData for first active home
            // this.$store.dispatch('admin/getHomeData', this.$route.params.id)
            // .then(() => {
            //     this.$store.dispatch('notifications/doNotification', {status: true, mssg: 'Home Loaded'})
            // }).catch((e) => {
            //     console.log(e);
            // });
        }


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