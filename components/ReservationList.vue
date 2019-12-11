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

                                <td v-if="editActive && editResId == res._id">
                                    <input type='text'  :placeholder="`${res.madeFor}`" v-model="updatedMadeFor" class="update-input">
                                </td>
                                <td v-else>{{res.madeFor}}</td>

                                <td v-if="editActive && editResId == res._id">
                                    <input type='text'  :placeholder="`${res.start.trim()}`" v-model="updatedStart" class="update-input">
                                </td>
                                <td v-else>{{res.start.trim()}}</td>

                                <td v-if="editActive && editResId == res._id">
                                    <input type='text'  :placeholder="`${res.end.trim()}`" v-model="updatedEnd" class="update-input">
                                </td>
                                <td v-else>{{res.end.trim()}}</td>

                                <td v-if="editActive && editResId == res._id">
                                    <input type='text'  :placeholder="`${res.phone}`" v-model="updatedPhone" class="update-input">
                                </td>
                                <td v-else>{{res.phone}}</td>

                                <td>
                                    <div class="cur-res__icon-box">
                                        <div class="cur-res__icon-box--edit" @click="updateRes(res)">&radic;</div>
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
                    <button class="btn btn-primary" v-if="editActive" @click="commitUpdateRes">UPDATE</button>
                </div>
                {{updatedMadeFor}}
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
            paginationIndex: 1,
            editActive: false,
            editResId: '',
            updatedMadeFor: '',
            updatedPhone: '',
            updatedStart: '',
            updatedEnd: ''
        
        }
    },
    computed: {
        ...mapGetters({
            getAllRes: 'reservation/getReservations',
            getDisRes: 'reservation/getDisabledDates'
        })
    },
    methods: {
        updateRes(res){
            this.editResId = res._id;
            this.editActive = !this.editActive;
            
            
        },
        commitUpdateRes() {
            this.editActive = false;

        },
        deleteRes(res) {
            if(confirm(`Are You Sure you Want to Delete Res ${res._id}`)){
                this.$store.dispatch('reservation/deleteReservation', res)
            }
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

<style lang="scss">
.update-input {
    width: 8rem;
    border: 1px solid $color1;
    padding: .2rem;
}
.input-error {
    background: $color2;

    &::placeholder {
        color: white;
    }
}
</style>