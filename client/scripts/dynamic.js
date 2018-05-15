$(document).ready(function() {

  app.init();

  $('#chats').on('click', '.username', function(event){
    event.preventDefault();
    var usernameString = $(this).data('username');

    if (!app.friendsList.includes(usernameString)) {
      app.friendsList.push(usernameString);
    }

    var chats = $('#chats').children();
    for (var i=0; i<chats.length; i++) {
      if ($(chats[i]).find('.username').data('username') === usernameString) {
        $(chats[i]).addClass('friend');
      }
    }
  });

  
  $('#newMessageForm').on('click', '#newMessageSubmitButton', function() {
    var message = {};
    message.text = $('#newMessageText').val();
    message.username = window.location.search.split('=')[1];
    
    if ($('#newMessageRoom').val() !== '') {
      message.roomname = $('#newMessageRoom').val();
      app.roomStorage.push($('#newMessageRoom').val());
    } else {
      message.roomname = $('#roomSelect').find(":selected").val();
    }
        
    console.log(message);
    
    app.send(message);
  });
  
  $('#roomSelect').on('change', function() {
    var selectedRoomname = $('#roomSelect').find(":selected").val();

    var chats = $('#chats').children();
    for (var i=0; i<chats.length; i++) {
      if (selectedRoomname === 'All Messages') {
        $(chats[i]).show();
      } else if ($(chats[i]).data('roomname') !== selectedRoomname) {
        $(chats[i]).hide();
      } else {
        $(chats[i]).show();
      }
    }
  });

});