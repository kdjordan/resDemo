<template>
    <div class="sidenav">
        <div class="mainmenu__container">
        <div class="sidenav__indicator">Add User</div>
            <ul class="nav">
                <div class="nav__container">
                    <nuxt-link to="/admin/users" class="nav__category--link active-menu ">Users<span class="nav__category--icon">&#62;</span>
                    </nuxt-link>
                    <ul class="nav__category--dropdown active">
                       <nuxt-link v-for="(user, index) in getUsers" 
                            :key="index" 
                            :to="{name: 'admin-users-id', params: {id: user._id}}" 
                            class="links">
                        {{user.userName}}
                        </nuxt-link>   
                    </ul>

                    
                    <a class="nav__category--link" @click="toggleSubMenu($event)" id="Add-Home">Homes
                        <span class="nav__category--icon">&#62;</span>
                    </a>
                    <ul class="nav__category--dropdown">
                        
                    </ul>
                    
                    <a class="nav__category--link" @click="toggleSubMenu($event)" id="Add-Keeper">Keepers
                        <span class="nav__category--icon" >&#62;</span>
                    </a>
                    <ul class="nav__category--dropdown">
                        
                    </ul>
                </div>
            </ul>
        </div>
    </div> 
    
</template>
<script>

export default {
    data() {
        return {
            usersMenu: []
        }
    },
    methods: {
        linkClick(id) {
            console.log(id)
            // console.log(ev)
            this.$router.push(`users/${id}`);
        }
    },
    computed: {
        getUsers() {
            return this.$store.state.sidenav.usersMenu;
        }
    },
    created() {
        this.$store.dispatch('sidenav/getMenusData')
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
    padding: .3rem 0;
    display: block;
    border-radius: .25rem;
    padding-left: 1rem;

     &:hover {
            color: white;
            background: $color1;
        }

   
}

.active-menu {
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