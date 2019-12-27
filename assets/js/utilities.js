export function formatUserForDispatch(name, password, homes, therole) {
      if(name.length < 2 || name == undefined) { 
          name = "";
      }
      if (password.length < 2) {
          password = "";
      }
      if(name == '' && password == '') {
          let payload = {
              homesArray: homes,
              role: therole
          }
          return payload
      } else if (name == '') {
          let payload = {
              userPassword: password,
              homesArray: homes,
              role: therole
          }
          return payload
      } else if(password == '') {
          let payload = {
              userName: name,
              homesArray: homes,
              role: therole
          }
          return payload
      } else {
          let payload = {
              userName: name,
              userPassword: password,
              homesArray: homes,
              role: therole
          }
          return payload
      }
}

export function checkIfAvailable(name, arr) {
    let nameAvailable = true;
        arr.forEach(user => {
          if (user.keeperName == name || user.userName == name || user.homeName == name) {
            nameAvailable = false;
          }
        })
        return nameAvailable;
}

export function getActiveUsersHomesArrays(usersArr, usersMenu) {
    let usersActiveHomesArr = [];
    usersMenu.forEach(menuUser => {
        usersArr.forEach(user => {
            if(user._id == menuUser._id){
                usersActiveHomesArr.push(menuUser)
            }
        })
    })
    return usersActiveHomesArr;
} 
export function getUpdateUsersHomesArrays(usersArr, usersMenu) {
    let updateActiveHomesArr = [];
    usersMenu.forEach(menuUser => {
        usersArr.forEach(user => {
            if(user._id == menuUser._id){
                menuUser.isActive = true;
                updateActiveHomesArr.push(menuUser);
            } else {
                menuUser.isActive = false;
                updateActiveHomesArr.push(menuUser);
            }
        })
    })
    return updateActiveHomesArr;
} 

export function makeTFArray(homeName, allUsers) {
    allUsers.forEach(user => {
        user.isActive = false;
    })
    // map all users that have home in homesArray
    allUsers.forEach(user => {
            user.homesArray.forEach(home => {    
                if(home == homeName) {
                    user.isActive = !user.isActive
                }
            })
    })
    return allUsers;

}

export function makeActiveUsersHomeList(homeNamesArr, allHomesArr) {
    let returnArr = [];
    homeNamesArr.forEach(homeName => {
        allHomesArr.forEach(home => {
            if(homeName == home.homeName){
                returnArr.push(home)
            }
        })
    })
    return returnArr;
}


