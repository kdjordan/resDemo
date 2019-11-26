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
                  v-model.trim="getUserName"
                  
                  placeholder="BBB"> 
          </div>
      </div>
      <div class="flex-items">
        <div class="left-item">
          <label for="password">Password</label> 
        </div>
        <div class="right-item">
          <input type="password" 
                v-model.trim="updatedPassword"
                name="password" 
                placeholder="Enter New or Leave Blank">      
        </div>
      </div>
      <div class="flex-items__spaced">
        <div class="left-item">
          <label>HOMES</label>   
        </div> 

        <Homes />

      </div>
      <div class="flex-items__spaced">
        <div class="left-item">
          <label>Role</label>   
        </div>
          <RadioGroup  />
          
      </div>
      <div class="flex-items__spaced--edit">
        <div class="left-item__indicator">
          <transition name="fade" mode="out-in">
            <Errors :indicatorType="indicatorType" :mssg="mssg" />
         </transition>
        </div>
        <div class="right-item__indicator--edit">
            <button @click.prevent="deleteUser" class="btn btn-delete">DELETE</button>
            <button class="btn btn-primary">
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
import RadioGroup from '@/components/UI/UserRadioGroup'
import Homes from '@/components/UI/ActiveHomes'
export default {
    layout: 'admin',
    components: {
      CircleText,
      Errors,
      RadioGroup,
      Homes
    },
    data() {
      return {
        indicatorType: '',
        mssg: '',
        updatedName: '',
        updatedPassword: '' 
      }
    },
    computed: {
      getUserName: {
        get() {
          return this.$store.state.users.userName;
        },
        set(val) {
          this.$store.commit('users/updateUserName', val);
        }
      },
   
      getZeroHomesError() {
        return this.$store.state.users.zeroHomesError;
      },
      getQueriedUser() {
        return this.$store.state.users.queriedUser;
      },
    },
    methods: {
      hideMssg() {
        setTimeout(() => {
          this.indicatorType = "";
          this.mssg = "";
        }, 1000)
      }
    },
    mounted() {
        this.$store.dispatch('users/getUserData', this.$route.params.id)
        .then(() => {
          this.indicatorType = "success";
          this.mssg = "User Loaded";
          this.hideMssg()
        }).catch((e) => {
          console.log(e);
        });
    }
}

</script>

<style>

</style>