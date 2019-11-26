<template>
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
</template>

<script>
export default {
    computed: {
        getActiveHomesMenu() {
            return this.$store.state.userHomes.activeHomesMenu;
        }
    },
    methods: {
        updateHomesArray(homeName) {
            this.$store.commit('userHomes/updateActiveHomesMenu', homeName);
      }
    }

}
</script>

<style>

</style>