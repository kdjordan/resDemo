<template>
  <div class="inner_container">
      <CircleText title="Edit User" />
    <form  @submit.prevent="checkUpdateOK" class="form-container">

      <Input  type="text" label="Username" labelFor="username" id="username"
              :errorValidator="getUserNameError"/>

      <Input  type="password" label="Password" labelFor="password" id="password"
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
import Input from '@/components/UI/Input'
import UserRole from '@/components/UI/UserRoles'
import UserHomes from '@/components/UI/UserHomes'
import Buttons from '@/components/UI/AdminButtons'
import { mapGetters } from 'vuex'

export default {
    layout: 'admin',
    components: {
      CircleText,
      Messages,
      Input,
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
    methods: {
      deleteUser() {
        console.log(this.$route.params.id)
        this.$axios.$post(`/deleteUser/${this.$route.params.id}`)
                .then((response) => {
                   console.log(response)
                   //remove from menu
                   //throw notification
                
                })
                .catch((e) => {
                    console.logt(e)
                });

      },
      hideNotification() {
        setTimeout(() => {
         this.$store.commit('notifications/setNotification', {status: false, mssg: ''})
        }, 1000)
      }
    },
    mounted() {
        this.$store.commit('errors/resetErrors');
        this.$store.dispatch('admin/getUserData', this.$route.params.id)
        .then(() => {
          this.$store.commit('notifications/setNotification', {status: true, mssg: 'User Loaded'})
          this.hideNotification();
        }).catch((e) => {
          console.log(e);
        });
    }
}

</script>



