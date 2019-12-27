<template>
  <div>
      <Header :userName="getUserName"/>
        <div class="container">
            <div class="container__top">
                <CircleImg :imageUrl="activeHome.URL || 'sunriver-sm.png'" alt="sunriver home" :homeName="activeHome.homeName"/>
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
import { mapGetters } from 'vuex'

export default {
    transition: 'fade',
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
            activeHomes: 'reservation/getActiveUserHomes',
            activeHome: 'reservation/getActiveHome',
            getLoggedIn: 'auth/getLoggedIn'
        })
    },
    async mounted() {
         try{
            if(this.$route.params.id != 'undefined') {
                //setActiveUserHome to param.id
                let activeHome = this.activeHomes.filter(home => home._id == this.$route.params.id)
                this.$store.commit('reservation/resetReservationState')
    
                this.$store.commit('reservation/setActiveHome', activeHome[0])
                let ans = await this.$store.dispatch('admin/initGetRes', activeHome[0]._id)            
                if(ans != 'success') {
                    console.log(ans)
                    this.loadingError = true;
                }
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

    @media (max-width: $screen-md-min) {
            flex-direction: column;
         }


    &__bottom {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        margin: 0 auto;
        width: 100%;
        align-items: top;
        margin-top: 7rem;

        @media (max-width: $screen-md-min) {
            flex-direction: column;
         }

        &--left {
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        &--right {
            @media (max-width: $screen-md-min) {
                margin-top: 5rem;
                flex-direction: column;
                
             }
        }
    }
}
</style>
