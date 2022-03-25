const logoutButton = new LogoutButton();
logoutButton.action = () => ApiConnector.logout(response => {
    console.log(response);
    if (response.success) {
        location.reload();
    };
});

ApiConnector.current(response => {
    if (response.succcess) {
        ProfileWidget.showProfile(response.data);
    }
});

const ratesBoard = new RatesBoard();
function newStocks() {
    ApiConnector.getStocks(response => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    });
};
newStocks();
setInterval(newStocks, 60000);

const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.serMessage(response.success, 'Зачислено');
        } else {
            moneyManager.setMessage(response.success, response.error);
        };
    });
};

moneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney (data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, 'Конвертировано');
        } else {
            moneyManager.serMessage(response.success, response.error);
        };
    });
};

moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney (data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, 'Перевод выполнен успешно');
        } else {
            moneyManager.serMessage(response.success, response.error);
        }
    })
}

const favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites(response => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    };
});

favoritesWidget.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, 'Пользователь добавлен');
        } else {
            favoritesWidget.setMessage(response.success, response.error);
        };
    });
};

favoritesWidget.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.success, 'Пользователь удален');
        } else {
            favoritesWidget.setMessage(response.success, response.error);
        };
    });
}
