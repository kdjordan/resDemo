<template>
  <div>
    <Header userName="keeper"/>
        <div class="container">
            <div class="container__top">
                <CircleImg :imageUrl="activeHome.URL || 'sunriver-sm.png'" alt="sunriver home" :homeName="activeHome.homeName"/>
            </div>
            <div class="container__bottom--keeper">
                <div class="cur-res__title">Reservations</div>
                <div class="keeper-res">
                    <KeeperResList />
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
import Header from '@/components/keeper/Header'
import CircleImg from '@/components/HomesCircle'
import KeeperResList from '@/components/keeper/KeeperResList'

import { mapGetters } from 'vuex'

export default {
    components: {
        Header,
        CircleImg,
        KeeperResList
    },
    computed: {
        ...mapGetters({
            activeHome: 'reservation/getActiveHome'
        })
        
    },
    mounted() {
        console.log(this.$route.params.id)
    }
}
</script>

<style>
.container__bottom--keeper{

    background: white;
    max-width: 120rem;
    margin: 0 auto;
    padding-top: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    
    margin: 0 auto;
    margin-top: 2rem;
    width: 100%;
    align-items: top;
}

</style>

