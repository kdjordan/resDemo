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
                        <tbody class="cur-res__results--body" v-for="(res, index) in getAllRes" :key="index"> 
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
                                        <div class="cur-res__icon-box--delete" @click="deleteRes(res)">&minus;</div>
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
                {{getAllRes}}
        </div>
</template>

<script>
import res from '@/assets/js/data.js'
import { mapGetters } from 'vuex'

export default {
    props:['homeId'],
    data() {
        return {
            theRes: res.sampleData.currentRes1,
            paginationIndex: 1
        
        }
    },
    computed: {
        ...mapGetters({
            getAllRes: 'reservation/getReservations',
            getDisRes: 'reservation/getDisabledDates'
        })
    },
    methods: {
        deleteRes(res) {
            this.$store.dispatch('reservation/deleteReservation', res)
        },
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
    },
    mounted() {
        this.$store.dispatch('admin/initGetRes', this.$store.state.reservation.userId)
    }
}
</script>   

