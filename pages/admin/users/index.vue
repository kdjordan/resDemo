<template>
  <div class="inner_container">
    <CircleText title="Add User" />
    <form  @submit.prevent="addUser" class="form-container">

      <FormInput  type="text" label="Username" labelFor="username" id="username"
              :errorValidator="getUserNameError" caller="addUser" />

      <FormInput  type="password" label="Password" labelFor="password" id="password"
              placeholder="" :errorValidator="getPasswordError" caller="addUser"/>

      <UserHomes />

      <UserRole  />

      <div class="flex-items__spaced--edit">

        <Messages />

        <Buttons state="add" />

      </div>
    </form>
  </div>
</template>

<script>
import CircleText from '@/components/UI/CircleText'
import FormInput from '@/components/UI/FormInput'
import Buttons from '@/components/UI/AdminButtons'
import Messages from '@/components/UI/Messages'
import UserRole from '@/components/UI/UserRoles'
import UserHomes from '@/components/UI/UserHomes'
import { mapGetters } from 'vuex'

export default {
  layout: 'admin',
  components: {
    CircleText,
    FormInput,
    UserRole,
    UserHomes,
    Messages,
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
      addUser(ev) {
        this.$store.dispatch('users/addUser', {
          userName: this.getUpdatedName,
          userPassword: this.getUpdatedPassword,
          homesArray: this.getUpdatedHomes,
          role: this.getUpdatedRole})
        .then((res) => {
          if(res == 'success') {
            this.$store.dispatch('notifications/doNotification', {status: true, mssg: 'User Added'});
            this.$store.dispatch('admin/initAddUser');
            this.$store.commit('errors/resetErrors')
          } else {
            this.$store.commit('errors/setAdminError', {status: true, mssg: 'Error Adding User'});
          }
        })
        .catch((e) => {
          //TODO : push router to error page
          console.log(e)
        });
        },
      
    },
    created() {
        this.$store.dispatch('admin/initAddUser');
    }

}
</script>

<style>

</style>