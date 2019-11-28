
export const state = () => ({
    notificationMssg: 'test',
    notificationState: false
    
 });
 
 export const getters  = {
    getNotificationState(state) {
        return state.notificationState;
    },
    getNotificationMssg(state) {
        if(state.notificationState) {
            return state.notificationMssg;
        }
    }
 };
 
 export const mutations = {
     setNotification(state, payload) {
        state.notificationState = payload.status;
        state.notificationMssg = payload.mssg;
     },
     removeNotification(state, payload){
        state.notificationState = payload.status;
        state.notificationMssg = payload.mssg;
     }
 }
 
 export const actions = {
    hideNotification({ commit }) {
        setTimeout(() => {
         commit('setNotification', {status: false, mssg: ''})
        }, 1000)
      }
 }
 
 