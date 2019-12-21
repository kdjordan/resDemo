
export const state = () => ({
    addedResFlag: false,
    userActiveHomes: [],
    activeHome: [],
    disabledDates: [],
    reservations: [],
    pagedReservations: [],
    OGresDates: ''
    
});

export const getters = {
    getActiveHome(state) {
        return state.activeHome;
    },
    getActiveHomes(state) {
        return state.userActiveHomes;
    },
    getActiveHomeName(state) {
        return state.activeHome.homeName;
    },
    getActiveHomeId(state) {
        return state.activeHome._id;
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
    setUserActiveHome(state, payload) {
        state.activeHomes = payload;
    },
    setUserName(state, payload) {
        state.userName = payload;
    },
    setActiveHome(state, payload) {
        state.activeHome = payload
    },
    updateDisabledDates(state, payload) {
        state.disabledDates.forEach(date => {
            if (date.from.trim() == payload.ogStart && date.to.trim() == payload.ogEnd) {
                date.from = payload.from;
                date.to = payload.to;
            }
        })
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
    updateReservationList(state, payload) {
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
    },
    resetReservationState(state) {
        state.addedResFlag = false;
        state.disabledDates = [];
        state.reservations = [];
        state.pagedReservations = [];
        state.OGresDates = '';
        state.activeHome = [];
    }

}

export const actions = {
    updateReservation({ commit, getters }, payload){
        // return new Promise((resolve, reject) => {
            this.$axios.$post(`/updateReservation/${payload.res_id}`, {...payload, token: this.getters['auth/getToken']})
            .then((data) => {
                if(data == 'Invalid Token') {
                    this.dispatch('auth/logoutUser')
                } else {
                    //update reservation List UI
                    commit('updateReservationList', {
                        _id: payload.res_id,
                        homename: getters['getActiveHomeName'],
                        madeBy: this.getters['auth/getUserName'],
                        madeFor: payload.guest,
                        phone: payload.phone,
                        start: payload.start,
                        end: payload.end
                    })
    
                    //update cal UI
                    commit('updateDisabledDates', { from: payload.start, to: payload.end, 
                                                    ogStart: data.resDates.split('to')[0].trim(),
                                                    ogEnd: data.resDates.split('to')[1].trim() })
                }
                
            }).catch((e) => {
                console.log(e)
            });
        // })
    },
    makeReservation({ commit, getters }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.$post
            (`/makeReservation/${getters['getActiveHomeId']}`, {...payload, token: this.getters['auth/getToken']})
            .then((data) => {
                if(data == 'Invalid Token') {
                    this.dispatch('auth/logoutUser')
                } else {
                    this.dispatch('notifications/doNotification', {status: true, mssg: 'Reservation Made'});
                    
                    //update disabled dates for cal display
                    commit('setDisabledDates', {dates: payload.dates});
                    
                    //update reservation in UI
                    commit('setReservationFirst', data);
                    commit('setAddedResFlag', true);
                    this.commit('reservation/setPagedReservations', 0);
                    resolve('success');  
                }
            }).catch((e) => {
                reject(e);
            });
        })
    },
    deleteReservation({ commit }, payload) {
        return this.$axios.$post(`deleteReservation/${payload._id}`, {token: this.getters['auth/getToken']})
        .then((data) => {
            if(data == 'Invalid Token') {
                this.dispatch('auth/logoutUser')
            } else {
                commit('deleteReservation', data)
                commit('deleteDisabledDate', {from: payload.start.trim(), to:payload.end.trim()})
                this.commit('reservation/setPagedReservations', 0)
                return 'success'
            }
        }).catch((e) => {
            console.log(e)
            return 'error'
        });
    },
    reservationCleaned(_, payload){
        console.log(payload)
        
        return this.$axios.$post(`setReservationClean`, payload)
        .then((data) => {
            console.log(data)
        }).catch(() => {

        })
        console.log(payload)

        return true

    }
}