
export const state = () => ({
   activeHomesMenu: [],
   zeroHomesError: false
});

export const getters  = {
   
};

export const mutations = {
    setActiveHomesMenu(state, payload) {
        state.activeHomesMenu = payload;
    },
    updateActiveHomesMenu(state, payload) {
        state.activeHomesMenu.forEach((home) => {
            if(home[0] == payload) {
                home[1] = !home[1];
            }
        })
        //error checking and flag
         let homesCheck = state.activeHomesMenu.filter((home) => {
          return home[1] == true
        })
        if(homesCheck.length == 0) {
          state.zeroHomesError = true;
        } else {
          state.zeroHomesError = false;
        }
    }
};

export const actions = {
    getUserData({ commit, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.$get(`/getUser/${payload}`)
                .then((response) => {
                    dispatch('UTIL_setHomesList', response.homesArray)
                    resolve(response)
                res.send(response)
                })
                .catch((e) => {
                    reject(e)
                });
    })
    },
    UTIL_setHomesList({ rootState, commit}, payload) {
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
        commit('setActiveHomesMenu', tmpAllHomes)
    }


}

