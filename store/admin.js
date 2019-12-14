import utilities from '@/assets/js/utilities.js'

export const state = () => ({
    indicator: 'Welcome',
    token: '',
    isAdmin: false,
    
})

export const getters = {
    getIndicator(state) {
        return state.indicator
    },
    getToken(state){
        return state.token;
    },
    getIsAdmin(state) {
        return state.isAdmin;
    },
}
export const mutations = {
    setIndicator(state, payload) {
        state.indicator = payload
    },
    setIsAdmin(state, payload) {
        state.isAdmin = payload;
    },
    setToken(state, payload) {
        state.token = payload;
    },
}

export const actions = {
    loginUser({ commit }, authData) {
        console.log('incoming')
        return new Promise((resolve, reject) => {
            this.$axios.$post('login', authData)
            .then((res) => {
                if(res.data.role == 'admin') {
                    commit('setIsAdmin', true)
                    commit('settToken', res.data.token)
                } 
                resolve('success')
            }).catch((e) => {
                console.log(e)
                reject('error')
                
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
    },
    initMakeRes({ dispatch }, payload) {
        return new Promise((resolve, reject) => {
            let homesWithId = []
            this.$axios.$get('getMenuData')
                .then((data) => {
                    data['homes'].forEach(el => {
                        homesWithId.push(el);
                    })
            let userActiveHomesList = utilities.makeActiveUsersHomeList(payload, homesWithId);
            this.commit('reservation/setUserActiveHomes', userActiveHomesList)
            resolve('success')
            }).catch((e) => {
                console.log(e)
                reject('error')
            });
        })
    },
    initGetRes(_, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.$get('/getReservations/5d92cd781c9d4400004c897a')
            .then((res) => {            
                    res.forEach(el => {
                        this.commit('reservation/setReservations', {
                            _id: el._id,
                            homeName: 'sunriver',
                            madeBy: 'user1',
                            madeFor: el.guest,
                            phone: el.phone,
                            start: el.resDates.split('to')[0],
                            end: el.resDates.split('to')[1]
                        })
                        this.commit('reservation/setDisabledDates', {dates: el.resDates});
                    })  
                this.commit('reservation/setPagedReservations', 0)
                resolve('success')
                
            }).catch((e) => {
                this.commit('errors/setAdminError', {status: true, mssg: 'Error Loading Home'})
                reject('error')
            });

        })
    }
};

