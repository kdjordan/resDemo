<template>
  <div>
      <div class="left-item__indicator">
          <transition name="fade" mode="out-in">
            <p v-if="getErrorState" class="error">{{getErrorMssg}}</p>
         </transition>
        <transition name="fade" mode="out-in">
            <p v-if="getNotificationState" class="success">{{getNotificationMssg}}</p>
        </transition>
        </div>
  </div>
  
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: {
      ...mapGetters({
          getErrorState: 'errors/getErrorState',
          getErrorMssg: 'errors/getErrorMssg',
          getNotificationState: 'notifications/getNotificationState',
          getNotificationMssg: 'notifications/getNotificationMssg'
      })
    },
}
</script>

