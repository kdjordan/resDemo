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
    props: ['state', 'caller'],
    computed: {
      ...mapGetters({
          getErrorState: 'errors/getErrorState',
          gettInitAddErrorState: 'errors/gettInitAddErrorState',
          getOGuserName: 'users/getOGuserName'
      })
    },
    methods: {
       deleteUser() {
        if(confirm(`Are You Sure You Want to Delete ${this.getOGuserName}`)){
            let payload = {};
            if(this.caller =="editKeeper") {
                payload = {_id: this.$route.params.id, role: 'keeper'}
            } else [
                payload = {_id: this.$route.params.id, role: 'user'}
            ]
            this.$store.dispatch('users/deleteUser',payload)
            .then((res) => {
                if(res.role == 'keeper') {
                    this.$router.push('/admin/keepers');
                } else {
                    this.$router.push('/admin/users');
                }
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
