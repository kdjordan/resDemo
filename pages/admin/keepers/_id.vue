<template>
  <div class="inner_container">
    <CircleText title="Add Keeper" />
    <!-- <form  @submit.prevent="addHome" class="form-container">

      <FormInput  type="text" label="Keepername" labelFor="homename" id="homename"
              caller="addHome"/>

     

      <UserHomes />

      <div class="flex-items__spaced--edit">

        <Messages />

        <Buttons state="add" />

      </div>
    </form> -->
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
    
}
</script>

<style>

</style>