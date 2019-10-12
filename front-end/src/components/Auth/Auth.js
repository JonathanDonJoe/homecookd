import auth0 from 'auth0-js';
import auth_config from '../../config';

class Auth {
    constructor() {
        this.auth0 = new auth0.WebAuth(auth_config.auth);

        this.getProfile = this.getProfile.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
    }

    getProfile() {
        return this.profile;
    }

    getIdToken() {
        return this.idToken;
    }

    isAuthenticated() {
        console.log(new Date().getTime() < this.expiresAt)

        // Old block:
        return new Date().getTime() < this.expiresAt;



        // // Check if a new login was done
        // if (new Date().getTime() < this.expiresAt) {
        //     return new Date().getTime() < this.expiresAt
        // } else if ()
        // // if token was found in localhost
        // // Check for local storage here?
        // // If local storage exists, pull out the cookie???
        // console.log(new Date().getTime() < this.expiresAt)



        
    }

    signIn() {
        return this.auth0.authorize();
    }

    handleAuthentication() {
        return new Promise((resolve, reject) => {
            this.auth0.parseHash((err, authResult) => {
                if (err) return reject(err);
                if (!authResult || !authResult.idToken) {
                    return reject(err);
                }
                this.idToken = authResult.idToken;
                this.profile = authResult.idTokenPayload;

                // console.log('Signed in. POST to express here')
                // console.log(this.idToken)
                // console.log(this.profile)

                // const signUpUrl = `${window.apiHost}/users/login`
                // axios.defaults.headers.common['Authorization'] = `Bearer ${this.idToken}`;

                // // Fail Case
                // axios.defaults.headers.common['Authorization'] = `Bearer ${this.idToken}`.replace('d','b');

                // const axiosResponse = axios.post(signUpUrl, {
                //     token:this.idToken, 
                //     first: this.profile.given_name, 
                //     last: this.profile.family_name,
                //     email: this.profile.email
                // });
                // console.log('axiosResponse');
                // console.log(axiosResponse);

                // localStorage['token'] = JSON.stringify(this.idToken);
                // localStorage['first'] = JSON.stringify(this.profile.given_name);
                // localStorage['last'] = JSON.stringify(this.profile.family_name);
                // localStorage['email'] = JSON.stringify(this.profile.email);

                // set the time that the id token will expire at
                this.expiresAt = authResult.idTokenPayload.exp * 1000;
                resolve({
                    token:this.idToken, 
                    first: this.profile.given_name, 
                    last: this.profile.family_name,
                    email: this.profile.email,
                    picture: this.profile.picture
                });
            });
        })
    }

    signOut() {
        // clear id token, profile, and expiration
        this.idToken = null;
        this.profile = null;
        this.expiresAt = null;
    }
}

const auth0Client = new Auth();

export default auth0Client;


