<template>
  <div>
      <div class="cur-res">
          <table class="cur-res__results">
                        <thead class="cur-res__results--title">
                        <tr>
                           
                            <th>start</th>
                            <th>end</th>
                            <th>completed on</th>
                            <th>completed</th>
                        </tr>
                        </thead>
                        <tbody class="cur-res__results--body" v-for="(res, index) in getPagedRes" :key="index"> 
                        <template>
                            <tr>
                            <td>{{res.start.trim()}}</td>

                            <td>{{res.end.trim()}}</td>

                            <td>the Date</td>

                            <td> <input type="checkbox" v-model="isComplete">  </td>
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
      

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
data() {
    return {
        isComplete: false,
        pageIndex: 0
    }
},
computed: {
    ...mapGetters({
        getPagedRes: 'reservation/getPagedReservations',
        getAllRes: 'reservation/getReservations'
    })
},
methods: {
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

<style>

</style>