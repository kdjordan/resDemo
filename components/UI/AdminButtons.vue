<template>
    <div v-if="state =='edit'" class="right-item__indicator--edit">
        <template>
            <button @click.prevent="deleteItem" class="btn btn-delete">DELETE</button>
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
       deleteItem() {
        const deleteStr = this.makeDeleteStr();
        
        if(confirm(`Are You Sure You Want to Delete ${deleteStr}`)){
            const payload = this.makePayload();
            const dispatchStr = this.makeDispatch(payload);
            console.log(dispatchStr)
            this.$store.dispatch(dispatchStr, payload)
            .then((res) => {
                if (res.status == 'success') {
                    if(res.role == 'keeper') {
                        this.$store.dispatch('notifications/doNotification', {status: true, mssg: 'Keeper Deleted'})
                        this.$router.push('/admin/keepers');
                    } else if(res.role == 'user'){
                        this.$store.dispatch('notifications/doNotification', {status: true, mssg: 'User Deleted'})
                        this.$router.push('/admin/users');
                    } else {
                        this.$store.dispatch('notifications/doNotification', {status: true, mssg: 'Home Deleted'})
                        this.$router.push('/admin/homes');
                    }
                } else {
                    this.$store.dispatch('errors/setAdminError', {status: true, mssg: 'Error Deleting'})
                }
            })
            .catch((e) => {
                console.log(e)
            });
        }
      },
        makeDeleteStr() {
            if(this.theCaller=="editHome"){
                return this.getQueriedHomeName
            } else {
                return this.getOGuserName
            }
        },
        makePayload() {
            if(this.theCaller =="editKeeper") {
                return {_id: this.$route.params.id, role: 'keeper'}
            } else if(this.theCaller=="editUser") {
                return {_id: this.$route.params.id, role: 'user'}
            } else {
                return this.$route.params.id;
            }
        },
        makeDispatch(data) {
            if(data.role == 'keeper' || data.role == 'user') {
                return 'users/deleteUser'
            } else {
                return 'userHomes/deleteHome'
            }
        }
    },

}
</script>

<style>

</style>
