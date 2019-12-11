exports.formatUserForDispatch = (name, password, homes, therole) => {
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

exports.checkIfAvailable = (name, arr) => {
    let nameAvailable = true;
        arr.forEach(user => {
          if (user.keeperName == name || user.userName == name || user.homeName == name) {
            nameAvailable = false;
          }
        })
        return nameAvailable;
}

exports.getActiveUsersHomesArrays = (usersArr, usersMenu) => {
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
exports.getUpdateUsersHomesArrays = (usersArr, usersMenu) => {
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

exports.makeTFArray = (homeName, allUsers) => {
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

exports.makeActiveUsersHomeList = (homeNamesArr, allHomesArr) => {
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

exports.test = () => {
    console.log('test working')
}

