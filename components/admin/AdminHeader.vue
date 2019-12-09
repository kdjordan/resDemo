<template>
  <div class="admin-header">
      <div class="admin-header__content">
          <div class="admin-header__content--logo">
              <div class="admin-header__content--logo-circle">
                  <span class="admin-header__content--logo-circle-AMC" >AMC</span>
              </div>
              <div class="admin-header__content--logo-text">
                  Vacation Rentals :: Admin
              </div>
          </div>
          <div class="admin-header__content--content">
              HOME
          </div>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.admin-header {
    height: 8rem;
    background: $colorWhite;
    box-shadow: 7px 0 60px rgba(0,0,0,.05);
    z-index: 2;
    position: fixed;
    width: 100%;

    &__content {
        color: $color1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex: 1;

        &--logo{
            display: flex;
            align-items: center;
            justify-content: center;
            height: 8rem;
            width: 25rem;

            &-circle {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                display: inline-block;
                color: white;
                background: $color1;
                // border: 3px solid $color1;
                height: 6rem;  
                width: 6rem;
                border-radius: 50%;

                &-AMC {
                    font-size: 2rem;
                    position: relative;
                    top: 1.5rem;
                    left: .8rem;
                    
                }
            }
            &-text {
                margin-left: .5rem;
                text-transform: uppercase;
                font-size: 1.4rem;
            }
        }
        
        &--content {
            margin-right: 2rem;
        }
    }
}

</style>