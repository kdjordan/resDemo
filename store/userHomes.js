
export const state = () => ({
    allMenuHomes: [],
    activeHomes: [],
    queriedHome:[]
    
});

export const getters  = {
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
    } 

};

export const mutations = {
    setActiveHomes(state, payload) {
        state.activeHomes = payload;
    },
    setQueriedHome(state, payload) {
        console.log('setting home')
        state.queriedHome = payload;
    },
    resetQuerierdHome(state) {
        state.queriedHome = []
    }
};

export const actions = {
    addHome(_, payload) {
        console.log(payload)
    },
    deleteHome(_, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.$post(`/deleteHome/${payload}`)
            .then((res) => {
                this.commit('sidenav/removeHome', res)
                this.commit('resetQuerierdHome')
                resolve({status: 'success', role: null})
                
            })
            .catch((e) => {
                console.log(e)
            });
        })
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
    }
    
}

