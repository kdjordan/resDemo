<template>
  <div>
      <div class="cur-res">
          <table class="cur-res__results">
                        <thead class="cur-res__results--title">
                        <tr>
                            <th>start</th>
                            <th>end</th>
                            <th>completed on</th>
                            <th>completed by</th>
                        </tr>
                        </thead>
                        <tbody class="cur-res__results--body" v-for="(res, index) in getPagedRes" :key="index"> 
                        <template>
                            <tr>
                            <td>{{res.start.trim()}}</td>

                            <td>{{res.end.trim()}}</td>

                            <td>the Date</td>

                            <td> <input type="checkbox"  @change="updateRes(res._id)">  </td>
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
                </div>    
      </div>
        <transition name="fade">
            <div v-if="resError" class="error login__error">{{ getErrorMessage }}</div>
        </transition>
        <transition name="fade">
      <button class="btn btn-primary" v-if="checkErrorState" @click="reservationCleaned" :disabled="resError || initError">SUBMIT</button>
        </transition>
      <!-- {{completedRes}}<br />
      {{getUserId}}<br />
      {{getActiveHomeId}}<br />
      {{getUserName}}<br />
      {{resError}}<br /> -->

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
   
data() {
    return {
        initError: true,
        resError: false,
        errorMessage: '',
        completedRes: [],
        pageIndex: 0
    }
},
computed: {
    ...mapGetters({
        getPagedRes: 'reservation/getPagedReservations',
        getAllRes: 'reservation/getReservations',
        getUserName : 'auth/getUserName',
        getUserId : 'auth/getUserId',
        getActiveHomeId : 'reservation/getActiveHomeId',
        getToken: 'auth/getToken'
    }),
    getErrorMessage() {
        return this.errorMessage;
    },  
    checkErrorState() {
        this.resError = false;
        if(this.initError == false && this.completedRes.length > 1) {
            this.resError = true;
            this.errorMessage = 'Only 1 Reservation at a time';
            return false;
        } else if (this.initError == false && this.completedRes.length == 0) {
            this.resError = true;
            this.errorMessage = 'No Reservation Selected'
            return false;
        } else { 
            return true;
        }
    }
},
methods: {
    updateRes(id) {
        this.initError = false;
        // console.log(this.completedRes.includes(id))
        // console.log(this.completedRes.indexOf(id))
        if(this.completedRes.includes(id)) {
            this.completedRes.splice(this.completedRes.indexOf(id), 1)
        } else {
            this.completedRes.push(id)
        }
        
    },
    reservationCleaned() {
        this.$store.dispatch('reservation/reservationCleaned', 
                    { keeperName: this.getUserName, 
                    keeperId: this.getUserId,
                    resId: this.completedRes[0],
                    token: this.getToken })
            .then((res) => {
                console.log(res)
            }).catch((e) => {
                console.log(e)
            })
    },
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
}
}
</script>

<style lang="scss">

</style>