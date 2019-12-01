

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
    getHomeData({ dispatch }, payload) {
        return new Promise((resolve, reject) => {
            return this.$axios.$get(`/getHome/${payload}`)
                .then((data) => {
                    console.log(data)
                    this.commit('userHomes/setQueriedHome', data)
                    // this.commit('users/setOGUserName', response.userName);
                    // this.commit('userRole/setUserRole', response.role);
                    // dispatch('setActiveHomesList', response.homesArray);
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
            this.commit('userRole/resetRole');
            this.commit('users/resetUser');
            this.commit('errors/resetErrors');
            

    }

};

