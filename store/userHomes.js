
export const state = () => ({
    allMenuHomes: [],
    activeHomes: []
    
});

export const getters  = {
    getActiveHomesLength(state) {
        let sumLength = state.activeHomes.reduce((length, home) => {
        return home[1] == true ? length+=1 : length
            }, 0)
        return sumLength;
    },
    getUserHomes(state) {
        return state.activeHomes;
    }

};

export const mutations = {
    setActiveHomes(state, payload) {
        state.activeHomes = payload;
    }
};

export const actions = {
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

