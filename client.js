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

cloak.configure({
	messages: {
		registerUsernameResponse: function(data) {
			data = JSON.parse(data);
			if (data.success) {
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
