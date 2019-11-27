<template>
  <div>
      <p v-show="indicatorType == 'error'" class="error">{{mssg}}</p>
      <p v-show="indicatorType == 'success'" class="success">{{mssg}}</p>
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