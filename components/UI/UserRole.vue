<template>
<div class="flex-items__spaced">
    <div class="left-item">
        <label :class="{ invalid: getRoleError }">Role</label>   
    </div>
    <div class="right-item">
        <div class="user-form__radio-input">
            <div class="checkbox-box">
                <input type="radio" v-model="userRole" @change="updateRole" value="user" id="user">
                <label for="user" class="label-sm">User</label>
            </div>
            <div class="checkbox-box">
                <input type="radio" v-model="userRole" @change="updateRole" value="keeper" id="keeper">
                <label for="keeper" class="label-sm">Keeper</label> 
            </div>
            <div class="checkbox-box">    
                <input type="radio" v-model="userRole" @change="updateRole" value="admin" id="admin"> 
                <label for="admin" class="label-sm">Administrator</label>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
    methods: {
        updateRole(ev) {
           this.$store.dispatch('userRole/updateRole', ev.srcElement.id)
        }
    },
    computed: {
        ...mapGetters({
            getRoleError: 'errors/getRoleError'
        }),
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