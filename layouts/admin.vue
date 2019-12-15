<template>
  <div>
      <Header />
        <SideNav />
      <Nuxt />
  </div>
</template>

<script>

import Header from '@/components/admin/AdminHeader'
import SideNav from '@/components/admin/SideNav'
export default {
  middleware: ['auth','auth-admin'],
    components: {
        SideNav,
        Header
    }
}
</script>

