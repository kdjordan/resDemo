<template>
  <div>
    <nuxt />
  </div>
</template>

<script>

export default {
  middleware: ['init-auth', 'auth']
}
</script>

<style lang="scss">
  
</style>