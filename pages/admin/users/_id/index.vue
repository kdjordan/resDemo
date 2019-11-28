<template>
  <div class="inner_container">
      <CircleText title="Edit User" />
    <form  @submit.prevent="" class="form-container">

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
          getErrorState: 'errors/getErrorState',
          getErrorMssg: 'errors/getErrorMssg',
          getUserNameError: 'errors/getUserNameError',
          getPasswordError: 'errors/getPasswordError',
          getNotificationState: 'notifications/getNotificationState',
          getNotificationMssg: 'notifications/getNotificationMssg'
      })
    },
    mounted() {
        this.$store.commit('errors/resetErrors');
        this.$store.dispatch('admin/getUserData', this.$route.params.id)
        .then(() => {
          this.$store.commit('notifications/setNotification', {status: true, mssg: 'User Loaded'})
          this.$store.dispatch('notifications/hideNotification');
        }).catch((e) => {
          console.log(e);
        });
    }
}

</script>



