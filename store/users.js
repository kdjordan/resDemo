import bcrypt from 'bcryptjs';

export const state = () => ({
    token: '',
    isAdmin: false,
    ogUserName: '',
    updatedName: '',
    updatedPassword: ''

    
});

export const getters  = {
    getUpdatedName(state) {
        return state.updatedName;
    },
    getUpdatedPassword(state) {
        return state.updatedPassword;
    }
};

export const mutations = {    
    setUserName(state, payload) {
        state.updatedName = payload;
    },
    setUserPassword(state, payload) {
        state.updatedPassword = payload;
    },
    setOGUserName(state, payload) {
        state.ogUserName = payload;
    },
    resetUser(state) {
        console.log('called reset')
        state.ogUserName = '',
        state.updatedName = '',
        state.updatedPassword = ''
    }
};

export const actions = {
    addUser( _ , payload) {
        return new Promise((resolve, reject) => {
            //salt and encrypt userPassword before posting to API
            console.log(payload)
            let salt = bcrypt.genSaltSync(10);
            payload.userPassword = bcrypt.hashSync(payload.userPassword, salt)
            console.log(payload.userPassword)
            let keeperFlag = false;
            if(payload.role == 'keeper') { keeperFlag = true}
            return this.$axios.$post(`/addUser/`, payload)
                .then((response) => {
                    if(keeperFlag == true) {
                        this.commit('sidenav/addKeeper', response) 
                    } else {
                        this.commit('sidenav/addUser', response);
                    }
                    resolve('success')
                    
                })
                .catch((e) => {
                    console.log(e);
                    reject(e);
                });
        })

    },
    deleteUser(_, payload) {
        return new Promise((resolve, reject) => {
            return this.$axios.$post(`/deleteUser/${payload}`)
                .then((res) => {
                    this.commit('sidenav/removeUser', res)
                    resolve('success')
                })
                .catch((e) => {
                    console.log(e);
                    reject(e);
                });
        });
    },
    

}

