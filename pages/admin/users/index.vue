<template>
  <div class="inner_container">
    <CircleText title="Add User" />
    <form  @submit.prevent="checkUpdateOK" class="form-container">

      <Input  type="text" label="Username" labelFor="username" id="username"
              :errorValidator="getUserNameError" caller="addUser"/>

      <Input  type="password" label="Password" labelFor="password" id="password"
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
import Input from '@/components/UI/Input'
import Buttons from '@/components/UI/AdminButtons'
import Messages from '@/components/UI/Messages'
import UserRole from '@/components/UI/UserRoles'
import UserHomes from '@/components/UI/UserHomes'
import { mapGetters, mapMutations } from 'vuex'

export default {
  layout: 'admin',
  components: {
    CircleText,
    Input,
    UserRole,
    UserHomes,
    Messages,
    Buttons
  },
  computed: {
      ...mapGetters({
          getUserNameError: 'errors/getUserNameError',
          getPasswordError: 'errors/getPasswordError',
      })
    },
    methods: {
      hideNotification() {
          setTimeout(() => {
          this.$store.commit('notifications/setNotification', {status: false, mssg: ''})
          }, 1000)
      }
    },
    created() {
        this.$store.dispatch('admin/initAddUser');
    }

}
</script>

<style>

</style>