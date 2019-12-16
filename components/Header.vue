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
                <nuxt-link class="home-link" to="" >{{home.homeName}}</nuxt-link>
            </li>
            
            <div class="header__right--profile">
                <div class="header__right--profile--circle" @click="dropDownActive = !dropDownActive">
                    <div>{{getInital}}</div> 
                </div> 
                <div class="header__right--profile" :class="{'dropdown': dropDownActive}">
                    <nuxt-link v-if="getIsAdmin == 'true'" to="/admin/users" class="dropdown__link">ADMIN</nuxt-link>
                    <div @click="logout" class="dropdown__link">LOGOUT</div>
                </div>    
            </div>
            <!-- {{activeHomes}} -->
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
            activeHomes: 'reservation/getActiveUserHomes'
        }),
        getInital() {
            return this.getUserName.split('')[0].toUpperCase();
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
.header {
    height: 8rem;
    background: $color1;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__left {
        display: flex;
        align-items: center;
        padding-left: 2rem;
    }

    &__right {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-right: 2rem;

        &--profile {
            display: flex;
            flex-direction: column;

            &--circle {
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-left: 3rem;
                font-size: 3rem;
                background: white;
                color: $color1;
                border-radius: 50%;
                height: 4rem;
                width: 4rem;
                line-height: 4rem;
            }

        }
    }
}
.dropdown {
    // display: none;
    z-index: 2;
    position: absolute;
    top: 7rem;
    right: 2rem;
    padding: 2rem;
    background: white;
    

    &__link {
        cursor: pointer;
        color: $color1;
    }
}
.home-link {
    margin: 0 1rem;
    text-transform: uppercase;
    transition: all .4s;

    &:hover{
        color: $color3;
    }
}

.circle-text {
    background: white;
    height: 5rem;
    width: 5rem;
    line-height: 5rem;
    border-radius: 50%;

    & div {
        color: $color1;
        position: relative;
        left: .8rem;
    }

    &__content{
        font-size: 1.2rem;
        margin-left: 1rem;
        text-transform: uppercase;
    }
}
</style>
