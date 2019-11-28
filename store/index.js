 
 export const actions = {
     async nuxtServerInit({ dispatch }) {
        await dispatch('sidenav/getMenusData')
     }
 }
 
 