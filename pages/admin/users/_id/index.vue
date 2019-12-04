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

        <Buttons state="edit" caller="editUser"/>

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
import utilities from '@/assets/js/utilities.js'

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
          getUpdatedRole: 'userRole/getUpdatedRole',
          getUsers: 'sidenav/getUsersMenu'
      })
    },
    methods: {
       updateUser() {

        //check to see if updated name is available
        // if yes - make object and dispatch updateUser to users.js for DB call

        if(utilities.checkIfAvailable(this.getUpdatedName, this.getUsers)) {
          const updateUserObj = utilities.formatUserForDispatch(this.getUpdatedName, this.getUpdatedPassword, this.getUpdatedHomes, this.getUpdatedRole);
          this.$store.dispatch('users/updateUser', {updateObj: updateUserObj, userid: this.$route.params.id})
          .then((res) => {
            if(res == 'success') {
              this.$store.dispatch('notifications/doNotification', {status: true, mssg: 'User Updated'})
            } else {
              this.$store.commit('errors/setAdminError', {status: true, mssg: 'Error Updating User'})
            }
          }).catch((e) => {
            console.log(e);
          });
        } else {
          this.$store.commit('errors/setUserNameError', {status: true, mssg: 'User Name Taken'})
        }
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



