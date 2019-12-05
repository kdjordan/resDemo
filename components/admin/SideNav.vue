<template>
    <div class="sidenav">
        <div class="mainmenu__container">
        <div class="sidenav__indicator">{{getIndicator}}</div>
            <ul class="nav">
                <div class="nav__container">
                     <nuxt-link to="/admin/users" class="nav__category--link"
                        @click.native="toggleSubMenu">Users
                        <span class="nav__category--icon">&#62;</span>
                    </nuxt-link>
                    <ul class="nav__category--dropdown">
                       <nuxt-link v-for="(user, index) in getUsers" :key="index" class="links"
                            :to="{name: 'admin-users-id', params: {id: user._id}}">
                        {{user.userName}}
                        </nuxt-link>   
                    </ul>

                    <nuxt-link to="/admin/homes" class="nav__category--link"
                        @click.native="toggleSubMenu">Homes
                        <span class="nav__category--icon">&#62;</span>
                    </nuxt-link>
                    <ul class="nav__category--dropdown">
                        <nuxt-link v-for="(home, index) in getHomes" :key="index" class="links"
                            :to="{name: 'admin-homes-id', params: {id: home._id}}">
                            {{home.homeName}}
                        </nuxt-link>
                    </ul> 

                    <nuxt-link to="/admin/keepers" class="nav__category--link"
                        @click.native="toggleSubMenu">Keepers
                        <span class="nav__category--icon">&#62;</span>
                    </nuxt-link>
                    <ul class="nav__category--dropdown">
                        <nuxt-link v-for="(keeper, index) in getKeepers" :key="index" class="links"
                            :to="{name: 'admin-keepers-id', params: {id: keeper._id}}">
                            {{keeper.keeperName}}
                        </nuxt-link>
                    </ul> 
                </div> 
            </ul>
        </div>
    </div> 
        
</template>
<script>
import { mapGetters } from 'vuex';

export default {
    methods: {
        linkClick(id) {
            this.$router.push(`users/${id}`);
        },
        toggleSubMenu(ev) {
            this.$store.commit('sidenav/toggleSubMenu', ev);
            // this.$store.commit('admin/setIndicator', ev.target.id);
        },
    },
    computed: {
        ...mapGetters({
            getIndicator: 'admin/getIndicator'
        }),
        getUsers() {
            return this.$store.state.sidenav.usersMenu;
        },
        getHomes() {
            return this.$store.state.sidenav.homesMenu;
        },
        getKeepers() {
            return this.$store.state.sidenav.keepersMenu;
        }
    }
}
</script>

<style lang="scss">

.sidenav {
    width: 20rem;
    font-size: 1.6rem;
    display: flex;
    overflow: hidden;
    position: fixed;
    height: 100vh;
    box-shadow: 7px 0 60px rgba(0,0,0,.05);
    flex-direction: column;
    transition: all .3s ease;
    padding: 6rem 0 0;
    background: white;

    &__indicator {
        margin: 0 auto;
        text-align: center;
        margin-bottom: 2.8rem;
        width: 60%;
        border: 1px solid $color1;
        border-radius: .25rem;
        text-transform: uppercase;
        color: $color1;
        padding: .5rem 0;
    }
}

.mainmenu__container {
        width: 100%;
        position: relative;
        top: 4rem;  
}

span {
    pointer-events: none;
}

.nav {
    width: auto!important;

    &__container {
        width: 80%;
        margin-left: 10%;
    }

    &__category {
        position: relative;
        display: block;
        padding: .1rem 0;

        &--link {
            font-size: 2rem;
            margin: .8rem 0;
            display: block;
            line-height: 2rem;
            padding: .8rem 1rem;
            position: relative;
            border-radius: .25rem;
            color: $color1;
            white-space: nowrap;
            transition: all .4s;
            text-decoration: none;
            text-transform: uppercase;


            &:hover  {
               background: $color1;
               color: white;
               border-radius: .25rem;
            }
        }

        &--icon {
            float: right;

            &:hover {
                color: white;
            }
        }

        &--dropdown {
            padding: 1rem 0 1rem 1.2rem ;
            display: none;
            margin-top: -1.4rem;
            transition: all .4s;
        }
    }
}

.links {
    color: $color1;
    margin: .3rem 0;
    padding: .3rem 0;
    display: block;
    border-radius: .25rem;
    padding-left: 1rem;

     &:hover {
            color: white;
            background: $color1;
        }

   
}

.nuxt-link-exact-active {
    background: $color1;
    border-radius: 3px; 
    color: white;
}

.active {
    border-radius: 3px;
    display: block;
}

.rotate {
    transform: rotate(90deg);
}

.no-rotate {
    transform: rotate(0deg);
}


</style>