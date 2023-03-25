'use strict';

let user1 = new UserForm();

user1.loginFormCallback = function(data) {
    ApiConnector.login(data, response => {
        if(response.success === true) {
            location.reload();
        } else {
            // user1.setLoginErrorMessage(message);
            console.log(response.error);
            alert(response.error);
            
        }
    })
} 

user1.registerFormCallback = function(data) {
    ApiConnector.register(data, response => {
        if(response.success === true) {
            location.reload();
        } else {
            // user1.setRegisterErrorMessage(message);
            console.log(response.error);
            alert(response.error);
            
        }
    })
}