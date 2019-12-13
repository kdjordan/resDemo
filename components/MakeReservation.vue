<template>

    <div class="make-res">
        <div class="make-res__title">Make a reservation</div>
        <form @submit.prevent="makeRes" class="make-res__form">
            <div class="make-res__input-box">
                
                <flat-pickr v-model="dates" :config="config" @on-change="toggleAdminError"></flat-pickr>
            
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
            {{activeHomes}}<hr > 
            {{guest}}
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
        guest() {
            if(this.guest == '') {
                this.$store.commit('errors/setGuestError', {status: true, mssg: 'Guest is Empty'})
            } else {
                this.$store.commit('errors/setGuestError', {status: false, mssg: ''})
            }
        },
        phone() {
            if(this.phone == '') {
                this.$store.commit('errors/setPhoneError', {status: true, mssg: 'Phone is Empty'})
            } else {
                this.$store.commit('errors/setPhoneError', {status: false, mssg: ''})
            }
        },
    },
    methods: {
        toggleAdminError() {
            this.$store.commit('errors/setAdminError', {status: false, mssg: ''})
        },
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
        checkForm() {
            if(!this.dates.includes('to') || this.dates.length != 24) {
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
        this.$store.dispatch('admin/initMakeRes', this.$store.state.reservation.userId);
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