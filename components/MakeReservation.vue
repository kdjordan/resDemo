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
                <button class="btn btn-primary" :disabled="getInitError">reserve</button>
            </div>
      </div>
            <!-- phone:: {{this.$store.state.errors.initPhoneError}}
            cal:: {{this.$store.state.errors.initCalendarError}}
            guest:: {{this.$store.state.errors.initGuestError}} -->
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
            }
        }
    },
    computed: {
        ...mapGetters({
            getInitError: 'errors/getResInitErrorState',
            getGuestError: 'errors/getGuestEmptyError',
            phoneError: 'errors/getPhoneEmptyError',
            guestError: 'errors/getGuestEmptyError',
            userId: 'reservation/getUserId',
            disabledDates: 'reservation/getDisabledDates'
        })
    },
    watch: {
        dates() {
             if(this.dates != null) { this.$store.commit('errors/setInitCalendarErrorFalse'); }
            if(this.dates == null) {
                this.$store.commit('errors/setCalendarEmptyError', {status: true, mssg: 'You Must Select Dates'});
            } else {
                this.$store.commit('errors/setCalendarEmptyError', {status: false, mssg: ''});
            }
        },
        guest() {
            if(this.guest != '') { this.$store.commit('errors/setInitGuestErrorFalse'); }
            if(this.guest == '') {
                this.$store.commit('errors/setGuestEmptyError', {status: true, mssg: 'You Must Provide a Guest'});
            } else {
                this.$store.commit('errors/setGuestEmptyError', {status: false, mssg: ''});
            }
        },
        phone() {
            if(this.phoone != '') { this.$store.commit('errors/setInitPhoneErrorFalse'); }
            if(this.phone == '') {
                this.$store.commit('errors/setPhoneEmptyError', {status: true, mssg: 'You Must Provide a Phone #'});
            } else {
                this.$store.commit('errors/setPhoneEmptyError', {status: false, mssg: ''});
            }
        }
    },
    methods: {
        makeRes() {
            if(this.checkFields() == true) {
                this.$store.dispatch('reservation/makeReservation', {
                    
                    dates: this.dates,
                    guest: this.guest,
                    phone: this.phone,
                }).then((res) => {
                    console.log(res)
                }).catch((e) => {
                    console.log(e)
                });
            }
        },
        checkFields() {
            console.log('checking')
            if(this.dates == null) {
                this.$store.commit('errors/setAdminError', {status: true, mssg: 'No Date Selected'});
                return false;
            } else if (this.guest == '') {
                this.$store.commit('errors/setGuestEmptyError', {status: true, mssg: 'No Guest Selected'});
                return false;
            } else {
                return true;
            }

        }
    },
    mounted() {
            this.$store.commit('errors/resetErrors');
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
</style>