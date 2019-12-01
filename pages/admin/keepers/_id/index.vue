<template>
  <div class="inner_container">
    <CircleText title="Edit Keeper" />
    <form  @submit.prevent="addHome" class="form-container">

      <FormInput  type="text" label="Username" labelFor="username" id="username"
              :errorValidator="getUserNameError"/>

      <FormInput  type="password" label="Password" labelFor="password" id="password"
              placeholder="Enter New or Leave Blank" :errorValidator="getPasswordError"/>

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
          getPasswordError: 'errors/getPasswordError',
          getUserNameError: 'errors/getUserNameError',
          getOGuserName: 'users/getOGuserName'
      })
    },
    methods: {
    },
    mounted() {
        this.$store.commit('errors/resetErrors');
        this.$store.dispatch('admin/getUserData', this.$route.params.id)
        .then(() => {
          this.$store.dispatch('notifications/doNotification', {status: true, mssg: 'Keeper Loaded'})
        }).catch((e) => {
          console.log(e);
        });
    }
    
}
</script>

<style>

</style>