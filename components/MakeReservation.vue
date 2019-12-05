<template>
    <div class="make-res">
        <div class="make-res__title">Make a reservation</div>
        <form action="/makeReservation" @submit.prevent="makeRes" class="make-res__form u-mt-med">
            <div class="make-res__input-box">
                <label for="resDates">Dates</label>
                <input type="text" name="resDates" class="make-res__input-field" placeholder="" id="resCalendar">
            </div>
            <div class="make-res__input-box">
                <label for="guest">Guest</label>
                <input type="text" name="guest" class="make-res__input-field" placeholder="">
            </div>
            <div class="make-res__input-box">
                <label for="phone">Phone</label>
                <input type="text" name="phone" class="make-res__input-field" placeholder="">
            </div>
            <button class="btn btn-primary">reserve</button>
        </form>
    </div>
</template>

<script>
export default {
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
    padding: 2rem 1rem;
    border-radius: 25px;

    &__title {
        color: $color1;
    }
    
    &__form{
        margin-left: 15%;
    }

    &__input-box {
        &:not(:last-child) {
            margin-bottom: 1.2rem;
        }
    }

    &__input-box label {
        display: inline-block;
        width: 5rem;
        text-transform: uppercase;
        font-size: 1.3rem;
        text-align: right;
        margin-right: 1rem;
        color: $colorG;
        
    }

    &__input-field {
        display: inline-block;
        outline: none;
        border: none;
        padding: .3rem;
        border-bottom: 1px solid $colorG;
        background-color: transparent;
        transition: all .3s;
        margin-bottom: -2px;

        &:focus {
            
            border-bottom: 2px solid rgba($color1, .9);
            outline: none;
        }
    }

}

</style>