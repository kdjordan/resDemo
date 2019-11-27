
export const state = () => ({
    token: '',
    isAdmin: false,
    ogUserName: '',
    updatedName: '',
    updatedPassword: ''

    
});

export const getters  = {
   
};

export const mutations = {    
    updateUserName(state, payload) {
        state.newUserName = payload;
    },
    updateUserPassword(state, payload) {
        state.updatedPassword = payload;
    },
    setOGUserName(state, payload) {
        state.ogUserName = payload;
    }
};

export const actions = {
    

}

