<template>
  <div>
      <Header />
      <SideNav />
      <Nuxt />
  </div>
</template>

<script>
import SideNav from '@/components/admin/SideNav'
import Header from '@/components/admin/Header'
export default {
    components: {
        SideNav,
        Header
    }
}
</script>

<style lang="scss">

</style>