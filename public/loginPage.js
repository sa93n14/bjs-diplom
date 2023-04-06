'use strict';

let user1 = new UserForm();

user1.loginFormCallback = function(data) {
    ApiConnector.login(data, response => {
        if(response.success === true) {
            location.reload();
        } else {
            console.log(response.error);
            user1.setLoginErrorMessage(response.error)
            
        }
    })
} 

user1.registerFormCallback = function(data) {
    ApiConnector.register(data, response => {
        if(response.success === true) {
            location.reload();
        } else {
            user1.setRegisterErrorMessage(response.error);
            console.log(response.error);
        }
    })
}