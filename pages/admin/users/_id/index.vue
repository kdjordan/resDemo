<template>
  <div class="inner_container">
      <CircleText title="Edit User" />
    <form  @submit.prevent="checkUpdateOK" class="form-container">
      <div class="flex-items">
        <div class="left-item">
          <label for="username" :class="{invalid: userNameError }">Username</label>
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
          <label for="password" :class="{invalid: userPasswordError }">Password</label> 
        </div>
        <div class="right-item">
          <input type="password" 
                v-model.trim="updatedPassword"
                id="password" 
                placeholder="Enter New or Leave Blank">      
        </div>
      </div>

      <UserHomes v-on:throw-error="throwError"/>

      <UserRole  v-on:throw-error="throwError"/>
          
      
      <div class="flex-items__spaced--edit">
        <div class="left-item__indicator">
          <transition name="fade" mode="out-in">
            <Errors v-if="notification" :indicatorType="notificationType" :mssg="mssg" />
         </transition>
        </div>
        <div class="right-item__indicator--edit">
            <button @click.prevent="deleteUser" 
              class="btn btn-delete">DELETE
              </button>
            <button class="btn btn-primary" 
            :disabled="userNameError || userPasswordError || homeError || roleError">
            UPDATE
            </button>
        </div>    
      </div>  
    </form>
  </div>
</template>

<script>
import CircleText from '@/components/UI/CircleText'
import Errors from '@/components/UI/Errors'
import UserRole from '@/components/UI/UserRole'
import UserHomes from '@/components/UI/UserHomes'
export default {
    layout: 'admin',
    components: {
      CircleText,
      Errors,
      UserRole,
      UserHomes
    },
    data() {
      return {
        notification: false,
        notificationType: '',
        mssg: '',
        userNameError: false,
        userPasswordError: false,
        homeError: false,
        roleError: false,
        updatedName: '',
        updatedPassword: '' 
      }
    },
    watch: {
      updatedName() {
        this.removeNotify();
        this.userNameError = false;
        if(this.updatedName != '') {
          if(!this.updatedName.match(/^[0-9a-zA-Z]+$/)) {
            this.notify('error', 'Invalid Character')
            this.userNameError = true;
          } else if(this.updatedName.length < 6) {
            this.notify('error', 'UserName must be > 6');
            this.userNameError = true;
          } else {
            this.$store.commit('users/updateUserName', this.updatedName);
          }
        }
      },
      updatedPassword() {
        this.removeNotify();
        this.userPasswordError = false;
        if(this.updatedPassword != '') {
          if(!this.updatedPassword.match(/^[0-9a-zA-Z]+$/)) {
            this.notify('error', 'Invalid Character')
            this.userPasswordError = true;
          } else if(this.updatedPassword.length < 8) {
            this.notify('error', 'Password must be > 8');
            this.userPasswordError = true;
          } else {
            this.$store.commit('users/updateUserPassword', this.updatedPassword);
          }
        } 
      }
    },
    computed: {
      getOGUserName(){
        return this.$store.state.users.ogUserName;
      },
      getZeroHomesError() {
        return this.$store.state.users.zeroHomesError;
      },
    },
    methods: {
      throwError(data) {
        if(data.status) {
          if(data.type == 'role'){
            this.roleError = true;
            this.notify('error', 'Keepers Have 1 Home')
          } else {
          this.homeError = true;
          this.notify('error', 'You Must Select a Home')
          } 
        } else { 
          if(data.type == 'role'){
            this.roleError = false;
            this.removeNotify();
          } else {
            this.homeError = false;
            this.removeNotify();
          }
        }
        
      },
      notify(type, mssg) {
        this.notification = true;
        this.notificationType = type;
        this.mssg = mssg;
      },
      removeNotify() {
        this.notification = false;
        this.notificationType = '';
        this.mssg = '';
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
         this.removeNotify();
        }, 1000)
      }
    },
    mounted() {
        this.$store.dispatch('admin/getUserData', this.$route.params.id)
        .then(() => {
          this.notify('success', "User Loaded")
          this.hideMssg();
        }).catch((e) => {
          console.log(e);
        });
    }
}

</script>

<style>

</style>