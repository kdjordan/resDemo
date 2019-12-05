<template>
      <div class="cur-res">
            <div class="cur-res__title">All Current Reservations</div>
                <table class="cur-res__results">
                        <thead class="cur-res__results--title">
                        <tr>
                            <th>user</th>
                            <th>guest</th>
                            <th>start</th>
                            <th>end</th>
                            <th>phone</th>
                            <th>&nbsp;</th>
                        </tr>
                        </thead>
                        <tbody class="cur-res__results--body">
                        <tr>
                            <td>Kathy</td>
                            <td>Kathy</td>
                            <td>9-12-2019</td>
                            <td>9-20-2019</td>
                            <td>555-222-1111</td>
                            <td>
                                icons
                            </td>
                        </tr>

                        <tr>
                                <td>Kathy</td>
                                <td>Kathy</td>
                                <td>9-12-2019</td>
                                <td>9-20-2019</td>
                                <td>555-222-1111</td>
                                <td>
                                    icons
                                </td>
                            </tr>

                        </tbody>
                </table>
        </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.cur-res {
    min-width: 60rem;
    
    &__title {
            color: $color1;
            text-align: center;
            margin-bottom: 2rem;
        }

    &__results {
        border-bottom: 1px solid $colorG;
        border-collapse: collapse;
        color: $colorG;
        width: 85%;
        margin: 0 7.5%;
        font-size: 1.2rem;
        text-align: center;

        
    
        & thead {
            line-height: 3;
        }
        
        & th {
        text-transform: uppercase;
        color: $colorG;
        border-bottom: 1px solid $colorG;
        }   
        
        & td {
            padding: 1.2rem 0;
            text-transform: uppercase;
            border-bottom: 1px solid $colorG;
            
            color: $colorG;
        }

    }

    &__icon {
        
        &--edit {
            cursor: pointer;
            fill: $color1;
            width: 2.3rem;
            height: 2.3rem;
            padding: .3rem;
            transition: all .4s;
            &:hover {
                transform: scale(1.2);
            }
        }

        &--delete {
            cursor: pointer;
            fill: $color2;
            width: 2.3rem;
            height: 2.3rem;
            padding: .3rem;
            transition: all .4s;

            &:hover {
                transform: scale(1.2);
            }
        }

       
    }
}


</style>