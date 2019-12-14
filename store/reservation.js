
export const state = () => ({
    addedResFlag: false,
    queriedHome: [],
    disabledDates: [],
    userId: '5de8642c5f528290b0f95fc3',
    userActiveHomes: [],
    reservations: [],
    pagedReservations: [],
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
        let newArr =  state.reservations
        return newArr;
    },
    getPagedReservations(state) {
        return state.pagedReservations;
    },
    getUserId(state) {
        return state.userId
    },
    getOGresDates(state) {
        return state.OGresDates;
    },
    getActiveUserHomes(state) {
        return state.userActiveHomes;
    },
    getAddedResFlag(state) {
        return state.addedResFlag
    }
}

export const mutations = {
    setAddedResFlag(state, payload) {
        state.addedResFlag = payload;   
    },
    setPagedReservations(state, payload) {
        let data = [...state.reservations]
        let index = payload * 5;
        let returnArr = []
        for(let i = index ; (i < index + 5 && i < state.reservations.length) ; i++){
            returnArr.push(data[i])
        }
        state.pagedReservations = returnArr;
        return state.pagedReservations;
    },
    setReservations(state, payload){
        state.reservations.push(payload)
        state.numPages = state.reservations.length / 5
    },
    setReservationFirst(state, payload){
        state.reservations.unshift(payload)
        state.numPages = state.reservations.length / 5
    },
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
                resolve('success')  
                this.dispatch('notifications/doNotification', {status: true, mssg: 'Reservation Made'});
                
                //update disabled dates for cal display
                commit('setDisabledDates', {dates: payload.dates})
                
                //update reservation in UI
                commit('setReservationFirst', data)
                commit('setAddedResFlag', true)
                this.commit('reservation/setPagedReservations', 0)
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
            this.commit('reservation/setPagedReservations', 0)
            return 'success'
        }).catch((e) => {
            console.log(e)
            return 'error'
        });
    }
}