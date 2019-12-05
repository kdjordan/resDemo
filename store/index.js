 
 export const actions = {
     async nuxtServerInit({ dispatch }) {
        if(!process.client) {
            await dispatch('sidenav/getMenusData')
        }
    }
 }
 
 