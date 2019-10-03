module.exports = {
    db: {
        host: 'localhost',
        database: 'capstone',
        user: 'capstone_user',
        password: 'x'
    },
    auth: {        
        clientID: `1GhYuE5mUY005Y6imP9Auc2R7smNW848`,
        domain: `dev-ag0cp9dk.auth0.com`,        
        redirectUri: `http://localhost:3000/callback`,
        audience: `https://dev-ag0cp9dk.auth0.com/api/v2/`,
        responseType: `id_token`,
        scope: `openid profile`
    }
}