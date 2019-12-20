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
                            <nuxt-link v-if="getIsAdmin == 'true'" to="/admin/users" class="dropdown__link">ADMIN</nuxt-link><br />>
                            <nuxt-link to="/auth/keeper/99" class="dropdown__link">keeper</nuxt-link>
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
            // display: flex;
            // flex-direction: column;

            &--circle {
                cursor: pointer;
                // position: fixed;
                // top: 2rem;
                // right: 2rem;
                // margin-top: 4rem;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 3rem;
                background: white;
                color: $color1;
                border-radius: 50%;
                height: 4rem;
                width: 4rem;
                line-height: 4rem;
                transition: all .4s;

                &:hover {
                    background: $color3;
                    color: white;
                }
            }

        }
    }
}
.dropdown {
    position: absolute;
    top: 8rem;
    right: 1rem;
    overflow: hidden;
    z-index: 2;
    background: white;
    

    &__link {
        cursor: pointer;
        color: $color1;
        margin: .2rem 0;
        transition: all .4s;

        &:hover {
            color: $color3;
            border-bottom: 1px solid $color3;
        }
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
