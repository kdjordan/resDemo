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
    setUserActiveHomes(state, payload) {
        state.userActiveHomes = payload;
    }

}


export const actions = {
    makeReservation(_, payload) {
        console.log(payload)
        return new Promise((resolve, reject) => {
            this.$axios.$post(`/makeReservation/${state.userId}`)
            .then((res) => {
                console.log(res)
            }).catch((e) => {
                console.log(e)
            });
        })
    }
}
