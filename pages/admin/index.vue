<template>
<div>
  <no-ssr>
    <SideNav />
  </no-ssr>
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