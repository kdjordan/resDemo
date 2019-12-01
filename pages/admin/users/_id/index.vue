<template>
  <div class="inner_container">
      <CircleText title="Edit User" />
    <form  @submit.prevent="updateUser" class="form-container">

      <FormInput  type="text" label="Username" labelFor="username" id="username"
              :errorValidator="getUserNameError"/>

      <FormInput  type="password" label="Password" labelFor="password" id="password"
              placeholder="Enter New or Leave Blank" :errorValidator="getPasswordError"/>

      <UserHomes />

      <UserRole  />
          
      
      <div class="flex-items__spaced--edit">

        <Messages  />

        <Buttons state="edit" />

      </div> 
    </form>
  </div>
</template>

<script>
import CircleText from '@/components/UI/CircleText'
import Messages from '@/components/UI/Messages'
import FormInput from '@/components/UI/FormInput'
import UserRole from '@/components/UI/UserRoles'
import UserHomes from '@/components/UI/UserHomes'
import Buttons from '@/components/UI/AdminButtons'
import { mapGetters } from 'vuex'

export default {
    layout: 'admin',
    components: {
      CircleText,
      Messages,
      FormInput,
      UserRole,
      UserHomes,
      Buttons
    },
    computed: {
      ...mapGetters({
          getUserNameError: 'errors/getUserNameError',
          getPasswordError: 'errors/getPasswordError',
          getUpdatedName: 'users/getUpdatedName',
          getUpdatedPassword: 'users/getUpdatedPassword',
          getUpdatedHomes: 'userHomes/getUpdatedHomes',
          getUpdatedRole: 'userRole/getUpdatedRole'
      })
    },
    methods: {
      updateUser() {
        this.$store.dispatch('users/updateUser',{
          userid: this.$route.params.id,
          userName: this.getUpdatedName,
          userPassword: this.getUpdatedPassword,
          homesArray: this.getUpdatedHomes,
          role: this.getUpdatedRole
        })
        .then((res) => {
          if(res == 'success') {
            this.$store.dispatch('notifications/doNotification', {status: true, mssg: 'User Updated'})
          } else {
            this.$store.commit('errors/setAdminError', {status: true, mssg: 'Error Updating User'})
          }
        }).catch((e) => {
          console.log(e);
        });
          
      }
    },
    mounted() {
        this.$store.commit('errors/resetErrors');
        this.$store.dispatch('admin/getUserData', this.$route.params.id)
        .then(() => {
          this.$store.dispatch('notifications/doNotification', {status: true, mssg: 'User Loaded'})
        }).catch((e) => {
          console.log(e);
        });
    }
}

</script>



