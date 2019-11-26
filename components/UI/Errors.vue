<template>
  <div>
      <p v-show="indicatorType == 'error'" :class="indicatorType">{{mssg}}</p>
      <p v-show="indicatorType == 'success'" :class="indicatorType">{{mssg}}</p>
  </div>
</template>

<script>
export default {
    props: ['indicatorType', 'mssg'],
    data() {
        return {
          
        }
    }
}
</script>

<style>

</style>