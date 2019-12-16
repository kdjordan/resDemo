<template>
  <div>
      <Header :userName="getUserName"/>
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
        {{activeHomes}}
      </div>
        
  </div>
</template>

<script>
import Header from '@/components/Header'
import CircleImg from '@/components/HomesCircle'
import ResList from '@/components/ReservationList'
import MakeResForm from '@/components/MakeReservation'
import { mapGetters } from 'vuex'

export default {
    components: {
        Header,
        CircleImg,
        ResList,
        MakeResForm

    },
    computed: {
        ...mapGetters({
            getUserName: 'auth/getUserName',
            getIsAdmin: 'auth/getIsAdmin',
            activeHomes: 'reservation/getActiveUserHomes'
        })
    },
    async mounted() {
         try{
             
             console.log('incoming params')
             console.log(this.$route.params.id) //this is homeId !!

            //set user data from 
            let data = await this.$store.dispatch('admin/getUserData', this.$store.getters['auth/getUserId'])
            let sol = await this.$store.dispatch('admin/initMakeRes', data.homesArray);
            console.log('user data :: ')
            console.log(data)


            
            let ans = await this.$store.dispatch('admin/initGetRes', this.$store.state.reservation.userId)            
            console.log('active homes :: ')
            console.log(this.activeHomes)

            if(ans != 'success') {
                this.loadingError = true;
            }
        } catch (e) {
            console.log(e)
        }
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
