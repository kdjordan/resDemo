import utilities from '@/assets/js/utilities.js'

export const state = () => ({
    queriedHome: [],
    disabledDates: [],
    userId: '5de8642c5f528290b0f95fc3',
    userActiveHomes: [],
    reservations: []
    
});

export const getters = {
    getQueriedHome(state) {
        return state.queriedHome;
    },
    getDisabledDates(state) {
        return state.disabledDates;
    }, 
    getReservations(state) {
        return state.reservations;
    },
    getUserId(state) {
        return state.userId
    }
}

export const mutations = {
    setUserActiveHomes(state, payload) {
        state.userActiveHomes = payload;
    },
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
        console.log('upadating disabled dates')
        console.log(payload)

        let update = {from: payload.dates.split('to')[0], to: payload.dates.split('to')[1]};
        state.disabledDates.push(update)
        return;

    },
    deleteDisabledDate(state, payload) {
        state.disabledDates.forEach(res => {
            if(res.from.trim() == payload.from) {
                state.disabledDates.splice( state.disabledDates.indexOf(res), 1 );
            }
        })
    },
    updateReservations(state, payload){
        state.reservations.push(payload)
    },
    deleteReservation(state, payload) {
        state.reservations.forEach(res => {
            if (res._id == payload) {
                state.reservations.splice( state.reservations.indexOf(res), 1 );
            }
        })
    }

}


export const actions = {
    makeReservation({ state, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.$post
            (`/makeReservation/${state.userId}`, {...payload, homeId: state.userActiveHomes[0]._id})
            .then((data) => {
                this.dispatch('notifications/doNotification', {status: true, mssg: 'Reservation Made'});
                
                //update disabled dates for cal display
                commit('updateDisabledDates', {dates: payload.dates})
                
                //update reservation in UI
                commit('updateReservations', data)
                resolve('success')  
            }).catch((e) => {
                reject(e);
            });
        })
    },
    deleteReservation({ commit }, payload) {
        return this.$axios.$post(`deleteReservation/${payload._id}`)
        .then((data) => {
            commit('deleteReservation', data)
            commit('deleteDisabledDate', {from: payload.start.trim(), to:payload.end.trim()})
        }).catch((e) => {
            console.log(e)
        });
    }
}