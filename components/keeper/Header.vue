<template>
  <div class="header">
      <div class="header__left">
            <div class="circle-text">
                <div>AMC</div>
            </div>    
            <div class="circle-text__content">Vacation Rentals</div>
            
        </div>

        <div class="header__right">
            <div @click="logout">LOGOUT</div>
        </div>

  </div>
</template>

<script>
export default {
    methods: {
        logout() {
            console.log('loggin out')
            this.$store.dispatch('auth/logoutUser')
            this.$router.push('/')
        }
    }

}
</script>

<style>

</style>