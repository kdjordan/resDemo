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
    data() {
        return {
            theCaller: this.caller
        }
    },
    computed: {
      ...mapGetters({
          getErrorState: 'errors/getErrorState',
          gettInitAddErrorState: 'errors/gettInitAddErrorState',
          getOGuserName: 'users/getOGuserName',
          getQueriedHomeName: 'userHomes/getQueriedHomeName'
      })
    },
    methods: {
       deleteUser() {
        if(confirm(`Are You Sure You Want to Delete ${this.getOGuserName}`)){
            const payload = this.setPayload();
            this.$store.dispatch('users/deleteUser', payload)
            .then((res) => {
                if (res.status == 'success') {
                    if(res.role == 'keeper') {
                        this.$router.push('/admin/keepers');
                    } else if(res.role == 'user'){
                        this.$router.push('/admin/users');
                    } else {
                        this.$store.commit('errors/setAdminError', {status: true, mssg: 'Error Deleting !!'})
                        this.$router.push('/admin/homes');
                    }
                } else {
                    this.$store.commit('errors/setAdminError', {status: true, mssg: 'Error Deleting'})
                }
            })
            .catch((e) => {
                console.log(e)
            });
        }
      },
      setPayload() {
          if(this.theCaller == "editUser") {
              return {_id: this.$route.params.id, role: 'user'}
          } else {
              return {_id: this.$route.params.id, role: 'keeper'}
          }
      }
        
       
    },

}
</script>

<style>

</style>
