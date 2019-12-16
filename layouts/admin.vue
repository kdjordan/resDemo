<template>
  <div>
      <Header />
      <client-only>
        <SideNav />
      </client-only>
      <Nuxt />
  </div>
</template>

<script>

import Header from '@/components/admin/AdminHeader'
import SideNav from '@/components/admin/SideNav'
export default {
  middleware: ['auth-admin'],
    components: {
        SideNav,
        Header
    }
}
</script>

