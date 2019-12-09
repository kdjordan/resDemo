<template>
  <div>
      
        <flat-pickr :config="config"></flat-pickr>
      
  </div>
</template>

<script>
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
export default {
    components: {
        flatPickr
    },
    data() {
        return {
            resData: null,
            config: {
                name: 'Enter'
            }
        }
    }
}
</script>

<style>

</style>