<template>

    <div class="make-res">
        <div class="make-res__title">Make a reservation</div>
        <form @submit.prevent="makeRes" class="make-res__form">
            <div class="make-res__input-box">
                
                <flat-pickr v-model="date" :config="config"></flat-pickr>
            
            </div>
            
            <div class="make-res__input-box m-top-2">
                <label for="guest" :class="{invalid: guestError}">Guest</label>
                <input type="text" name="guest" v-model.trim="guest" class="make-res__input-field" placeholder="">
            </div>
            <div class="make-res__input-box">
                <label for="phone" :class="{invalid: phoneError}">Phone</label>
                <input type="phone" name="phone" v-model.trim="phone" class="make-res__input-field" placeholder="">
            </div>
            <div class="flex-items__spaced--edit">

                <Messages />

                <div class="right-item__indicator--edit">
                    <button class="btn btn-primary" :disabled="!phoneError || !guestError">reserve</button>
                </div>
      </div>
            date:: {{date}}
        </form>
    </div>
</template>

<script> 
import Messages from '@/components/UI/Messages'
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import { mapGetters } from 'vuex'

export default {
    components: {
        flatPickr,
        Messages
    },
    data() {
        return {
            date: null,
            guest: '',
            phone: null,
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
            guestError: 'errors/getGuestEmptyError',
            phoneError: 'errors/getPhoneEmptyError',
            disabledDates: 'reservation/getDisabledDates'
        })
    },
    methods: {
        makeRes() {
            if(this.checkFields) {
                console.log('called')
            }
        },
        checkFields() {
            if(this.date == null) {
                this.$store.commit('errors/setAdminError', {status: true, mssg: 'No Date Selected'});
            } else if (this.guest == '') {
                this.$store.commit('errors/setAdminError', {status: true, mssg: 'No Date Selected'});
            }

        }
    }


}
</script>
