<template>
  <div class="header">
        <div class="header__left">
            <div class="circle-text">
                <div>AMC</div>
            </div>    
            <div class="circle-text__content">Vacation Rentals</div>
            
        </div>
        <div class="header__right">
            <li v-for="(home, index) in activeHomes" :key="index">
                <nuxt-link class="home-link" :to="`/auth/${home._id}`">{{home.homeName}}</nuxt-link>
            </li>
            
            <div class="header__right--profile">
                <div class="header__right--profile--circle" @click="dropDownActive = !dropDownActive">
                    <div>{{getInital}}</div> 
                </div> 
                <div  v-if="dropDownActive">
                    <template>
                        <div class="dropdown">
                            <nuxt-link v-if="getIsAdmin == 'true'" to="/admin/users" class="dropdown__link">ADMIN</nuxt-link><br />
                            <div @click="logout" class="dropdown__link">LOGOUT</div>
                        </div>
                    </template>
                </div>    
            </div>
        </div> 
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    props: ['userName'],
    data() {
        return {
            dropDownActive: false
        }
    },
    computed:{
        ...mapGetters({
            getIsAdmin: 'auth/getIsAdmin',
            getUserName: 'auth/getUserName',
            getHomesArray: 'auth/getHomesArray',
            activeHomes: 'reservation/getActiveHomes'
        }),
        getInital() {
            if(this.getUserName) {
                return this.getUserName.split('')[0].toUpperCase();
            } else return '?'
        }
    },
    methods: {
        logout() {
            console.log('loggin out')
            this.$store.dispatch('auth/logoutUser')
            this.$router.push('/')
        }
    }
    
}
</script>
<style lang="scss">

</style>
