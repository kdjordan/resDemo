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
    },
    getOGuserName(state) {
        return state.ogUserName;
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
        state.ogUserName = '';
        state.updatedName = '';
        state.updatedPassword = '';
        console.log('after reset')
        console.log(state.ogUserName)
        console.log(state.updatedName)
        console.log(state.updatedPassword)
    }
};

export const actions = {
    addUser( _ , payload) {
        return new Promise((resolve, reject) => {
            //salt and encrypt userPassword before posting to API
            let salt = bcrypt.genSaltSync(10);
            payload.userPassword = bcrypt.hashSync(payload.userPassword, salt)
            let keeperFlag = false;
            if(payload.role == 'keeper') {
                keeperFlag = true
            }
            return this.$axios.$post(`/addUser/`, payload)
                .then((data) => {
                    if(keeperFlag) {
                        this.commit('sidenav/addKeeper', {_id: data._id, keeperName: data.userName})
                        resolve('success');
                       } else {
                        this.commit('sidenav/addUser', {_id: data._id, userName:data.userName })
                        resolve('success');
                       }  
                })
                .catch((e) => {
                    console.log(e);
                    reject(e);
                });
        })

    },
    deleteUser(_, payload) {
        return new Promise((resolve, reject) => {
            let keeperFlag = false;
            if(payload.role == 'keeper') {
                keeperFlag = true;
            }
            this.$axios.$post(`/deleteUser/${payload._id}`)
                .then((res) => {
                    if(keeperFlag) {
                        console.log('removing keeper')
                        this.commit('sidenav/removeKeeper', res)
                        this.dispatch('notifications/doNotification', {status: true, mssg: 'Keeper Deleted'})
                        resolve({status: 'success', role: 'keeper'})
                    } else {
                        this.commit('sidenav/removeUser', res)
                        this.dispatch('notifications/doNotification', {status: true, mssg: 'User Deleted'})
                        resolve({status: 'success', role: 'user'})
                    }
                    resolve({status: 'success', role: 'user'})
                })
                .catch((e) => {
                    console.log(e);
                    reject(e);
                });
        });
    },
    updateUser({dispatch, commit}, payload) {
        return new Promise((resolve, reject) => {
            dispatch('formatUpdatedUser', payload);
            //salt and encrypt userPassword before posting to API
            if(payload.userPassword != '') {
                let salt = bcrypt.genSaltSync(10);
                payload.userPassword = bcrypt.hashSync(payload.userPassword, salt)
            } 
            let keeperFlag = false;
            if(payload.role == 'keeper') {
                keeperFlag = true
            }
            this.$axios.$post(`/updateUser/${payload.userid}`, payload)
                .then((data) => {
                   if(keeperFlag) {
                    this.commit('sidenav/removeUser', data._id)
                    this.commit('sidenav/addKeeper', {_id: data._id, keeperName: data.userName})
                   } else {
                    resolve('success');
                   }
                })
                .catch((e) => {
                    console.log(e);e
                    reject(e);
                });
        })
    },
    formatUpdatedUser(_, payload) {
        if(payload.userName.length < 2) { 
            payload.userName = "";
            
        }
        if(payload.userPassword == undefined) { 
            payload.userPassword = "";
            
        } else if(payload.userPassword.length < 2) {
            payload.userPassword = "";
        }
    }
    

}

