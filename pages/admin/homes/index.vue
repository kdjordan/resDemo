<template>
  <div class="inner_container">
    <CircleText title="Add Home" />
    <form  @submit.prevent="addHome" class="form-container">

      <div class="flex-items">
        <div class="left-item">
            <label for="homeName" :class="{invalid: homeNameInvalid}">HomeName</label>
        </div>
        <div class="right-item">
            <input type="text" 
            v-model.trim="homeName"
                    id="homeName"
                    placeholder="Enter Home Name"> 
        </div>
    </div>
      <div class="flex-items__spaced">
         <div class="left-item">
            <label for="activeUsers">Active Users</label>
        </div>
        <div class="right-item">
          <div class="activeUsersList" v-for="(user, index) in getUsersMenu" :key="index">
            <template>
                <div class="checkbox-box">
                    <input type="checkbox"  :id="`${user.userName}`" 
                        @change="updateActiveUsers({userName: user.userName, _id: user._id})">
                    <label :for="`${user.userName}`" 
                        class="label-sm" :value="`${user.userName}`">
                        {{ user.userName }}</label>
                </div>
            </template>
          </div>
        </div>
      </div>  

      <div class="flex-items__spaced--edit">

        <Messages />

       <div class="right-item__indicator--edit">
        <button class="btn btn-primary" :disabled="homeNameInvalid || initHomeError">ADD</button>  
      </div>
            
      </div>
    </form>
  </div>
</template>

<script>
import CircleText from '@/components/UI/CircleText'
import Buttons from '@/components/UI/AdminButtons'
import Messages from '@/components/UI/Messages'
import { mapGetters } from 'vuex'
import utilities from '@/assets/js/utilities.js'

export default {
  layout: 'admin',
  data() {
    return {
      homeName: '',
      homeNameInvalid: false,
      initHomeError: true,
      activeUsers: []
    }
  },
  components: {
    CircleText,
    Messages,
    Buttons
  },
  computed: {
    ...mapGetters({
        getUsersMenu: 'sidenav/getUsersMenu',
        getHomesMenu: 'sidenav/getHomesMenu'
    })
  },
  watch: {
    homeName() {
      this.initHomeError = false;
      if(this.homeName == '' ) {
        this.$store.commit('errors/setUserNameError', {status: true, mssg: 'Home Name Cannot be blank'})
        this.homeNameInvalid = true;
      } else {
        this.$store.commit('errors/setUserNameError', {status: false, mssg: ''})
        this.homeNameInvalid = false;
      }
    }
  },
  methods: {
    addHome(ev) {

      //check to see if homeName is available
      //if name is available dispatch addHome to userHomes.js for DB call
      if(utilities.checkIfAvailable(this.homeName, this.getHomesMenu)) {
        this.$store.dispatch('userHomes/addHome', {homeName: this.homeName, activeUsers: this.activeUsers})
        .then((res) => {
          ev.target.reset();
        }).catch((e) => {
          console.log(e)
        });
      } else {
        this.$store.commit('errors/setUserNameError', {status: true, mssg: 'Home Name Taken'})
      }
    },
    updateActiveUsers(user) {
      let active = this.activeUsers.filter(activeUser => activeUser._id == user._id)
      if(active.length == 1) {
        this.activeUsers.forEach(element => {
          if(element._id == user._id){
            let index = this.activeUsers.indexOf(element)
            this.activeUsers.splice(index, 1)
          }     
        });
      } else {
        this.activeUsers.push(user)
      }
    }
    
  },
    
}
</script>

<style>

</style>