<template>
    <div class="circle">
            <div class="circle__content"> {{ title}} </div>
    </div>
</template>

<script>

export default {
    props: ['title'],
}
</script>

<style lang="scss" scoped>

.circle { 
    
    text-align: center;
    line-height: 15rem;
    height: 15rem;
    width: 15rem;
    background: $color1;
    display: block;
    border-radius: 50%;
    margin-bottom: 4rem;
    

    &__content {
        color: white;
        text-transform: uppercase;
        font-size: 2rem;
    }
    
}

</style>