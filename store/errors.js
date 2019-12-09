
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
    guestEmptyError: false,
    guestEmptyErrorMssg: '',
    phoneEmptyError: false,
    phoneEmptyErrorMssg: '',
    initUserNameError: true,
    initPasswordError: true,
    initHomesError: true,
    initRoleError: true
});

export const getters  = {
    getErrorState(state) {
        if(state.passwordError || state.userNameError || state.roleError || state.homesError || state.adminError) {
            return true;
        } else {
            return false;
        }
    },
    gettInitAddErrorState(state){
        if(state.initUserNameError || state.initPasswordError || state.initHomesError || state.initRoleError) {
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
        } else if(state.guestEmptyError) {
            return state.guestEmptyErrorMssg;
        } else if(state.phoneEmptyError) {
            return state.phoneEmptyErrorMssg;



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
    getGuestEmptyError(state) {
        return state.guestEmptyError;
    },
    getPhoneEmptyError(state) {
        return state.phoneEmptyError;
    },
    getHomesError(state) {
        return state.homesError;
    },
    getInitAddError(state) {
        return state.initAddError;
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
     },
    resetErrors(state) {
        state.adminError =  false,
        state.userNameError = false,
        state.userNameErrorMssg = '',
        state.passwordError = false,
        state.passwordErrorMssg = '',
        state.homesError = false,
        state.homesErrorMssg = '',
        state.roleError = false,
        state.roleErrorMssg = '',
        state.initUserNameError = true,
        state.initPasswordError = true,
        state.initHomesError = true,
        state.initRoleError = true
    }
};

export const actions = {
    
}

