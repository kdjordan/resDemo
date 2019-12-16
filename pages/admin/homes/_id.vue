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
                    :placeholder="getQueriedHomeName" class="input"> 
        </div>
    </div>

    <div class="flex-items__spaced">
         <div class="left-item">
            <label for="activeUsers">Active Users</label>
        </div>
        <div class="right-item">
          <div class="activeUsersList" v-for="(user, index) in getHomeUpdateUsersList" :key="index">
            <template>
                <div class="checkbox-box">
                    <input type="checkbox"  
                        :checked="user.isActive" :id="`${user.userName}`" 
                        @change="updateHomeUsersList(`${user.userName}`)">
                    <label :for="`${user.userName}`" 
                        class="label-sm" :value="`${user.userName}`">
                        {{ user.userName}}</label>
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
      getUsersMenu: 'sidenav/getUsersMenu',
      getHomeUpdateUsersList: 'userHomes/getHomeUpdateUsersList'
    })
  },
  methods: {
    updateHomeUsersList(user) {
      this.$store.dispatch('userHomes/updateHomesUsersListByCommit', user);
    },
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
      
      this.$store.dispatch('userHomes/updateHome', payload)
      .then(res => {
          console.log(res)
        }).catch(e => {
          console.log(e)
        });
    },
    getPayload() {
      let payload = {}
      if (this.homeName == "") {
        payload = {_id: this.$route.params.id, homeName: this.getQueriedHomeName}
      } else {
        payload = {_id: this.$route.params.id, homeName: this.homeName}
      }
      let newActiveUsers = this.getHomeUpdateUsersList.filter(user => {return user.isActive == true});
      let newInActiveUsers = this.getHomeUpdateUsersList.filter(user => {return user.isActive == false});
      payload.activeUsers = newActiveUsers;
      payload.inActiveUsers = newInActiveUsers;
      
      return payload;
    }
  },
  mounted() {
      this.$store.commit('admin/setIndicator', 'Edit Home')
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