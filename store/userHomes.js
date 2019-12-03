import { thistle } from "color-name";

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
        state.queriedHome = payload;
    },
    resetQueriedHome(state) {
        state.queriedHome = []
    }
};

export const actions = {
    addHome({ dispatch }, payload) {
        return new Promise((resolve, reject) => {
            dispatch('updateUserHomesById', {activeUsers: payload.activeUsers, homeName: payload.homeName});
            this.$axios.$post('/addHome/', {homeName: payload.homeName, homeUrl: null})
            .then((res) => {
                this.commit('sidenav/addHome', res);
                this.dispatch('notifications/doNotification', {status: true, mssg: 'Home Added'});
                resolve('success')
            }).catch((e) => {
                console.log(e)
                reject(e)
            });
        })
    },
    deleteHome({ commit }, payload) {
        return new Promise((resolve, reject) => {
            this.$axios.$post(`/deleteHome/${payload._id}`)
            .then((res) => {
                this.commit('sidenav/removeHome', res);
                this.dispatch('notifications/doNotification', {status: true, mssg: 'Home Deleted'});
                commit('resetQueriedHome');
                resolve('success');
            })
            .catch((e) => {
                console.log(e)
                reject(e);
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
    },
    updateUserHomesById(_, payload) {
        payload.activeUsers.forEach(user => {
           this.commit('sidenav/addUserHomeToArray', {_id: user._id, userName: user.userName, homeName: payload.homeName})
        })
    }
    
}

