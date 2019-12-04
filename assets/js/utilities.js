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

exports.makeTFArray = (homeName, allUsers) => {
    // console.log(homeName)
    // console.log(allUsers)
    let usersFlat = allUsers.map(user => [user.userName, false]);
    let userHasHome = [];
    //map all users that have home in homesArray
    allUsers.forEach(user => {
       user.homesArray.forEach(home => {
           if(home == homeName) {
               userHasHome.push(user);
           }
       })
    })
    //update usersFlat to make array based on which users have home
    usersFlat.forEach(user => {
        userHasHome.forEach(activeUser => {
            // console.log(activeUser)
            console.log(user)
            if(user[0] == activeUser.userName) {
                user[1] = !user[1]
            }
        })
        
        return usersFlat;
    })


}

exports.test = () => {
    console.log('test working')
}

