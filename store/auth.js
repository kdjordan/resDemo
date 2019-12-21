
export const state = () => ({
    token: null,
    isAdmin: false,
    user_id: null,
    userName: null,
    role: null,
    loggedIn: false

})

export const getters  = {
    getToken(state){
        return state.token;
    },
    getIsAdmin(state) {
        return state.isAdmin;
    },
    hasToken(state) {
        return state.token != null;
    },
    getUserName(state) {
        return state.userName;
    },
    getUserId(state) {
        return state.user_id;
    },
    getLoggedIn(state) {
        return state.loggedIn;
    },
    getUserRole(state) {
        return state.role;
    }
};

export const mutations = {    
    setLoggedIn(state, payload) {
        state.loggedIn = payload
    },
    setUser(state, payload) {
        state.user_id = payload._id;
        state.userName = payload.userName;
        state.role = payload.role;
    },
    setIsAdmin(state, payload) {
        state.isAdmin = payload;
    },
    setToken(state, payload) {
        state.token = payload;
    },
    clearToken(state) {
       state.token = null;
    },
    resetUser(state) {
        state.isAdmin = false;
        state.user_id = null;
        state.userName = null;
        state.role = null;
    }
};

export const actions = {
    loginUser({ commit, dispatch }, authData) {
        console.log('called in auth')
        return new Promise((resolve, reject) => {
            this.$axios.$post('login', authData)
            .then((res) => {
                console.log('back')
                console.log(res)
                if(res == 'invalid') {
                    reject('invalid')
                    return;
                }
                if(res.homesArray.length == 0) {
                    reject('No Active Homes')
                } else {
                    this.commit('reservation/resetReservationState')
                    //need to set up userActiveHomes
                    dispatch('setReservationState', res)
                        .then(() => {
                            commit('setUser', res);
                            commit('setLoggedIn');
                            commit('setToken', res.token);

                            if(res.role == 'admin') {
                                commit('setIsAdmin', true);
                                localStorage.setItem('isAdmin', true);
                            } 

                            if(process.client) {
                                localStorage.setItem('userState', JSON.stringify(res));
                                localStorage.setItem('token', res.token);
                                localStorage.setItem('tokenExpiration', new Date().getTime() + res.expires * 1000);
                            }

                            if(res.role == 'keeper') {
                                resolve('keeper')
                            }
                            resolve('success')
                        }).catch((r) => {
                            reject(e);
                        });
        
                    dispatch('setLogoutTimer', res.expires * 1000)
                
                }
            }).catch((e) => {
                console.log(e)
                reject('error')
                
            });
        });
    },
    async setReservationState({ commit }, payload) {
        try {
            let firstActiveHome = await this.dispatch('admin/initMakeRes', payload.homesArray);
            //get reservations for first home in activeHomes
            let ans = await this.dispatch('admin/initGetRes', firstActiveHome._id)
            if(ans != 'success') {
                this.loadingError = true;
                return 'error'
            }
            return 'success'
        } catch(err) {
            return 'noActive'
            console.log(err)
        }
        
                
    },
    logoutUser({ commit}) {
        commit('clearToken')
        commit('resetUser');
        this.commit('reservation/resetReservationState')
        if(process.client){
            localStorage.clear();
        }
        $nuxt._router.push('/')
    },
    //called from middelware to protect rereshes 
    initAuth({ commit, dispatch }) {
       
        const token = localStorage.getItem('token');
        const expirationDate = localStorage.getItem('tokenExpiration');
        const isAdmin = localStorage.getItem('isAdmin')
        const userId = localStorage.getItem('userId')

        if(new Date().getTime() > +expirationDate || !token){
            return;
        }
        commit('setToken', token)
        commit('setIsAdmin', isAdmin)
        dispatch('setLogoutTimer', +expirationDate - new Date().getTime())
    },
    async getLocalStorage({dispatch, commit, getters}) {
        return new Promise((resolve, reject) => {
            if(window.localStorage.length > 0) {
                
                commit('setUser', JSON.parse(window.localStorage.userState))
                
                dispatch('setReservationState', {homesArray: JSON.parse(window.localStorage.userState).homesArray})
                .then((res) => {
                    if(getters['getUserRole'] == 'keeper' && res == 'success') {
                        resolve({role: 'keeper', id: this.getters['reservation/getActiveHomeId']})
                    }
                    if(res == 'success'){
                        resolve ({role: 'user', id: this.getters['reservation/getActiveHomeId']})
                    } else {
                        reject('error setting reservation state')
                    }
                }).catch((e) => {
                    console.log(e)
                    reject(e)
                });
            } else {
                resolve('noLocal')
            }

        })
    },
    setLogoutTimer({ dispatch }, duration) {
        setTimeout(() => {
            console.log('clearing token')
            dispatch('logoutUser')
        }, duration)
    }

}