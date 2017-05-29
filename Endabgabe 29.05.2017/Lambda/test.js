import {Session} from './session';

@inject(Session)
export class Auth {

   // App specific
   userPoolId = 'us-east-1_fgCWraBkF';
   appClientId = '57lq262n28o7ddt8i36jcjj7qd';

   constructor(session) {
      this.session = session;

      // Required as mock credentials
      AWSCognito.config.update({accessKeyId: 'mock', secretAccessKey: 'mock'});

      // pool data
      this.poolData = {
         UserPoolId: this.userPoolId,
         ClientId: this.appClientId
      };

      // create user pool
      this.userPool = new AWSCognito.CognitoIdentityServiceProvider.CognitoUserPool(this.poolData);
   }

   registerUser(user) {
      let attributes = [];

      let emailData = {
         Name: 'email',
         Value: user.email
      };

      let nameData = {
         Name: 'name',
         Value: user.name
      };

      attributes.push(new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(emailData));
      attributes.push(new AWSCognito.CognitoIdentityServiceProvider.CognitoUserAttribute(nameData));

      this.userPool.signUp(user.username, user.password, attributes, null, (err, result) => {
         if (err) {
            console.log(err);
            return;
         }
         this.session.registered = true;
      });
   }

   confirmUser(username, code) {
      let userData = {
         Username: username,
         Pool: this.userPool
      };

      let cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

      cognitoUser.confirmRegistration(code, true, (err, result) => {
         if (err) {
            console.log(err);
            return;
         }
         this.session.confirmed = true;
      });
   }

   loginUser(username, password) {
      let authData = {
         Username: username,
         Password: password
      };

      let authDetails = new AWSCognito.CognitoIdentityServiceProvider.AuthenticationDetails(authData);

      let userData = {
         Username: username,
         Pool: this.userPool
      };

      let cognitoUser = new AWSCognito.CognitoIdentityServiceProvider.CognitoUser(userData);

      cognitoUser.authenticateUser(authDetails, {
         onSuccess: (result) => {
            this.session.user = cognitoUser;
         },
         onFailure: (err) => {
            console.log(err);
         }
      });
   }

   getSession() {
      let cognitoUser = this.userPool.getCurrentUser();

      if (cognitoUser != null) {
         cognitoUser.getSession((err, session) => {
            if (err) {
               this.logoutUser();
               return;
            }
            this.session.user = cognitoUser;
         });
      }
      else this.logoutUser();
   }

   logoutUser() {
      let cognitoUser = this.userPool.getCurrentUser();
      this.session.user = null;
      if (cognitoUser != null) cognitoUser.signOut();
   }

   getUserAttributes() {
      return new Promise((resolve, reject) => {
         this.session.user.getUserAttributes((err, result) => {
            if (err) reject(err);
            else resolve(result);
         })
      })
   }
}