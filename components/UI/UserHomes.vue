<template>
<div class="flex-items__spaced">
    <div class="left-item">
        <label :class="{invalid: getHomesError }">HOMES</label>   
    </div> 
    <div class="right-item">
        <div v-for="(home, index) in getActiveHomes" :key="index">
                <template>
                <div class="checkbox-box">
                    <input type="checkbox"  
                        :checked="home[1]" :id="`${home[0]}`" 
                        @change="updateHomesArray(`${home[0]}`)">
                    <label :for="`${home[0]}`" 
                        class="label-sm" :value="`${home[0]}`">
                        {{ home[0] }}</label>
                </div>
            </template>
        </div>
    </div>
</div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
    props:['caller'],
    computed: {
        ...mapGetters({
            getHomesError: 'errors/getHomesError',
            getUpdatedHomes: 'userHomes/getUpdatedHomes'            
        }),
        getActiveHomes() {
            return this.$store.state.userHomes.activeHomes;
        }
    },
    methods: {
        updateHomesArray(homeName) {
            this.$store.commit('errors/setInitHomesFalse');
            if(this.caller == 'addKeeper') {
                this.$store.commit('errors/setInitRoleFalse');
                this.$store.commit('userRole/setUserRole', 'keeper');
                this.$store.dispatch('userHomes/updateActiveHomes', homeName);
            } else {
                this.$store.dispatch('userHomes/updateActiveHomes', homeName);
            }
            
            
      }
    }

}
</script>
