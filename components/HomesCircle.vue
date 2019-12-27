<template>
  <div class="circle-container">
      <img class="circle-img" :src="require(`@/assets/img/${imageUrl}`)"   :alt="theAlt">
      <h1 class="circle-img__title">{{homeName}}</h1>
  </div>
</template>

<script>
export default {
    props: ['imageUrl', 'theAlt', 'homeName']

}
</script>

<style lang="scss">

.circle-container {
    display: flex;  
    flex-direction: column;
    align-items: center;
}
.circle-img {
    border-radius: 50%;
    border: .4rem solid $color1;
    height: 30rem;
    width: 30rem;

     @media (max-width: $screen-sm-min) {
            height: 20rem;
            width: 20rem;
         }

    &__title {
       margin-top: 2rem;
       text-transform: uppercase;
       border-bottom: 2px solid $color1;
       width: 90%;
    }
}
</style>