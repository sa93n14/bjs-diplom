'use strict';

let user2 = new LogoutButton();

user2.action = function() {
    ApiConnector.logout(response => {
        if(response.success === true) {
            location.reload();
        }
    })
}

ApiConnector.current(response => {
    if(response.success === true) {
        ProfileWidget.showProfile(response.data);
    }
})

let board = new RatesBoard();

board.getInfo = function() {
    ApiConnector.getStocks(response => {
        if(response.success === true) {
            board.clearTable();
            board.fillTable(response.data);
        }
    })
}

board.getInfo();
setInterval(board.getInfo, 60000);

let money = new MoneyManager();

money.addMoneyCallback = function(data) {
    ApiConnector.addMoney(data, response => {
        if(response.success === true) {
            ProfileWidget.showProfile(response.data);
            money.setMessage(true, 'Баланс пополнен')
        } else {
            money.setMessage(false, response.error);
        }
    })
}

money.conversionMoneyCallback = function(data) {
    ApiConnector.convertMoney(data, response => {
        if(response.success === true) {
            ProfileWidget.showProfile(response.data);
            money.setMessage(true, 'Конвертация прошла успешна')
        } else {
            money.setMessage(false, response.error);
        }
    })
}

money.sendMoneyCallback = function(data) {
    ApiConnector.transferMoney(data, response => {
        if(response.success === true) {
            ProfileWidget.showProfile(response.data);           
            money.setMessage(true, 'Перевод средств прошел успешно')
        } else {
            money.setMessage(false, response.error);
        }
    })
}

let favorite = new FavoritesWidget();

ApiConnector.getFavorites(response => {
    if(response.success === true) {
        favorite.clearTable();
        favorite.fillTable(response.data);
        money.updateUsersList(response.data);
    }
})

favorite.addUserCallback = function(data) {
    ApiConnector.addUserToFavorites(data, response => {
        if(response.success === true) {
            favorite.clearTable();
            favorite.fillTable(response.data);
            money.updateUsersList(response.data);           
            favorite.setMessage(true, 'Пользователь добавлен')
        } else {
            favorite.setMessage(false, response.error); 
        }
    })
}

favorite.removeUserCallback = function(data) {
    ApiConnector.removeUserFromFavorites(data, response => {
        if(response.success === true) {
            favorite.clearTable();
            favorite.fillTable(response.data);
            money.updateUsersList(response.data);
            favorite.setMessage(true, 'Пользователь удален')
        } else {
            favorite.setMessage(false, response.error); 
        }
    })
}