
export const state = () => ({
   role: ''
});

export const getters  = {
   
};

export const mutations = {
    setUserRole(state, payload) {
        state.role = payload;
    },
    
};

export const actions = {
    checkKeeperHomesCount() {
        return new Promise((resolve, reject) => {
            this.dispatch('userHomes/getActiveHomesCount')
            .then((res) => {
                if(res > 1) {
                    reject('error')
                } else {
                    resolve('success')
                }
            }).catch((e) => {
                reject(e)
            })
        })
    }
}

