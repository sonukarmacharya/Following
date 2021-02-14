class Auth {
    constructor() {
      if(localStorage.getItem("user")){
        this.authenticated = true;
      }
      else {this.authenticated = false;}
      
    }
  
    login(cb) {
      this.authenticated = true;
      cb();
    }
  
    logout(cb) {
      localStorage.removeItem("user")
      this.authenticated = false;
      cb();
    }
  
    isAuthenticated() {
      return this.authenticated;
    }
  }
  
  export default new Auth();
  