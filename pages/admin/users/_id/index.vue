<template>
  <div class="inner_container">
      <CircleText title="Edit User" />
    <form  @submit.prevent="checkUpdateOK" class="form-container">
      <div class="flex-items">
        <div class="left-item">
          <label for="username" :class="{invalid: getUserNameError }">Username</label>
        </div>
          <div class="right-item">
            <input type="text" 
                  v-model.trim="updatedName"
                  id="username"
                  :placeholder="getOGUserName"> 
          </div>
      </div>
      <div class="flex-items">
        <div class="left-item">
          <label for="password" :class="{invalid: getPasswordError }">Password</label> 
        </div>
        <div class="right-item">
          <input type="password" 
                v-model.trim="updatedPassword"
                id="password" 
                placeholder="Enter New or Leave Blank">      
        </div>
      </div>

      <UserHomes />

      <UserRole  />
          
      
      <div class="flex-items__spaced--edit">
        <div class="left-item__indicator">
          <transition name="fade" mode="out-in">
            <Errors v-if="getErrorState" :mssg="getErrorMssg" />
         </transition>
        <transition name="fade" mode="out-in">
         <Notification v-if="getNotificationState" :mssg="getNotificationMssg" />
        </transition>
        </div>
        <div class="right-item__indicator--edit">
            <button @click.prevent="deleteUser" 
              class="btn btn-delete">DELETE
              </button>
            <button class="btn btn-primary" 
            :disabled="getErrorState">
            UPDATE
            </button>
        </div>    
      </div> 
      <p>MSSG : {{ getErrorState }}</p>
      <p>mssg: {{ this.$store.state.notifications.notificationState}}</p>
    </form>
  </div>
</template>

<script>
import CircleText from '@/components/UI/CircleText'
import Errors from '@/components/UI/Errors'
import Notification from '@/components/UI/Notification'
import UserRole from '@/components/UI/UserRole'
import UserHomes from '@/components/UI/UserHomes'
import { mapGetters, mapMutations } from 'vuex'

export default {
    layout: 'admin',
    components: {
      CircleText,
      Errors,
      Notification,
      UserRole,
      UserHomes
    },
    data() {
      return {
        mssg: '',
        updatedName: '',
        updatedPassword: ''
        
      }
    },
    watch: {
      updatedName() {
        this.$store.commit('errors/setUserNameError', {status: false, mssg: ''})
        if(this.updatedName != '') {
          if(!this.updatedName.match(/^[0-9a-zA-Z]+$/)) {
            this.$store.commit('errors/setUserNameError', {status: true, mssg: 'Invalid Character'})
          } else if(this.updatedName.length < 6) {
            this.$store.commit('errors/setUserNameError', {status: true, mssg: 'User Name < 6'})
          } else {
            this.$store.commit('users/updateUserName', this.updatedName);
          }
        }
      },
      updatedPassword() {
        this.$store.commit('errors/setPasswordError', {status: false, mssg: ''})
        if(this.updatedPassword != '') {
          if(!this.updatedPassword.match(/^[0-9a-zA-Z]+$/)) {
            this.$store.commit('errors/setPasswordError', {status: true, mssg: 'Invalid Character'})
          } else if(this.updatedPassword.length < 8) {
           this.$store.commit('errors/setPasswordError', {status: true, mssg: 'Password < 8'})
          } else {
            this.$store.commit('users/updateUserPassword', this.updatedPassword);
          }
        } 
      }
    },
    computed: {
      ...mapGetters({
          userNameErrorTest: 'errors/getUserNameError',
          getErrorState: 'errors/getErrorState',
          getErrorMssg: 'errors/getErrorMssg',
          getUserNameError: 'errors/getUserNameError',
          getPasswordError: 'errors/getPasswordError',
          getNotificationState: 'notifications/getNotificationState',
          getNotificationMssg: 'notifications/getNotificationMssg'
      }),
      getOGUserName(){
        return this.$store.state.users.ogUserName;
      }
    },
    methods: {
      deleteUser() {
        console.log('called')
        this.$store.commit('errors/setUserNameError', 'afjhaljfhajf')
      },
      checkUpdateOK() {
        this.$store.dispatch('admin/checkUserForUpdate', 
        {userName: this.updatedName, userPassword: this.updatedPassword})
        .then((res) => {
          console.log(res)
        }).catch((e) => {
          console.log(e);
        });

      },
      hideMssg() {
        setTimeout(() => {
         this.$store.commit('notifications/setNotification', {status: false, mssg: ''})
        }, 1000)
      }
    },
    mounted() {
        this.$store.dispatch('admin/getUserData', this.$route.params.id)
        .then(() => {
          this.$store.commit('notifications/setNotification', {status: true, mssg: 'User Loaded'})
          this.hideMssg();
        }).catch((e) => {
          console.log(e);
        });
    }
}

</script>



