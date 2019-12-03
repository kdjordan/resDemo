<template>
  <div class="inner_container">
    <CircleText title="Edit Home" />
    <form  @submit.prevent="updateHome" class="form-container">

      <div class="flex-items">
        <div class="left-item">
            <label for="homeName" :class="{invalid: homeNameInvalid}">HomeName</label>
        </div>
        <div class="right-item">
            <input type="text" 
            v-model.trim="homeName"
                    id="homeName"
                    :placeholder="getQueriedHomeName"> 
        </div>
        
        <!-- {{getQueriedHomeName}} -->
    </div>

    <div class="flex-items__spaced">
         <div class="left-item">
            <label for="activeUsers">Active Users</label>
        </div>
        <div class="right-item">
          <div class="activeUsersList" v-for="(user, index) in getUsersMenu" :key="index">
            <template>
                <div class="checkbox-box">
                    <input type="checkbox"  
                        :checked="user.homesArray.find((el) => homeName)" :id="`${user.userName}`" 
                        @change="updateActiveUsers({userName: user.userName, _id: user._id})">
                    <label :for="`${user.userName}`" 
                        class="label-sm" :value="`${user.userName}`">
                        {{ user.userName }}</label>
                </div>
            </template>
          </div>
        </div>
    </div>

      <div class="flex-items__spaced--edit">

        <Messages />

        <div class="right-item__indicator--edit">
            <button @click.prevent="deleteHome" class="btn btn-delete">DELETE</button>
            <button class="btn btn-primary">UPDATE</button>
        </div>
      </div>
    </form>
  </div>
</template>


<script>
import CircleText from '@/components/UI/CircleText'
import Messages from '@/components/UI/Messages'
import { mapGetters } from 'vuex'

export default {
  layout: 'admin',
  data() {
    return {
      homeName: '',
      homeNameInvalid: false,
      activeUsers: []
    }
  },
  components: {
    CircleText,
    Messages
  },
  computed: {
    ...mapGetters({
      getQueriedHomeName: 'userHomes/getQueriedHomeName',
      getUsersMenu: 'sidenav/getUsersMenu'
    })
  },
  methods: {
    deleteHome() {
      const payload = this.getPayload();
       if(confirm(`Are You Sure You want to DELETE ${payload.homeName}`)) {
         this.$store.dispatch('userHomes/deleteHome', payload)
         .then((res) => {
           if(res == 'success') {
             this.$router.push('/admin/homes')
           } else {
             this.$store.dispatch('errors/setAdminError', {status: true, mssg:'Error Deleting Home'})
           }
         }).catch((e) => {
           console.log(e);
         });
      }
      
    },
    updateHome() {
      const payload = this.getPayload();
      console.log(payload)
    },
    getPayload() {
      if (this.homeName == "") {
        return {_id: this.$route.params.id, homeName: this.getQueriedHomeName}
      } else {
        return {_id: this.$route.params.id, homeName: this.homeName}
      }
    },
    
  },
  created() {
      this.$store.commit('errors/resetErrors');
      this.$store.dispatch('admin/initAddUser')
      this.$store.dispatch('admin/getHomeData', this.$route.params.id)
      .then(() => {
        this.$store.dispatch('notifications/doNotification', {status: true, mssg: 'Home Loaded'})
      }).catch((e) => {
        console.log(e);
      });
  }
    
}
</script>

<style>

</style>