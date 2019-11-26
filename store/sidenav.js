
export const state = () => ({
    usersMenu: [],
    homesMenu: [],
    keepersMenu: []
 });
 
 export const getters  = {
    getKeepersMenu(state) {
        console.log('called')
        return state.keepersMenu;
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
        state.keepersMenu.push(payload);
    },
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
 
 