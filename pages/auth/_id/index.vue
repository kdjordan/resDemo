<template>
  <div>
      <Header :userName="this.$route.params.id"/>
        <div class="container">
            <div class="container__top">
                <CircleImg imageUrl="sunriver-sm.png" alt="sunriver home" homeName="Sunriver"/>
            </div>
            <div class="container__bottom">
                <div class="container__bottom--left">
                    <MakeResForm :homeId="this.$route.params.id"/>
                </div>
                <div class="container__bottom--right">
                    <ResList />
                </div>
            </div>

      </div>
    
  </div>
</template>

<script>
import Header from '@/components/Header'
import CircleImg from '@/components/HomesCircle'
import ResList from '@/components/ReservationList'
import MakeResForm from '@/components/MakeReservation'

export default {
    components: {
        Header,
        CircleImg,
        ResList,
        MakeResForm

    }
}

</script>
<style lang="scss">
.container {
    background: white;
    max-width: 120rem;
    margin: 0 auto;
    padding-top: 7rem;
    display: flex;
    flex-direction: column;
    align-items: top;
    height: 100vh;


    &__bottom {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        margin: 0 auto;
        width: 100%;
        align-items: top;
        margin-top: 7rem;

        &--left {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
    }
}
</style>
