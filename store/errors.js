
export const state = () => ({
    adminError: false,
    adminErrorMssg: '',
    userNameError: false,
    userNameErrorMssg: '',
    passwordError: false,
    passwordErrorMssg: '',
    homesError: false,
    homesErrorMssg: '',
    roleError: false,
    roleErrorMssg: '',
    initUserNameError: true,
    initPasswordError: true,
    initHomesError: true,
    initRoleError: true
});

export const getters  = {
    getErrorState(state) {
        if(state.passwordError || state.userNameError 
            || state.roleError || state.homesError 
            || state.adminError|| state.guestEmptyError
            || state.phoneEmptyError) {
            return true;
        } else {
            return false;
        }
    },
    gettInitAddErrorState(state){
        if(state.initUserNameError || state.initPasswordError 
            || state.initHomesError || state.initRoleError) {
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
        } else if(state.adminError) {
            return state.adminErrorMssg;
        }  else {return ''}
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
    setAdminError(state, payload) {
        state.adminErrorMssg = payload.mssg;
        state.adminError = payload.status;
    },
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
    },
    setInitUserNameFalse(state) {
       state.initUserNameError = false;
    },
    setInitPasswordFalse(state) {
        state.initPasswordError = false;
     },
    setInitHomesFalse(state) {
        state.initHomesError = false;
     },
    setInitRoleFalse(state) {
        state.initRoleError = false;
     }
};

export const actions = {
    
}

