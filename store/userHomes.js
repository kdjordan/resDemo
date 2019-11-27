
export const state = () => ({
    allMenuHomes: [],
    activeHomes: [],
    userHomes:[]
});

export const getters  = {
   
};

export const mutations = {
    setActiveHomes(state, payload) {
        state.activeHomes = payload;
    }
};

export const actions = {
    updateActiveHomes({ state, dispatch, rootState }, payload) {
        return new Promise((resolve, reject) => {
            state.activeHomes.forEach((home) => {
                if(home[0] == payload) {
                    home[1] = !home[1];
                }
            })
            dispatch('getActiveHomesCount').then((res) => {
                if(res == 'error') {
                    reject('home-error');
                } else if(rootState.userRole.role == 'keeper' && res > 1){
                    reject('role-error')
                } else {
                    resolve();
                }
            }).catch((e) => {
                reject()
            });
        })
    },
    getActiveHomesCount({ state }) {
        return new Promise((resolve, reject) => {
            let homesCheck = state.activeHomes.filter((home) => {
                 return home[1] == true;
             })
             if(homesCheck.length != 0) {
                 resolve(homesCheck.length)
             } else {
                 reject('error')
             }
        })
    }
}

