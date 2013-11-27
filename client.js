var registerUsername = function() {
	var button = document.querySelector('.register-name');
	var nameInput = document.querySelector('.name-field');
	cloak.message('registerUsername', nameInput.value);
};

// Expects list of current lobby members
var renderLobby = function(members) {
	var userListEl = document.querySelector('.user-list');
	userListEl.innerHTML = '<ul>'
	for (var i = 0; i < members.length; i++) {
		if (members[i].name !== 'Nameless User') {
			userListEl.innerHTML += '<li>' + members[i].name + '</li>';
		}
	}
	userListEl.innerHTML += '</ul>';
};

var logUsers = function() {
	cloak.message('logUsers');
};

var openCreateUi = function() {
	var lobbyUI = document.querySelector('.lobby-ui');
	var createUI = document.querySelector('.create-game-ui');
	lobbyUI.style.display = 'none';
	createUI.style.display = 'block';
};

var hideCreateUi = function() {
	var lobbyUI = document.querySelector('.lobby-ui');
	var createUI = document.querySelector('.create-game-ui');
	lobbyUI.style.display = 'block';
	createUI.style.display = 'none';
};

cloak.configure({
	messages: {
		registerUsernameResponse: function(data) {
			data = JSON.parse(data);
			if (data.success) {
				var nameUI = document.querySelector('.name-ui');
				var lobbyUI = document.querySelector('.lobby-ui');
				nameUI.style.display = 'none';
				lobbyUI.style.display = 'block';

				cloak.message('joinLobby');
			}
		},
		joinLobbyResponse: function(data) {
			data = JSON.parse(data);
			if (data.success) {
				renderLobby(data.members);
			}
		},
		refreshLobby: function(members) {
			members = JSON.parse(members);
			renderLobby(members);
		}
	}
});

cloak.run('http://localhost:8090');
