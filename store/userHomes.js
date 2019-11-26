
export const state = () => ({
    allMenuHomes: [],
    activeHomesMenu: [],
    userHomes:[]
});

export const getters  = {
   
};

export const mutations = {
    setActiveHomes(state, payload) {
        state.activeHomesMenu = payload;
    },
    updateActiveHomesMenu(state, payload) {
        state.activeHomesMenu.forEach((home) => {
            if(home[0] == payload) {
                home[1] = !home[1];
            }
        })
        //error checking and flag
         let homesCheck = state.activeHomesMenu.filter((home) => {
          return home[1] == true
        })
        if(homesCheck.length == 0) {
          state.zeroHomesError = true;
        } else {
          state.zeroHomesError = false;
        }
    },
};

export const actions = {
    
}

