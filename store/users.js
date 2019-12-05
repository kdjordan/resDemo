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
    }
};

export const actions = {
    addUser( _, payload) {
        return new Promise((resolve, reject) => {
            //salt and encrypt userPassword before posting to API
            let salt = bcrypt.genSaltSync(10);
            payload.userPassword = bcrypt.hashSync(payload.userPassword, salt)
            this.$axios.$post(`/addUser/`, payload)
                .then((data) => {
                    if(data.role == 'keeper') {
                        this.commit('sidenav/addKeeper', {_id: data._id, keeperName: data.userName})
                        this.dispatch('notifications/doNotification', {status: true, mssg: 'Keeper Added'})
                        resolve('success')
                    } else {
                        this.commit('userHomes/addNewUserHomesUserList', {...data, homesArray: payload.homesArray, isActive: true})
                        this.commit('sidenav/addUser', {_id: data._id, userName:data.userName, homesArray: payload.homesArray })
                        this.dispatch('notifications/doNotification', {status: true, mssg: 'User Added'});
                        this.dispatch('admin/initAddUser')
                        this.commit('errors/resetErrors')
                        resolve('success')
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
            this.$axios.$post(`/deleteUser/${payload._id}`)
                .then((res) => {
                    if(payload.role == 'keeper') {
                        this.commit('sidenav/removeKeeper', res)
                        this.dispatch('notifications/doNotification', {status: true, mssg: 'Keeper Deleted'})
                        resolve({status: 'success', role: payload.role})
                    } else if(payload.role == 'user') {
                        this.commit('sidenav/removeUser', res)
                        this.dispatch('notifications/doNotification', {status: true, mssg: 'User Deleted'})
                        resolve({status: 'success', role: payload.role})
                    } else {
                        reject('error')
                    }
                })
                .catch((e) => {
                    console.log(e);
                    reject(e);
                });
        });
    },
    updateUser(_, payload) {
        return new Promise((resolve, reject) => {
            const newPayload = payload.updateObj;
            //salt and encrypt userPassword before posting to API
            if(newPayload.userPassword != undefined) {
                let salt = bcrypt.genSaltSync(10);
                newPayload.userPassword = bcrypt.hashSync(newPayload.userPassword, salt)
            } 
            this.$axios.$post(`/updateUser/${payload.userid}`, newPayload)
                .then((data) => {
                    let updateObj = data;
                    if(data.userName == undefined) {
                        updateObj = {
                            _id: data._id,
                            userName: this.state.users.ogUserName,
                            homesArray: payload.updateObj.homesArray
                        }
                    }
                    if(data.role == 'keeper') {
                        this.commit('sidenav/updateKeeper', updateObj);
                        this.commit('users/setOGUserName', updateObj.userName)
                        this.commit('errors/resetErrors');
                        resolve('success');
                    } else {
                        this.commit('sidenav/updateUser', updateObj);
                        this.commit('users/setOGUserName', updateObj.userName)
                        this.commit('errors/resetErrors');
                        resolve('success');
                    }
                })
                .catch((e) => {
                    console.log(e);e
                    reject(e);
                });  
            })
    }
}


