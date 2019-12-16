<template>
      <div class="cur-res">
            <div class="cur-res__title">All Current Reservations</div>
            <div v-if="loadingError" class="error" style="text-align: center;">
                                LOADING ERROR
                                </div>       
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
                        <tbody :class="{'flash' : getAddedResFlag}" class="cur-res__results--body" v-for="(res, index) in getPagedRes" :key="index"> 
                        <template>
                            <tr>
                                <td>{{res.madeBy}}</td>

                                <td v-if="editActive && updatedResId == res._id">
                                    <input type='text'  :placeholder="`${res.madeFor}`" v-model="updatedGuest" class="update-input">
                                </td>
                                <td v-else>{{res.madeFor}}</td>

                                <td v-if="editActive && updatedResId == res._id">
                                    <input type='text'  :placeholder="`${res.start.trim()}`" 
                                            v-model="updatedStart" :class="{'input-error' : dateError}" 
                                            class="update-input" @focus="dateError = false">
                                </td>
                                <td v-else>{{res.start.trim()}}</td>

                                <td v-if="editActive && updatedResId == res._id">
                                    <input type='text'  :placeholder="`${res.end.trim()}`" 
                                            v-model="updatedEnd" :class="{'input-error' : dateError}" 
                                            class="update-input" @focus="dateError = false">
                                </td>
                                <td v-else>{{res.end.trim()}}</td>

                                <td v-if="editActive && updatedResId == res._id">
                                    <input type='text'  :placeholder="`${res.phone}`" v-model="updatedPhone" class="update-input">
                                </td>
                                <td v-else>{{res.phone}}</td>

                                <td>
                                    <div class="cur-res__icon-box" v-if="new Date(res.start.trim().replace(/-/g, '\/')) > new Date()">
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
                        <div class="pagination__box--icon" @click="pageBack">
                            &lt;&lt;
                        </div>
                        <div class="pagination__box--icon" @click="pageForward">
                            &gt;&gt;
                        </div>
                    </div>
                   
                    <transition name="fade" mode="out-in">
                            <p v-if="resError" class="btn error">{{error}}</p>
                        </transition>
                        <transition name="fade" mode="out-in">
                            <p v-if="resNotification" class="btn success">{{notification}}</p>
                        </transition>
                    <button class="btn btn-primary" v-if="editActive" @click="commitUpdateRes" :disabled="dateError">UPDATE</button>
                </div>
                <!-- ::{{getAllRes.length}} -->
        </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    props:['homeId'],
    data() {
        return {
            flash: false,
            loadingError: false,
            resError: false,
            error: '',
            resNotification: false,
            noteType: 'error',
            notification: '',

            dateError: false,
            editActive: false,
            updatedResId: '',
            updatedGuest: '',
            updatedPhone: '',
            updatedStart: '',
            updatedEnd: '',

            pageIndex: 0
        }
    },
    computed: {
        ...mapGetters({
            getAllRes: 'reservation/getReservations',
            getDisRes: 'reservation/getDisabledDates',
            getPagedRes: 'reservation/getPagedReservations',
            getOG: 'reservation/getOGresDates',
            getAddedResFlag: 'reservation/getAddedResFlag',
        }),
    },
    watch: {
         //** FN : watches dateError and throws error if dateError == true
        dateError() {
            if(this.dateError) {
                this.setNotification({type: 'error', status: true, mssg: 'Date Error'})
            }
        },
        //** FN : watches for a new Reservation being made in makeRes component
        //**    : if we have a new res - call flashRes() to highlight new res in list
        getAddedResFlag(){
            if(this.getAddedResFlag == true) {
                this.flashNewRes();
            }
        }
    },
    methods: {
        //** FN : toggles active fields and updates any input from user to local state
        //**    : also resets local state when new active fields are made live
        updateRes(res){
            this.editActive = !this.editActive;

            this.updatedResId = res._id;
            this.updatedGuest = res.madeFor;
            this.updatedPhone = res.phone;
            this.updatedStart = res.start.trim();
            this.updatedEnd = res.end.trim();

            if (this.editActive == false) {
                this.dateError = false,
                this.updatedResId = ''
                this.updatedGuest = ''
                this.updatedPhone = ''
                this.updatedStart = ''
                this.updatedEnd = ''
            }
            
        },
        //** FN : checks for date errors (range and format) and dispatches update if all good
        //**    : updated res to module for axios call 
        commitUpdateRes() {
            console.log((`${this.updatedStart} to ${this.updatedEnd}`.length))
            this.$store.commit('reservation/setOGresDates', this.updatedResId)
            
            if(!(this.checkValidDate(this.updatedStart) && this.checkValidDate(this.updatedEnd)) 
                || (`${this.updatedStart} to ${this.updatedEnd}`.length) != 24) {
                this.dateError = true;
                return;
            }
            
            if(!(this.checkResDates(this.getOG.from.trim(), this.getOG.to.trim(), this.updatedStart, this.updatedEnd))){
                //good to go
                this.editActive = false;
                let updateObj = {
                    res_id: this.updatedResId,
                    guest: this.updatedGuest,
                    phone: this.updatedPhone,
                    start: this.updatedStart,
                    end: this.updatedEnd
                }
                this.$store.dispatch('reservation/updateReservation', updateObj)
                this.setNotification({type: '', status: true, mssg: 'Success'})
            } else {
                //error with overlapping dates
                console.log('fail point overlap')
                this.dateError = true;
                return;
            }

           

        },
         //** FN : checks for bad date formatting
        //** RTRN : boolean -> true means error has occured
        checkValidDate(dateToCheck){
            const date = new Date(dateToCheck.split('-')[0], (+(dateToCheck.split('-')[1])-1), dateToCheck.split('-')[2])
            const isValidDate = (Boolean(+date) && date.getDate() == dateToCheck.split('-')[2])
            console.log('throwing ' + isValidDate)
            return isValidDate
        },
        //** FN : checks for overlap, and if start date > end date 
        //** RTRN : boolean -> true means error has occured, overlapping dates entered
        checkResDates(start, end, from, to){
            let newStart = new Date(from.replace(/-/g, '\/'));
            let newEnd= new Date(to.replace(/-/g, '\/'));

            if(newStart > newEnd || newStart < new Date()) {
                return true;
            }

            let datesToCheck = this.getDisRes.filter(res => (res.from.trim()!= start) && (res.to.trim() != end))
            let conflict = 0;
            datesToCheck.forEach(date => {
                let disDateStart = new Date(date.from.trim().replace(/-/g, '\/'));
                let disDateEnd = new Date(date.to.trim().replace(/-/g, '\/'));
                if( disDateEnd  >=  newStart  &&    disDateStart <= newEnd) {
                    conflict++;
                }
            }) 
                if(conflict > 0) {
                    return true
                } else {
                    return false;
                }
        },
        //** FN : dispatches delete fn to module for axios call
        deleteRes(res) {
            if(confirm(`Are You Sure you Want to Delete Res ${res._id}`)){
                this.$store.dispatch('reservation/deleteReservation', res)
                .then((res) => {
                    if(res == 'success') {
                        this.setNotification({type: '', status: true, mssg: 'Success'})
                    } else {
                        this.setNotification({type: 'error', status: true, mssg: 'Error Deleting'})    
                    }
                }).catch(() => {
                    this.setNotification({type: 'error', status: true, mssg: 'Error Deleting'})
                })
            }
        },
        //** FN : handles pagination forward
        pageForward() {
            let totalPages = Math.ceil(this.getAllRes.length / 5);

            if (this.pageIndex == Math.floor(this.getAllRes.length / 5)){
                this.pageIndex = 0;
            } else if (this.pageIndex == totalPages-1 && (this.getAllRes.length % 5 == 0)) {
                this.pageIndex = 0;   
            } else {
                this.pageIndex++;
            }
            this.$store.commit('reservation/setPagedReservations',this.pageIndex) 
        },
        //** FN : handles pagination back
        pageBack() {
            let totalPages = Math.ceil(this.getAllRes.length / 5);

            if ((this.pageIndex == 0)&& (this.getAllRes.length % 5 == 0)){
                this.pageIndex = Math.floor(this.getAllRes.length / 5) - 1
            } else if (this.pageIndex == 0) {
                this.pageIndex = Math.floor(this.getAllRes.length / 5)
            } else {
                this.pageIndex--;
            }
            this.$store.commit('reservation/setPagedReservations',this.pageIndex)
        },
        //** FN : handles errors and notifications
        //**      can't use our global one here since Make Reservation component
        //**      is using it
        setNotification(obj) {
            if(obj.type == 'error') {
                this.resError = obj.status;
                this.error = obj.mssg;
            } else {
                this.resNotification = obj.status;
                this.notification = obj.mssg;
            }
            setTimeout(() => {
                this.dateError = false;
                this.resNotification = false;
                this.notification = '';
                this.resError = false;
                this.error = '';
            },2000)
        },
         //** FN : adds flash class to the most recent reservation made
         //**    : state is watched in this file and passed from makeRes component
        flashNewRes() {
            setTimeout(() => {
                this.$store.commit('reservation/setAddedResFlag', false)
            },500)
        }
    },
    //** FN : initiate module store with home reservations and assign userId to state
    // async mounted() {
    //     try{
    //         console.log(this.$store.state.reservation.userActiveHomes)
    //         let ans = await this.$store.dispatch('admin/initGetRes', this.$store.state.reservation.userId)            
    //         if(ans != 'success') {
    //             this.loadingError = true;
    //         }
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }
}
</script>   

<style lang="scss">
.btn.success{
    border: 1px solid $color1;
}
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
.flash  {
    transition: all .4s;

     &:nth-child(2) > tr {
        background: $color3;
        & > td{
            color: white;
        }
     }
}


</style>