<template>
<div class="inner_container">
    <CircleText title="Add Keeper" />
    <form  @submit.prevent="addKeeper" class="form-container">

        <FormInput  type="text" label="Keepername" labelFor="homename" id="homename"
              caller="add"/>

        <FormInput  type="password" label="Password" labelFor="password" id="password"
              placeholder="" :errorValidator="getPasswordError" caller="addUser"/>

      <UserHomes caller="addKeeper"/>

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
          getKeepers: 'sidenav/getKeepersMenu'
      })
    },
    methods: {
        addKeeper(ev) {
        //check to see if keeper name is available
        //if so dispatch object to addUser with role defined as keeper
        if (utilities.checkIfAvailable(this.getUpdatedName, this.getKeepers)) {
          this.$store.dispatch('users/addUser', {
              userName: this.getUpdatedName,
              userPassword: this.getUpdatedPassword,
              homesArray: this.getUpdatedHomes,
              role: 'keeper'})
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
              this.$store.commit('errors/setUserNameError', {status: true, mssg: 'Keeper Name Taken'})
        }
      }
    },
    mounted() {
        this.$store.commit('admin/setIndicator', 'Add Keeper')
        this.$store.dispatch('admin/initAddUser');
    }
}
</script>