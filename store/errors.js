
export const state = () => ({
   userNameError: false,
   userNameErrorMssg: 'userNameError',
   passwordError: false,
   passwordErrorMssg: 'passwordError',
   homesError: false,
   homesErrorMssg: 'homeError',
   roleError: false,
   roleErrorMssg: 'roleError'
   
});

export const getters  = {
    getErrorState(state) {
        if(state.passwordError || state.userNameError || state.roleError || state.homesError) {
            return true;
        } else {
            return false;
        }
    },
    getErrorMssg(state) {
        if(state.userNameError){
            return state.userNameErrorMssg;
        } else if(state.passwordError){
            return state.passwordErrorMssg;
        } else if (state.roleError){
            return state.roleErrorMssg;
        } else if (state.homesError) {
            return state.homesErrorMssg;
        } else {return ''}
    },
    getUserNameError(state) {
        return state.userNameError;
    },
    getPasswordError(state) {
        return state.passwordError;
    },
    getRoleError(state) {
        return state.roleError;
    },
    getHomesError(state) {
        return state.homesError;
    },
    getUserNameErrorMssg(state) {
        if(state.userNameError) {
            return state.userNameErrorMssg;
        }
    },
    getPasswordErrorMssg(state) {
        if(state.passwordError) {
            return state.passwordErrorMssg; 
        }
        
    }
};

export const mutations = {
   setUserNameError(state, payload) {
        state.userNameErrorMssg = payload.mssg;
        state.userNameError = payload.status;
   },
   setPasswordError(state, payload) {
        state.passwordErrorMssg = payload.mssg;
        state.passwordError = payload.status;
    },
    setHomesError(state, payload) {
        state.homesErrorMssg = payload.mssg;
        state.homesError = payload.status;
    },
    setRoleError(state, payload) {
        state.roleErrorMssg = payload.mssg;
        state.roleError = payload.status
    }
};

export const actions = {
    
}

