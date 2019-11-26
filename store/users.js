
export const state = () => ({
    token: '',
    isAdmin: false,
    zeroHomesError: false,
    userName: ''

    
});

export const getters  = {
   
};

export const mutations = {    
    updateUserName(state, payload) {
        state.queriedUser.userName = payload;
    },
    setUserName(state, payload) {
        state.userName = payload;
    }
};

export const actions = {
    getUserData({ commit, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.$get(`/getUser/${payload}`)
                .then((response) => {
                    commit('setUserName', response.userName);
                    this.commit('userRole/setUserRole', response.role);
                    // commit('setOGUserName', response.userName);
                    dispatch('setActiveHomesList', response.homesArray);
                    resolve(response)
                
                })
                .catch((e) => {
                    reject(e)
                });
        })
    },
    setActiveHomesList({ rootState, commit}, payload) {
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
    }


}

