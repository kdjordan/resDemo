<template>
<div class="flex-items__spaced">
    <div class="left-item">
        <label :class="{ invalid: roleError }">Role</label>   
    </div>
    <div class="right-item">
        <div class="user-form__radio-input">
            <div class="checkbox-box">
                <input type="radio" v-model="userRole" @change="checkUserRole" value="user" id="user">
                <label for="user" class="label-sm">User</label>
            </div>
            <div class="checkbox-box">
                <input type="radio" v-model="userRole" @change="checkUserRole" value="keeper" id="keeper">
                <label for="keeper" class="label-sm">Keeper</label> 
            </div>
            <div class="checkbox-box">    
                <input type="radio" v-model="userRole" @change="checkUserRole" value="admin" id="admin"> 
                <label for="admin" class="label-sm">Administrator</label>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            roleError: false
        }
    },
    methods: {
        checkUserRole(ev) {
            if(ev.srcElement.id == 'keeper') {
                this.$store.dispatch('userRole/checkKeeperHomesCount')
                .then((res) => {
                    console.log('keeper homes good')
                    this.$emit('throw-error', {status: false, type: 'role'});
                    this.roleError = false;
                }).catch((e) => {
                    console.log('too many homes for keeper')
                    this.$emit('throw-error', {status: true, type: 'role'});
                    this.roleError = true;
                    console.log(e)
                });
            } else {
                this.roleError = false;
                this.$emit('throw-error', {status: false, type: 'role'});
            }
        }
    },
    computed: {
        userRole: {
            get() {
                return this.$store.state.userRole.role
            },
            set(val) {
                this.$store.commit('userRole/setUserRole', val)
            }
        }
    }

}
</script>

<style>

</style>