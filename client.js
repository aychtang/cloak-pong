var show = function(el) {
	el.style.display = 'block';
};

var hide = function(el) {
	el.style.display = 'none';
};

var registerUsername = function() {
	var button = document.querySelector('.register-name');
	var nameInput = document.querySelector('.name-field');
	cloak.message('registerUsername', nameInput.value);
};

var registerGame = function() {
	var button = document.querySelector('.register-game');
	var nameInput = document.querySelector('.game-field');
	cloak.message('registerGame', nameInput.value);
};

// Expects list of current lobby members
var renderLobby = function(members) {
	var userListEl = document.querySelector('.user-list');
	userListEl.innerHTML = '<ul>'
	for (var i = 0; i < members.length; i++) {
		if (members[i].name !== 'Nameless User') {
			userListEl.innerHTML += '<div>' +
			'<li>' + members[i].name + '</li>' +
			'</div>';
		}
	}
	userListEl.innerHTML += '</ul>';
};

var renderRooms = function(rooms) {
	var gameListEl = document.querySelector('.game-list');
	gameListEl.innerHTML = '<ul>'
	for (var i = 0; i < rooms.length; i++) {
		console.log(rooms[i]);
		if (rooms[i].name !== 'Nameless User') {
			gameListEl.innerHTML += '<div>' +
			'<li>' + rooms[i].name + '</li>' +
			'<button class="joinRoom">Join Game</button>' +
			'</div>';
		}
	}
	gameListEl.innerHTML += '</ul>';
};

var openCreateUi = function() {
	var lobbyUI = document.querySelector('.lobby-ui');
	var createUI = document.querySelector('.create-game-ui');
	hide(lobbyUI);
	show(createUI);
};

var hideCreateUi = function() {
	var lobbyUI = document.querySelector('.lobby-ui');
	var createUI = document.querySelector('.create-game-ui');
	show(lobbyUI);
	hide(createUI);
};

cloak.configure({
	messages: {
		registerUsernameResponse: function(data) {
			data = JSON.parse(data);
			if (data.success) {
				var nameUI = document.querySelector('.name-ui');
				var lobbyUI = document.querySelector('.lobby-ui');
				hide(nameUI);
				show(lobbyUI);

				cloak.message('joinLobby');
			}
		},
		joinLobbyResponse: function(data) {
			data = JSON.parse(data);
			if (data.success) {
				renderLobby(data.members);
				renderRooms(data.rooms);
			}
		},
		refreshLobby: function(data) {
			data = JSON.parse(data);
			renderLobby(data.members);
			renderRooms(data.rooms);
		},
		madeRoom: function(arg) {
			var lobbyUI = document.querySelector('.lobby-ui');
			var createUI = document.querySelector('.create-game-ui');
			hide(createUI);
			//eventually show game UI and start.
			show(lobbyUI);
		}
	}
});

cloak.run('http://localhost:8090');
