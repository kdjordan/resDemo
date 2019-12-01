<template>
  <div class="inner_container">
    <CircleText title="Edit Home" />
    <form  @submit.prevent="editHome" class="form-container">

      <FormInput  type="text" label="Homename" labelFor="homename" id="homename"
              caller="addHome"/>

     

      <UserHomes />

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
     
    },
    methods: {
    },
    mounted() {
        this.$store.commit('errors/resetErrors');
        this.$store.dispatch('admin/getHomeData', this.$route.params.id)
        .then(() => {
            console.log('back')
          this.$store.dispatch('notifications/doNotification', {status: true, mssg: 'Home Loaded'})
        }).catch((e) => {
          console.log(e);
        });
    }
    
}
</script>

<style>

</style>