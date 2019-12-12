import utilities from '@/assets/js/utilities.js'
import { ESRCH } from 'constants';


export const state = () => ({
    queriedHome: [],
    disabledDates: [],
    userId: '5de8642c5f528290b0f95fc3',
    userActiveHomes: [],
    reservations: [],
    OGresDates: ''
    
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
    },
    getOGresDates(state) {
        return state.OGresDates;
    }
}

export const mutations = {
    setOGresDates(state, payload) {
        let theRes = state.reservations.filter(res => res._id == payload)
        state.OGresDates = {from: theRes[0].start, to: theRes[0].end}
    },
    setUserActiveHomes(state, payload) {
        state.userActiveHomes = payload;
    },
    setUserId(state, payload) {
        state.userId = payload;
    },
    setQueriedHome(state, payload) {
        state.queriedHome = payload
    },
    updateDisabledDates(state, payload) {
        state.disabledDates.forEach(date => {
            if (date.from.trim() == payload.ogStart && date.to.trim() == payload.ogEnd) {
                date.from = payload.from;
                date.to = payload.to;
            }
        })
        // state.disabledDates = payload;
    },
    setDisabledDates(state, payload) {
        let update = {from: payload.dates.split('to')[0].trim(), to: payload.dates.split('to')[1].trim()};
        state.disabledDates.push(update)
    },
    deleteDisabledDate(state, payload) {
        state.disabledDates.forEach(res => {
            if(res.from.trim() == payload.from) {
                state.disabledDates.splice( state.disabledDates.indexOf(res), 1 );
            }
        })
    },
    setReservations(state, payload){
        state.reservations.push(payload)
    },
    updateReservation(state, payload) {
        state.reservations.forEach(res => {
            if (res._id == payload._id) {
                res._id = payload._id;
                res.homeName = payload.homeName;
                res.madeBy = payload.madeBy;
                res.madeFor = payload.madeFor;
                res.phone = payload.phone;
                res.start = payload.start;
                res.end = payload.end;
            }
        })
        
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
    updateReservation({ commit, dispatch }, payload){
        return new Promise((resolve, reject) => {
            this.$axios.$post(`/updateReservation/${payload.res_id}`, payload)
            .then((data) => {
                
                //update reservation List UI
                commit('updateReservation', {
                    _id: payload.res_id,
                    homename: 'sunriver',
                    madeBy: 'user1',
                    madeFor: payload.guest,
                    phone: payload.phone,
                    start: payload.start,
                    end: payload.end
                })

                //update cal UI
                commit('updateDisabledDates', { from: payload.start, to: payload.end, 
                                                ogStart: data.resDates.split('to')[0].trim(),
                                                ogEnd: data.resDates.split('to')[1].trim() })
                
            }).catch((e) => {
                console.log(e)
            });
        })
    },
    makeReservation({ state, commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.$post
            (`/makeReservation/${state.userId}`, {...payload, homeId: state.userActiveHomes[0]._id})
            .then((data) => {
                this.dispatch('notifications/doNotification', {status: true, mssg: 'Reservation Made'});
                
                //update disabled dates for cal display
                commit('setDisabledDates', {dates: payload.dates})
                
                //update reservation in UI
                commit('setReservations', data)
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