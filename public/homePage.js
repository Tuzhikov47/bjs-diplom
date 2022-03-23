const logoutButton = new LogoutButton();
logoutButton.action = () => ApiConnector.logout(response => {
    console.log(response);
    if (response.succes) {
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
        if (response.succcess) {
            ProfileWidget.showProfile(response.data);
            moneyManager.serMessage(response.succcess, 'Зачислено');
        } else {
            moneyManager.setMessage(response.succcess, response.error);
        };
    });
};

moneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney (response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.succcess, 'Конвертировано');
        } else {
            moneyManager.serMessage(response.succcess, response.error);
        };
    });
};

moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney (response => {
        if (response.succcess) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.succcess, 'Перевод выполнен успешно');
        } else {
            moneyManager.serMessage(response.succcess, response.error);
        }
    })
}

const favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites(response => {
    if (response.succcess) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    };
});

favoritesWidget.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.succcess) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.succcess, 'Пользователь добавлен');
        } else {
            favoritesWidget.setMessage(response.succcess, response.error);
        };
    });
};

favoritesWidget.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.succcess) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(response.succcess, 'Пользователь удален');
        } else {
            favoritesWidget.setMessage(response.succcess, response.error);
        };
    });
}
