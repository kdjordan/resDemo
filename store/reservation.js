export const state = () => ({
    queriedHome: [],
    disabledDates: [{from: "2019-12-25",to: "2019-12-26"},{from: "2019-12-28",to: "2019-12-29"}],
    userId: '5de8642c5f528290b0f95fc3',
    userActiveHomes: []
    
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
    },
    getUserId(state) {
        return state.userId
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
    },
    updateDisabledDates(state, payload) {
        let update = {from: payload.split('to')[0], to: payload.split('to')[1]};
        state.disabledDates.push(update)

    },
    setUserActiveHomes(state, payload) {
        state.userActiveHomes = payload;
    }

}


export const actions = {
    makeReservation({state, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.$post
            (`/makeReservation/${state.userId}`, {...payload, homeId: state.userActiveHomes[0]._id})
            .then(() => {
                this.dispatch('notifications/doNotification', {status: true, mssg: 'Reservation Made'});
                commit('updateDisabledDates', payload.dates)
                resolve('success')  
            }).catch((e) => {
                reject(e);
            });
        })
    }
}