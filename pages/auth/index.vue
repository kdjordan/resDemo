<template>
  <div>
    <h1>Logged In</h1>
    ::{{getIsAdmin}}<br />
    ::{{getUserId}}
  </div>
</template>

<script>

import {mapGetters} from 'vuex'
export default {
computed: {
  ...mapGetters({
    getIsAdmin: 'auth/getIsAdmin',
    getUserId: 'auth/getUserId'

  })
}
}
</script>
<style>

</style>
