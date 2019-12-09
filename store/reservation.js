export const state = () => ({
    queriedHome: [],
    disabledDates: [{from: "2019-12-25",to: "2019-12-26"},{from: "2019-12-28",to: "2019-12-29"}],
    userId: null
    
});

export const getters = {
    getQueriedHome(state) {
        return state.queriedHome;
    },
    getDisabledDates(state) {
        return state.disabledDates;
    }, 
    getCurrRes(state) {
        return state.currRes
    } 
}

export const mutations = {
    setUserId(state, payload) {
        state.userId = payload;
    },
    setQueriedHome(state, payload) {
        state.queriedHome = payload
    },
    setDisabledDates(state, payload) {
        state.disabledDates = payload;
    }

}


export const actions = {

}
