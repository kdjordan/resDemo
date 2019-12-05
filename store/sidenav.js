
export const state = () => ({
    usersMenu: [],
    homesMenu: [],
    keepersMenu: []
 });
 
 export const getters  = {
    getKeepersMenu(state) {
        return state.keepersMenu;
    },
    getHomesMenu(state) {
        return state.homesMenu;
    },
    getUsersMenu(state) {
        return state.usersMenu
    }
 };
 
 export const mutations = {
    addUser(state, payload) {
        state.usersMenu.push(payload);
    },
    addHome(state, payload) {
        state.homesMenu.push(payload);
    },
    addKeeper(state, payload) {
        state.keepersMenu.push(payload)
    },
    removeUser(state, payload) {
        state.usersMenu = state.usersMenu.filter((el) => {
            return el._id != payload;
        })
    },
    removeKeeper(state, payload) {
        state.keepersMenu = state.keepersMenu.filter((el) => {
            return el._id != payload;
        })
    },
    removeHome(state, payload) {
        state.homesMenu = state.homesMenu.filter((el) => {
            return el._id != payload;
        })
    },
    updateKeeper(state, payload) {
        state.keepersMenu.forEach(keeper => {
            if(keeper._id == payload._id) {
                keeper.keeperName = payload.userName;
                keeper.homesArray = payload.homesArray;
            }
        })
    },
    updateUser(state, payload) {
        state.usersMenu.forEach(user => {
            if(user._id == payload._id) {
            user.userName = payload.userName,
            user.homesArray = payload.homesArray
            }
        });
    },
    updateHome(state, payload) {
        state.homesMenu.forEach(home => {
            if(home._id == payload._id) {
                home.homeName = payload.homeName
            }
        })
    },
    addUserHomeToArray(state,  payload) {
        state.usersMenu.forEach(user => {
            if(user._id == payload._id) {
               if(!user.homesArray.includes(payload.homeName)){
                user.homesArray.push(payload.homeName)
               } 
            }
        });
    },
    subtractUserHomeFromArray(state, payload) {
        // console.log(payload)
        state.usersMenu.forEach(user => {
            if(user._id == payload._id) {
               if(user.homesArray.includes(payload.homeName)){
                user.homesArray.splice(user.homesArray.indexOf(payload.homeName), 1)
               } 
            }
        });
    },
    toggleSubMenu(_, payload) {
        //FN :: open and close submenus based on clicks in SideNav    
        //statements for submenu clicks
        this.dispatch('admin/initAddUser')
        if(payload.srcElement.nextSibling.nextSibling.classList.contains('active')){
            payload.srcElement.nextSibling.nextSibling.classList.remove('active')
        } else {
            payload.srcElement.nextSibling.nextSibling.classList.add('active')
        }
        if(payload.srcElement.firstElementChild.classList.contains('rotate')){
            payload.srcElement.firstElementChild.classList.remove('rotate')
        } else {
            payload.srcElement.firstElementChild.classList.add('rotate')
        }
    }
 };
 
 export const actions = {
    getMenusData ({ commit }) {
        return  this.$axios.$get('getMenuData')
        .then((res) => {
           res['users'].forEach(el => {
               commit('addUser', el);
           })
           res['homes'].forEach(el => {
                commit('addHome', el);
            })
            res['keepers'].forEach(el => {
                commit('addKeeper', el);
            })
        }).catch((e) => {
            console.log(e)
            
        });
    }
     
 };
 
 