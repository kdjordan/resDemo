<template>
<div class="flex-items__spaced">
    <div class="left-item">
        <label :class="{invalid: homesError }">HOMES</label>   
    </div> 
    <div class="right-item">
        <div v-for="(home, index) in getActiveHomes" :key="index">
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
</template>

<script>
export default {
    data() {
        return {
            homesError: false
        }
    },
    computed: {
        getActiveHomes() {
            return this.$store.state.userHomes.activeHomes;
        },
        getHomesError() {
            return this.$store.state.userHomes.homesError;
        }
    },
    methods: {
        updateHomesArray(homeName) {
            this.$store.dispatch('userHomes/updateActiveHomes', homeName)
            .then(() => {
                this.$emit('throw-error', {status: false, type: 'home'});
                this.homesError = false;
            }).catch((e) => {
                if(e == 'role-eror') {
                    this.$emit('throw-error', {status: true, type: 'role'});
                } else {
                    this.$emit('throw-error', {status: true, type: 'home'});
                    this.homesError = true;
                }

            });
      }
    }

}
</script>

<style>

</style>