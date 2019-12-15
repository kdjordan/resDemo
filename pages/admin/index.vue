<template>
<div>
  <client-only>
    <SideNav />
  </client-only>
  <div class="inner_container">
      <h1>Admin Index</h1>    
  </div>
</div>
</template>

<script>
import SideNav from '@/components/admin/SideNav'
export default {
  components: {
    SideNav
  },
    layout: 'adminLayout'

}
</script>

<style>

</style>