<template>
<div class="right-item">
    <div class="user-form__radio-input">
        <div class="checkbox-box">
            <input type="radio" v-model="userRole" @change="checkUserRole" value="user" id="userRole">
            <label for="userRole" class="label-sm">User</label>
        </div>
        <div class="checkbox-box">
            <input type="radio" v-model="userRole" @change="checkUserRole" value="keeper" id="keeperRole">
            <label for="keeperRole" class="label-sm">Keeper</label> 
        </div>
        <div class="checkbox-box">    
            <input type="radio" v-model="userRole" @change="checkUserRole" value="admin" id="adminRole"> 
            <label for="adminRole" class="label-sm">Administrator</label>
        </div>
    </div>
</div>
</template>

<script>
export default {
    methods: {
        checkUserRole(ev) {
            console.log(ev)
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