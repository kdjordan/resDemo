import utilities from '@/assets/js/utilities.js'

export const state = () => ({
    allMenuHomes: [],
    activeHomes: [],
    queriedHome:[],
    homeUpdateUsersList: []
    
    
});

export const getters  = {
    getActiveHomes(state) {
        return state.activeHomes
    },
    getActiveHomesLength(state) {
        let sumLength = state.activeHomes.reduce((length, home) => {
            return home[1] == true ? length+=1 : length
        }, 0)
        return sumLength;
    },
    getUpdatedHomes(state) {
        let flatHomesArr = [];
        state.activeHomes.forEach((home) => {
            if(home[1] == true) {
                flatHomesArr.push(home[0])
            }
        })
        return flatHomesArr;
    },
    getQueriedHomeName(state) {
        return state.queriedHome.homeName;
    },
    getHomeUpdateUsersList(state) {
        return state.homeUpdateUsersList;
    }

};

export const mutations = {
    setActiveHomes(state, payload) {
        state.activeHomes = payload;
    },
    setQueriedHome(state, payload) {
        state.queriedHome = payload;
    },
    resetQueriedHome(state) {
        state.queriedHome = []
    },
    setHomeUpdateUsersList(state, payload) {
        // console.log(payload)
        state.homeUpdateUsersList = payload
    },
    updateHomesUsersList(state, payload) {
        let updatedUsersList = []
         state.homeUpdateUsersList.forEach((home) => {
            if(home.userName == payload) {
                home.isActive = ! home.isActive
                updatedUsersList.push(home)
            } else {
                updatedUsersList.push(home)
            }
        })
        state.homeUpdateUsersList = updatedUsersList;
    },
    addNewUserHomesUserList(state, payload) {
        state.homeUpdateUsersList = [...state.homeUpdateUsersList, payload]
    }

};

export const actions = {
    addHome({ dispatch, rootState }, payload) {
        return new Promise((resolve, reject) => {
            
            dispatch('addUserHomeToArray', {activeUsers: payload.activeUsers, homeName: payload.homeName});
            const userUpdateArr = utilities.getActiveUsersHomesArrays(payload.activeUsers, rootState.sidenav.usersMenu)
           
            // before adding newHome to DB make sure active Users of Home are updated and in sync
            this.$axios.$post('/addHome/', {homeName: payload.homeName, homeUrl: null, activeUsersArr: userUpdateArr, token: this.getters['auth/getToken']})
            .then((res) => {
                if(res == 'Invalid Token') {
                    this.dispatch('auth/logoutUser')
                }
                this.commit('sidenav/addHome', res);
                this.dispatch('notifications/doNotification', {status: true, mssg: 'Home Added'});
                this.commit('userHomes/resetQueriedHome');
                resolve('success')
            }).catch((e) => {
                console.log(e)
                reject(e)
            });
        })
    },
    updateHome({ rootState, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            
            dispatch('addUserHomeToArray', {activeUsers: payload.activeUsers, homeName: payload.homeName});
            dispatch('subtractUserHomeFromArray', {activeUsers: payload.inActiveUsers, homeName: payload.homeName});
            let allUsersUpdate = [...payload.activeUsers, ...payload.inActiveUsers];
            
            this.$axios.$post((`/updateHome/${payload._id}`), {homeName: payload.homeName, homeUrl: null, activeUsersArr: allUsersUpdate, token: this.getters['auth/getToken']})
            .then((res) => {
                if(data == 'Invalid Token') {
                    this.dispatch('auth/logoutUser')
                } else {
                    this.dispatch('notifications/doNotification', {status: true, mssg: 'Home Updated'});
                    this.commit('sidenav/updateHome', {_id:payload._id, homeName: payload.homeName});
                    resolve('success')

                }
            }).catch((e) => {
                console.log(e)
                reject(e)
            });
        })
    },
    deleteHome({ commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.$post(`/deleteHome/${payload._id}`, {token: this.getters['auth/getToken']})
            .then((res) => {
                if(res == 'Invalid Token') {
                    this.dispatch('auth/logoutUser')
                } else {
                    this.commit('sidenav/removeHome', res);
                    this.dispatch('notifications/doNotification', {status: true, mssg: 'Home Deleted'});
                    commit('resetQueriedHome');
                    resolve('success');
                }
            })
            .catch((e) => {
                console.log(e)
                reject(e);
            });
        })
    },
    updateHomesUsersListByCommit({state, commit}, payload) {
        commit('updateHomesUsersList', payload)

    },
    updateActiveHomes({ state, getters, commit, rootState }, payload) {
            let newActive = []
            state.activeHomes.forEach((home) => {
                if(home[0] == payload) {
                    home[1] = !home[1];
                    newActive.push(home)
                } else {
                    newActive.push(home)
                }
            })
            commit('setActiveHomes', newActive);

            if(getters.getActiveHomesLength == 0) {
                this.commit('errors/setHomesError', {status: true, mssg: 'You Must Select a Home'});
            } else if(rootState.userRole.role == "keeper" && getters.getActiveHomesLength > 1){
                this.commit('errors/setHomesError', {status: true, mssg: 'Keepers Limitted to 1 Home'});
            }
            else {
                this.commit('errors/setHomesError', {status: false, mssg: ''})
                this.commit('errors/setRoleError', {status: false, mssg: ''});
            }
    },
    addUserHomeToArray(_, payload) {
        payload.activeUsers.forEach(user => {
           this.commit('sidenav/addUserHomeToArray', {_id: user._id, userName: user.userName, homeName: payload.homeName})
        })
        return;
    },
    subtractUserHomeFromArray(_, payload) {
        payload.activeUsers.forEach(user => {
           this.commit('sidenav/subtractUserHomeFromArray', {_id: user._id, userName: user.userName, homeName: payload.homeName})
        })
        return;
    }
    
}

