 
 export const actions = {
     async nuxtServerInit({ dispatch }) {
        if (!process.client) {
            console.log('fetching nav')
            await dispatch('sidenav/getMenusData')
        }
    }
 }
 
 