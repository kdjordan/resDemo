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
                        <tbody class="cur-res__results--body" v-for="(res, index) in theRes" :key="index"> 
                        <template>
                            <tr>
                                <td>{{res.madeBy}}</td>
                                <td>{{res.madeFor}}</td>
                                <td>{{res.start}}</td>
                                <td>{{res.end}}</td>
                                <td>{{res.phone}}</td>
                                <td>
                                    <div class="cur-res__icon-box">
                                        <div class="cur-res__icon-box--edit">&radic;</div>
                                        <div class="cur-res__icon-box--delete">&minus;</div>
                                    </div>
                                    
                                </td>
                            </tr>
                        </template> 
                        </tbody> 
                </table>
                <div class="pagination">
                    <div class="pagination__box">
                        <div class="pagination__box--icon">
                            &lt;&lt;
                        </div>
                        <div class="pagination__box--icon" @click="pageForward">
                            &gt;&gt;
                        </div>
                    </div>
                </div>
        </div>
</template>

<script>
import res from '@/assets/js/data.js'

export default {
    data() {
        return {
            theRes: res.sampleData.currentRes1,
            paginationIndex: 1
        
        }
    },
    methods: {
        pageForward() {
            console.log(this.theRes)
            if(this.theRes == res.sampleData.currentRes3){
                this.theRes = res.sampleData.currentRes1;
            } else
            if(this.theRes == res.sampleData.currentRes2){
                this.theRes = res.sampleData.currentRes3;
            } else
            if(this.theRes == res.sampleData.currentRes1){
                this.theRes = res.sampleData.currentRes2;
            } 
        }
    }
}
</script>

<style lang="scss">

.cur-res {
    min-width: 60rem;
    
    &__title {
            color: $color1;
            text-align: center;
            margin-bottom: 2rem;
            text-transform: uppercase;
        }

    &__results {
        border-bottom: 1px solid $colorG;
        border-collapse: collapse;
        color: $colorG;
        width: 100%;
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

    &__icon-box {
        display: flex;
        align-items:center;
        justify-content: space-evenly;

        &--edit {
            color: white;
            background: $color1;
            cursor: pointer;
            border-radius: 50%;
            width: 2.1rem;
            height: 2.1rem;
            line-height: 2.1rem;
            transition: all .4s;

            &:hover {
                transform: scale(1.2);
            }
        }

        &--delete {
            color: white;
            background: $color2;
            cursor: pointer;
            border-radius: 50%;
            width: 2.1rem;
            height: 2.1rem;
            line-height: 2.1rem;
            transition: all .4s;

            &:hover {
                transform: scale(1.2);
            }
        }

       
    }
    .pagination {

        &  .inactive {
        color: $colorG;
        pointer-events: none;
         text-decoration: line-through;
    }
    
        &__box{
            display: flex;
            justify-content: space-around;
            align-items: center;
            width: 10%;
            margin: 0 auto;
            margin-top: 1rem;
            color: $color1;

            &--icon {
                transform: scale(1);
                transition: all .4s;

                &:hover {
                    cursor: pointer;
                    font-weight: 700;
                    transform: scale(1.2);
                    color: $color3;
                }
            }

        }
    }

}
</style>