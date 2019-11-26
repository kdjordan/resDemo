<template>
  <div class="inner_container">
      <CircleText title="Edit User" />
    <form  class="form-container">
      <div class="flex-items">
        <div class="left-item">
          <label for="username">Username</label>
        </div>
          <div class="right-item">
            <input type="text" 
                  v-model.trim="userName"
                  name="username"
                  :placeholder="userName"> 
          </div>
      </div>
      <div class="flex-items">
        <div class="left-item">
          <label for="password">Password</label> 
        </div>
        <div class="right-item">
          <input type="password" 
                v-model.trim="userPassword"
                name="password" 
                placeholder="Enter New or Leave Blank">      
        </div>
      </div>
      <div class="flex-items__spaced">
        <div class="left-item">
          <label :class="{invalid: getZeroHomesError }">HOMES</label>   
        </div> 
        <div class="right-item">
            <div v-for="(home, index) in getActiveHomesMenu" :key="index">
              <template>
                <div class="checkbox-box">
                    <input type="checkbox"  
                        :checked="home[1]" :id="`${home[0]}`" 
                        @change="updateHomesArray(`${home[0]}`)"
                      >
                    <label :for="`${home[0]}`" 
                        class="label-sm" :value="`${home[0]}`">
                        {{ home[0] }}</label>
                </div>
            </template>
            </div>
        </div>
      </div>
    </form>
     {{userName}}
  </div>
</template>

<script>
import CircleText from '@/components/UI/CircleText'
export default {
    layout: 'admin',
    components: {
      CircleText
    },
    data() {
      return {
        id: '',
        userName: '',
        userPassword: '',
        homesArray: [],
        allHomesArray: [],
        activeHomes: [],
        role: ''
      }
    },
    computed: {
      getActiveHomesMenu() {
        return this.$store.state.users.activeHomesMenu;
      },
      getZeroHomesError() {
        return this.$store.state.users.zeroHomesError;
      }
    },
    methods: {
      updateHomesArray(homeName) {
       this.$store.commit('users/updateActiveHomesMenu', homeName);
      }
    },
    created() {
      this.$store.dispatch('users/getUserData', this.$route.params.id)
      .then((data) => {
        this.id = data._id,
        this.userName = data.userName,
        this.homesArray = data.homesArray,
        this.role = data.role
      }).catch((e) => {
        console.log(e)
      });
      
    }

}
</script>

<style>

</style>