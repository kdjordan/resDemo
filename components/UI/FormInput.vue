<template>
<div class="flex-items">
    <div class="left-item">
        <label :for="labelFor" :class="{invalid: errorValidator }">{{ label }}</label>
    </div>
    <div v-if="type=='text'" class="right-item">
        <input :type="type" 
                v-model.trim="updatedName"
                :id="id"
                :placeholder="getOGUserName"> 
    </div>
    <div v-else class="right-item">
        <input :type="type" 
                v-model.trim="updatedPassword"
                :id="id"
                :placeholder="placeholder"> 
    </div>
</div>
</template>

<script>
export default {
    props:['type', 'errorValidator', 'label', 'labelFor', 'id', 'placeholder', 'caller'],
    data() {
        return {
             updatedName: '',
             updatedPassword: '',
             theCaller: this.caller
        }
    },
    watch: {
      updatedName() {
        this.$store.commit('errors/setUserNameError', {status: false, mssg: ''})
        this.$store.commit('errors/setInitUserNameFalse')
        if(this.theCaller=='addUser') {
            if(this.updatedName == '') {
                this.$store.commit('errors/setUserNameError', {status: true, mssg: 'User Name Cannot be Blank'})
            }
        }
        if(this.updatedName != '') {
          this.$store.commit('users/setUserName', this.updatedName);
          if(!this.updatedName.match(/^[0-9a-zA-Z]+$/)) {
            this.$store.commit('errors/setUserNameError', {status: true, mssg: 'Invalid Character'})
          } else if(this.updatedName.length < 6) {
            this.$store.commit('errors/setUserNameError', {status: true, mssg: 'User Name < 6'})
          } 
        }
      },
      updatedPassword() {
        this.$store.commit('errors/setPasswordError', {status: false, mssg: ''})
        this.$store.commit('errors/setInitPasswordFalse')
        if(this.theCaller=='addUser') {
            if(this.updatedPassword == '') {
                this.$store.commit('errors/setPasswordError', {status: true, mssg: 'Password Cannot be Blank'})
            }
        }
        if(this.updatedPassword != '') {
          this.$store.commit('users/setUserPassword', this.updatedPassword);
          if(!this.updatedPassword.match(/^[0-9a-zA-Z]+$/)) {
            this.$store.commit('errors/setPasswordError', {status: true, mssg: 'Invalid Character'})
          } else if(this.updatedPassword.length < 8) {
           this.$store.commit('errors/setPasswordError', {status: true, mssg: 'Password < 8'})
          }
        } 
      }
    },
    computed: {
        getOGUserName(){
            return this.$store.state.users.ogUserName;
      }
    }
}
</script>

<style>

</style>