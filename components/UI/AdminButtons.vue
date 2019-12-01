<template>
    <div v-if="state =='edit'" class="right-item__indicator--edit">
        <template>
            <button @click.prevent="deleteUser" class="btn btn-delete">DELETE</button>
            <button class="btn btn-primary" :disabled="getErrorState">UPDATE</button>
        </template>
    </div>
    <div v-else class="right-item__indicator--edit">
        <button class="btn btn-primary" :disabled="getErrorState || gettInitAddErrorState">ADD</button>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    props: ['state'],
    computed: {
      ...mapGetters({
          getErrorState: 'errors/getErrorState',
          gettInitAddErrorState: 'errors/gettInitAddErrorState',
          getOguserName: 'users/getOguserName'
      })
    },
    methods: {
       deleteUser() {
        if(confirm(`Are You Sure You Want to Delete ${this.getOguserName}`)){
            this.$store.dispatch('users/deleteUser', this.$route.params.id)
            .then((res) => {
                this.$store.dispatch('notifications/doNotification', {status: true, mssg:'User Deleted'})
                this.$router.push('/admin/users')
            })
            .catch((e) => {
                console.log(e)
            });
            } else { 
                return; 
        }
      }
    }

}
</script>

<style>

</style>