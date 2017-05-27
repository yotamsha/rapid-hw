import Auth from '../Auth';
import fakeAPI from '../FakeAPI';

let _cachedUser = null;
class User {

  /**
   * Create a login request.
   *
   * @param {string} username
   * @param {string} password
   */
  static login(username, password) {
    //localStorage.setItem('token', token);
    return new Promise(function(resolve, reject){
      if (Auth.isUserAuthenticated()){
        return resolve();
      } else {
        return fakeAPI.login(username, password).then(function authSuccess(token){
          // success
          Auth.authenticateUser(token);
          return resolve();
        }, function authError(){
          //error
          return reject();

        });
        //return resolve();

      }
    });

  }

  static register(user) {
    return fakeAPI.createUser(user);
  }

  static getInfo(){
    return new Promise(function(resolve, reject){
      fakeAPI.getUserInfo(Auth.getToken()).then(function(user){
        _cachedUser = user;
        resolve(user);
      }, function(){
        reject();
      });
    });

  }

  static setElementsPositions(positions) {
    return fakeAPI.setElementsPositions(Auth.getToken(), positions);
  }

  static getUsername() {
    return _cachedUser && _cachedUser.username;
  }


/*  login(username, password, callback) {
    // If there is a token in the localStorage, the user already is
    // authenticated
    if (this.loggedIn()) {
      callback(true);
      return;
    }
    // Post a fake request (see below)
    request.post('/login', { username, password }, (response) => {
      // If the user was authenticated successfully, save a random token to the
      // localStorage
      if (response.authenticated) {
        localStorage.token = response.token;
        callback(true);
      } else {
        // If there was a problem authenticating the user, show an error on the
        // form
        callback(false, response.error);
      }
    });
  },*/

}

export default User;
