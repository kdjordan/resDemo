<template>
  <div>
      <Header />
      <no-ssr>
        <SideNav />
      </no-ssr>
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

