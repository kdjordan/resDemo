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
                    <input type="checkbox"  
                        :checked="user.homesArray.find((el) => homeName)" :id="`${user.userName}`" 
                        @change="updateHomesArray(user.userName)">
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

export default {
  layout: 'admin',
  data() {
    return {
      homeName: '',
      homeNameInvalid: false,
      initHomeError: true
    }
  },
  components: {
    CircleText,
    Messages,
    Buttons
  },
  computed: {
    ...mapGetters({
        getUsersMenu: 'sidenav/getUsersMenu'
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
      this.$store.dispatch('userHomes/addHome', this.homeName)
      .then((res) => {
        ev.target.reset();
        this.$store.commit('userHomes/resetQueriedHome');
      }).catch((e) => {
        console.log(e)
      });
    }
  },
    
}
</script>

<style>

</style>