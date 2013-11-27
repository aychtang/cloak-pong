var cloak = require('cloak');

// Sends a refresh lobby message with current userlist to clients.
var sendRefreshLobby = function() {
  this.messageMembers('refreshLobby', JSON.stringify(this.getMembers(true)));
};

cloak.configure({
  port: 8090,
  messages: {
    'registerUsername': function(username, user) {
      var success = false;

      if (user.name !== username) {
        user.name = username;
        success = true;
      }

      var responseObject = {
        name: user.name,
        success: success
      };

      user.message('registerUsernameResponse', JSON.stringify(responseObject));
    },
    joinLobby : function(arg, user) {
      var success = false;
      var lobby = cloak.getLobby();
      lobby.addMember(user);

      if (user.getRoom().isLobby) {
        success = true;
      }

      var responseObject = {
        members: lobby.getMembers(true),
        success: success
      };

      user.message('joinLobbyResponse', JSON.stringify(responseObject));
    }
  },
  lobby: {
    newMember: sendRefreshLobby,
    memberLeaves: sendRefreshLobby
  }
});

cloak.run();
