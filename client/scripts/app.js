var app = {
  server: 'http://127.0.0.1:3000/chatterbox/classes/messages',
  roomStorage: [],
  messageStorage: [],
  friendsList: []
};

app.init = function() {
  app.fetch();

  app.messageStorage.forEach(function(message) {
    if (!app.roomStorage.includes(message.roomname)) {
      app.roomStorage.push(message.roomname);
    }
  });
};

app.send = function(message) {
  $.ajax({
    url: app.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');

      app.fetch();
    },
    error: function (data) {
      console.error('chatterbox: Failed to send message', data);
    }
  });
  
  if (!app.roomStorage.includes(message.roomname)) {
    app.roomStorage.push(message.roomname);
    app.renderRoom(message.roomname);
  }

};

app.fetch = function() {
  $.ajax({
    url: app.server,
    type: 'GET',
    contentType: 'application/json',
    // data: {'order':'-createdAt'},
    limit: 200,
    success: function (data) {
      data.results.forEach(function(message) {
        app.messageStorage.push(message);
      }.bind(app));

      app.messageStorage.sort(function(b, a) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      app.messageStorage.forEach(function(message) {
        app.renderMessage(message);
        if (!app.roomStorage.includes(message.roomname)) {
          app.roomStorage.push(message.roomname);
        }
      });

      app.roomStorage.forEach(function(room) {
        app.renderRoom(DOMPurify.sanitize(room));
      });
      
    },
    error: function (data) {
      console.error('chatterbox: Failed to retrieve messages');
    }
  });

};

app.clearMessages = function() {
  $('#chats').empty();
};


 

app.renderMessage = function(message) {
  var $chat = $("<div class='chat'> </div>");
  $chat.data('roomname', DOMPurify.sanitize(message.roomname));
  
  var $name = $('<a class="username" href="#"></a>');
  var $text = $('<p class="messageText"></p>');
  var $createdAt = $('<p class="createdAt"></p>');
  
  if (!DOMPurify.sanitize(message.username)) {
    message.username = 'anonymous';
  }

  if (!DOMPurify.sanitize(message.text)) {
    message.text = 'Natalie & Daryl were here';
  }  

  $name.text(DOMPurify.sanitize(message.username));
  $name.data('username', DOMPurify.sanitize(message.username));
  $text.text(DOMPurify.sanitize(message.text));
  $createdAt.text(moment(DOMPurify.sanitize(message.createdAt)).calendar());

  $chat.append($name);
  $chat.append($text);
  $chat.append($createdAt);

  $('#chats').prepend($chat);

};

app.renderRoom = function(roomName) {
  if (!roomName) {
    roomName = 'Chat Lottery';
  }
  
  var currentOptionNodes = $('#roomSelect').children();
  var currentOptions = [];

  for (var i = 0; i < currentOptionNodes.length; i++) {
    currentOptions.push(currentOptionNodes[i].text);
  }
  
  if (!currentOptions.includes(roomName)) {
    var $roomName = $(`<option value="${roomName}">${roomName}</option>`);
    $('#roomSelect').append($roomName);
  }
};



