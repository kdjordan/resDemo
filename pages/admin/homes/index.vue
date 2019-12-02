<template>
  <div class="inner_container">
    <CircleText title="Add Home" />
    <form  @submit.prevent="addHome" class="form-container">

      <div class="flex-items">
        <div class="left-item">
            <label :for="labelFor" :class="{invalid: errorValidator }">HomeName</label>
        </div>
        <div class="right-item">
            <input :type="type" 
                    v-model.trim="updatedName"
                    :id="id"
                    :placeholder="getOGuserName || getQueriedHomeName"> 
        </div>
        
        <!-- {{getQueriedHomeName}} -->
    </div>


      <div class="flex-items__spaced--edit">

        <Messages />

        <Buttons state="add" caller="addHome"/>

      </div>
    </form>
  </div>
</template>

<script>
import CircleText from '@/components/UI/CircleText'
import Buttons from '@/components/UI/AdminButtons'
import Messages from '@/components/UI/Messages'
import { mapGetters } from 'vuex'

export default {
  layout: 'admin',
  components: {
    CircleText,
    Messages,
    Buttons
  },
  computed: {
    },
    methods: {
      addHome() {
        console.log('adding Home')
      }
    },
    
}
</script>

<style>

</style>