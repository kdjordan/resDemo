import utilities from '@/assets/js/utilities.js'

export const state = () => ({
    indicator: 'Welcome'
})

export const getters = {
    getIndicator(state) {
        return state.indicator
    }
}


export const mutations = {
    setIndicator(state, payload) {
        state.indicator = payload
    }
}

export const actions = {
    loginUser(vuexContext, authData) {
        return new Promise((rersolve, reject) => {
            this.$axios.$post('login', authData)
            .then((res) => {
                const admin = false;
                if(res.data.role == 'admin') {
                    admin = true;
                } 
                const payload = {
                    token: res.data.token,
                    isAdmin: admin
                }
                vuexContext.commit('setUserState', payload);
            }).catch((e) => {
                return Promise.reject(e.response.status);
                
            });
        });
    },
    getUserData({ dispatch }, payload) {
        return new Promise((resolve, reject) => {
            return this.$axios.$get(`/getUser/${payload}`)
                .then((response) => {
                    this.commit('users/setOGUserName', response.userName);
                    this.commit('userRole/setUserRole', response.role);
                    dispatch('setActiveHomesList', response.homesArray);
                    
                    resolve(response)
                })
                .catch((e) => {
                    reject(e)
                });
        })
    },
    getHomeData({ rootState }, payload) {
        return new Promise((resolve, reject) => {
            return this.$axios.$get(`/getHome/${payload}`)
                .then((data) => {
                    let homeUpdateUsersList = utilities.makeTFArray(data.homeName, rootState.sidenav.usersMenu)
                    this.commit('userHomes/setHomeUpdateUsersList', homeUpdateUsersList)
                    this.commit('userHomes/setQueriedHome', data)
                    
                    resolve()
                
                })
                .catch((e) => {
                    reject(e)
                });
        })
    },
    setActiveHomesList({ rootState }, payload) {
        let tmpAllHomes = []
        rootState.sidenav.homesMenu.forEach(home => {
            tmpAllHomes.push([home.homeName, false])
        });
        payload.forEach((home) => {
          tmpAllHomes.forEach((tmpHome) => {
            if(home == tmpHome[0]) {
              tmpHome[1] = true;
            }
          })
        })
        this.commit('userHomes/setActiveHomes', tmpAllHomes)
    },
    initAddUser({ rootState }) {
            let tmpAllHomes = []
            rootState.sidenav.homesMenu.forEach(home => {
                tmpAllHomes.push([home.homeName, false])
            });
            this.commit('userHomes/setActiveHomes', tmpAllHomes);
            this.commit('userHomes/resetQueriedHome');
            this.commit('userRole/resetRole');
            this.commit('users/resetUser');
            this.commit('errors/resetErrors');
    },
    initMakeRes({ dispatch }, payload) {

        return new Promise((resolve, reject) => {
            let userHomes = [];
            let homesWithId = []
            dispatch('getUserData', payload)
                .then((data) => {
                    data.homesArray.forEach(el => {
                        userHomes.push(el)
                    })
                }).catch((e) => {
                    console.log(e)
                })
            this.$axios.$get('getMenuData')
                .then((data) => {
                    data['homes'].forEach(el => {
                        homesWithId.push(el);
                    })
                }).catch(() => {

                });
            let userActiveHomesList = utilities.makeActiveUsersHomeList(userHomes, homesWithId);
            
            
        })
    }

};

