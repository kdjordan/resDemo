import utilities from '@/assets/js/utilities.js'

export const state = () => ({
    indicator: 'Welcome',
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
    initMakeRes(_, payload) {
        return new Promise((resolve, reject) => {
            let homesWithId = []
            this.$axios.$get('getMenuData')
                .then((data) => {
                    data['homes'].forEach(el => {
                        homesWithId.push(el);
                    })
                let userActiveHomesList = utilities.makeActiveUsersHomeList(payload, homesWithId);
                if(userActiveHomesList.length > 0){
                    this.commit('reservation/setUserActiveHomes', userActiveHomesList)
                    this.commit('reservation/setActiveHome', userActiveHomesList[0])
                    resolve(userActiveHomesList[0])
                    
                } else {
                    resolve('no active homes')
                }
            }).catch((e) => {
                console.log(e)
                reject('error')
            });
        })
    },
    initGetRes(_, payload) {
        return new Promise((resolve, reject) => {
            console.log('get res')
            console.log(payload)
            //reset all res data
            
            this.$axios.$get(`/getReservations/${payload}`)
            .then((res) => {  
                if(res == 'none') {
                    console.log('empty')
                    resolve('none')
                } else {
                    console.log('here')
                    res.forEach(el => {
                        this.commit('reservation/setReservations', {
                            _id: el._id,
                            homeName: payload.homeName,
                            madeBy: el.madeBy,
                            madeFor: el.guest,
                            phone: el.phone,
                            start: el.resDates.split('to')[0],
                            end: el.resDates.split('to')[1]
                        })
                        this.commit('reservation/setDisabledDates', {dates: el.resDates});
                    })  
                    this.commit('reservation/setPagedReservations', 0)
                    resolve('success')
                }          
                
            }).catch((e) => {
                this.commit('errors/setAdminError', {status: true, mssg: 'Error Loading Home'})
                reject('error')
            });

        })
    }
};

