<template>
  <div class="inner_container">
    <CircleText title="Edit Keeper" />
    <form  @submit.prevent="updateUser" class="form-container">

      <FormInput  type="text" label="Username" labelFor="username" id="username"
              :errorValidator="getUserNameError"/>

      <FormInput  type="password" label="Password" labelFor="password" id="password"
              placeholder="ENTER NEW OR LEAVE BLANK" :errorValidator="getPasswordError"/>

      <UserHomes />

      <div class="flex-items__spaced--edit">

        <Messages />

        <Buttons  caller="editKeeper" state="edit" />

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
          getKeepers: 'sidenav/getKeepersMenu'
      })
    },
    methods: {
       updateUser() {

        //check to see if updated name is available
        // if yes - make object and dispatch updateUser to users.js for DB call

        if(utilities.checkIfAvailable(this.getUpdatedName, this.getKeepers)) {
          const updateUserObj = utilities.formatUserForDispatch(this.getUpdatedName, this.getUpdatedPassword, this.getUpdatedHomes, 'keeper');
          this.$store.dispatch('users/updateUser', {updateObj: updateUserObj, userid: this.$route.params.id})
          .then((res) => {
            if(res == 'success') {
              this.$store.dispatch('notifications/doNotification', {status: true, mssg: 'Keeper Updated'})
            } else {
              this.$store.commit('errors/setAdminError', {status: true, mssg: 'Error Updating Keeper'})
            }
          }).catch((e) => {
            console.log(e);
          });
        } else {
          this.$store.commit('errors/setUserNameError', {status: true, mssg: 'Keeper Name Taken'})
        }
      }
    },
    mounted() {
      this.$store.commit('admin/setIndicator', 'Edit Keeper')
        this.$store.dispatch('admin/getUserData', this.$route.params.id)
        .then(() => {
          console.log('back')
          this.$store.dispatch('notifications/doNotification', {status: true, mssg: 'Keeper Loaded'})
        }).catch((e) => {
          console.log(e);
        });
    }
}
</script>