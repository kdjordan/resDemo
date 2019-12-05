<template>
  <div class="header">
        <div class="header__left">
            <div class="circle-text">
                <div>AMC</div>
            </div>    
            <div class="circle-text__content">Vacation Rentals</div>
            
        </div>
        <div class="header__right">
            Welcome : {{userName}}
        </div> 
  </div>
</template>

<script>
export default {
    props: ['userName']
    
}
</script>
<style lang="scss">
.header {
    height: 8rem;
    background: $color1;
    color: white;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__left {
        display: flex;
        align-items: center;
        padding-left: 2rem;
    }

    &__right {
        margin-right: 2rem;
    }
}

.circle-text {
    background: white;
    height: 5rem;
    width: 5rem;
    line-height: 5rem;
    border-radius: 50%;

    & div {
        color: $color1;
        position: relative;
        left: .8rem;
    }

    &__content{
        font-size: 1.2rem;
        margin-left: 1rem;
        text-transform: uppercase;
    }
}
</style>
