var cloak = require('cloak');

// Sends a refresh lobby message with current userlist to clients.
var sendRefreshLobby = function() {
  var lobby = cloak.getLobby();
  var responseObject = {
    members: lobby.getMembers(true),
    rooms: cloak.getRooms(true)
  };
  lobby.messageMembers('refreshLobby', JSON.stringify(responseObject));
};

cloak.configure({
  port: 8090,
  defaultRoomSize: 2,
  messages: {
    registerUsername: function(username, user) {
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
    registerGame: function(roomname, user) {
      var room = cloak.createRoom(roomname);
      var rooms = cloak.getRooms(true);
      var responseObject = {
        roomName: roomname,
        rooms: rooms
      };
      user.message('madeRoom', JSON.stringify(responseObject));
      sendRefreshLobby();
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
        success: success,
        rooms: cloak.getRooms(true)
      };

      user.message('joinLobbyResponse', JSON.stringify(responseObject));
    }
  },
  lobby: {
    newMember: sendRefreshLobby,
    memberLeaves: sendRefreshLobby
  },
  room: {
    init: function() {
      console.log(this);
    }
  }
});

cloak.run();
