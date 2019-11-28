
export const state = () => ({
   role: ''
});

export const getters  = {
   getUserRole() {
       return state.role;
   }
};

export const mutations = {
    setUserRole(state, payload) {
        state.role = payload;
    },
    resetRole(state) {
        state.role = ''
    }
};

export const actions = {
    updateRole({ rootGetters }, payload) {
        if(payload == 'keeper' && rootGetters['userHomes/getActiveHomesLength'] > 1) {
            this.commit('errors/setRoleError', {status: true, mssg: 'Keppers Limited to 1 Home'});
        } else {
            this.commit('errors/setRoleError', {status: false, mssg: ''});
            this.commit('errors/setHomesError', {status: false, mssg: ''});
        }

        if(rootGetters['userHomes/getActiveHomesLength'] == 0) {
            this.commit('errors/setHomesError', {status: true, mssg: 'You Must Select a Home'});
        }
    }
}

