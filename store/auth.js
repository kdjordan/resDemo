
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
        return new Promise((resolve, reject) => {
            this.$axios.$post('login', authData)
            .then((res) => {
                if(res == 'invalid') {
                    resolve('invalid')
                } else {
                    this.commit('reservation/resetReservationState')
                    //need to set up userActiveHomes
                    dispatch('setReservationState', res)
                    commit('setUser', res)
                    commit('setLoggedIn',)
                    commit('setToken', res.token)
                    if(res.role == 'admin') {
                        commit('setIsAdmin', true)
                    } 
        //set localStorage for persistence
                    if(process.client) {
                        localStorage.setItem('token', res.token)
                        localStorage.setItem('tokenExpiration', new Date().getTime() + res.expires * 1000)
                        localStorage.setItem('userId', res._id)
                        if(res.role == 'admin'){
                            localStorage.setItem('isAdmin', true)
                        } else {
                            localStorage.setItem('isAdmin', false)
                        }
                    }
                    dispatch('setLogoutTimer', res.expires * 1000)
                    //respond with activehome #1
                    resolve('success')
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
            }
        } catch(err) {
            console.log(err)
        }
        
                
    },
    logoutUser({ commit}) {
        commit('clearToken')
        commit('resetUser');
        this.commit('reservation/resetReservationState')
        if(process.client){
            localStorage.removeItem('token')
            localStorage.removeItem('tokenExpiration')
            localStorage.removeItem('isAdmin')
            localStorage.removeItem('userId')  
        }
    },
    //called from middelware to protect rereshes 
    initAuth({ commit, dispatch,state }) {
        // console.log('initing user')
        // console.log(localStorage)
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
    setLogoutTimer({ commit }, duration) {
        setTimeout(() => {
            console.log('clearing token')
            commit('clearToken')
        }, duration)
    }

}