
export const state = () => ({
   
});

export const getters  = {
   
};

export const mutations = {
  
};
export const actions = {
    checkUserForUpdate({ rootState }, payload) {
        return new Promise((resolve, reject) => {
            if(payload.userName == "") {
                resolve("success")
            } else {
                reject('fail')
            }

        })
    },
    getUserData({ commit, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.$get(`/getUser/${payload}`)
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
    }

};

