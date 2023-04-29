import decode from 'jwt-decode';


class AuthService {

  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    return token ? true : false;
    // If there is a token and it's not expired, return `true`
    // return token && !this.isTokenExpired(token) ? true : false;


    // if (token && !this.isTokenExpired(token)) {
    //   return true
    // } else if (token && this.isTokenExpired(token)) {
    //   localStorage.removeItem('id_token');
    //   window.location.assign('../login'); //choose wisely
    //   return false
    // }
  }

  isTokenExpired(token) {
    // Decode the token to get its expiration time that was set by the server
    const decoded = decode(token);
    // If the expiration time is less than the current time (in seconds), the token is expired and we return `true`
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('id_token');
      return true;
    }
    // If token hasn't passed its expiration time, return `false`
    return false;
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('id_token');


    // window.location.assign('../login'); //choose wisely
  }

  // loggedIn() {
  //   const token = this.getToken();
  //   return token ? true : false;
  // }

  // getToken() {

  //   return localStorage.getItem('id_token');
  // }

  // login(idToken) {
  //   localStorage.setItem('id_token', idToken);
  //   window.location.assign('/');
  // }

  // logout() {
  //   localStorage.removeItem('id_token');
  //   window.location.reload();
  // }
}

export default new AuthService();