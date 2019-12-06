<template>
    <div class="make-res">
        <div class="make-res__title">Make a reservation</div>
        <form @submit.prevent="makeRes" class="make-res__form">
            <div class="make-res__input-box">
                <label for="resDates">Dates</label>
                <flat-pickr v-model="date"  placeholder="2018-01-01"></flat-pickr>
            </div>
            <div class="make-res__input-box">
                <label for="guest">Guest</label>
                <input type="text" name="guest" class="make-res__input-field" placeholder="">
            </div>
            <div class="make-res__input-box">
                <label for="phone">Phone</label>
                <input type="text" name="phone" class="make-res__input-field" placeholder="">
            </div>
            <div class="m-top-2">
                <button class="btn btn-primary">reserve</button>
            </div>
        </form>
    </div>
</template>

<script>
    import flatPickr from 'vue-flatpickr-component';
    import 'flatpickr/dist/flatpickr.css';
export default {
    components: {
        flatPickr
    },
    data() {
        return {
            date: null
        }
    },
    methods: {
        makeRes() {
            console.log('called')
        }
    }

}
</script>

<style lang="scss">
.make-res {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 25px;
    

    &__title {
        color: $color1;
        text-transform: uppercase;
        margin-bottom: 2.9rem;
    }

    &__form {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    &__input-box {
        display: flex;
        align-items: baseline;

        &:not(:last-child) {
            margin-bottom: .65rem;
        }
    }

    &__input-box label {
        width: 5rem;
        text-transform: uppercase;
        font-size: 1.3rem;
        margin-right: 1rem;
        color: $colorG;
        
    }

    &__input-field {
        outline: none;
        border: none;
        padding: .3rem;
        border-bottom: 1px solid $colorG;
        background-color: transparent;
        transition: all .3s;

        &:focus {
            border-bottom: 2px solid rgba($color1, .9);
            outline: none;
        }
    }

}
.m-top-2 {
    margin-top: 5rem;
}

</style>