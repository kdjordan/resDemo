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
import utilities from '@/assets/js/utilities.js'

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
          getUpdatedRole: 'userRole/getUpdatedRole',
          getUsers: 'sidenav/getUsersMenu'
      })
    },
    methods: {
     addUser(ev) {
        //check to see if keeper name is available
        //if so dispatch object to addUser with role defined as keeper
        if (utilities.checkIfAvailable(this.getUpdatedName, this.getUsers)) {
          this.$store.dispatch('users/addUser', {
              userName: this.getUpdatedName,
              userPassword: this.getUpdatedPassword,
              homesArray: this.getUpdatedHomes,
              role: this.getUpdatedRole})
          .then((res) => {
              if(res == 'success') {
                  ev.target.reset();
              } else {
                  this.$store.commit('errors/setAdminError', {status: true, mssg: 'Error Adding User'});
              }
            })
            .catch((e) => {
              //TODO : push router to error page
              console.log(e)
            });
        } else {
              this.$store.commit('errors/setUserNameError', {status: true, mssg: 'User Name Taken'})
        }
      }
    },
    mounted() {
      this.$store.commit('admin/setIndicator', 'Add User')
        this.$store.dispatch('admin/initAddUser');
    }

}
</script>

