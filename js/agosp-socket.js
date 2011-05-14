
agosp = this.agosp || {};

agosp.socket = (function(){
	
	var socket = null
		;
	
	var _handleMessage = function(msg) {
		agosp.out('handled massage');
		agosp.ui.chat.add(msg);
		};
		
	var obj = {
		
		CHAT_MESSAGE: "chat",
		FILE_EDIT: "edit",
		
		connect: function(address) {
			socket = new io.Socket('10.1.1.133',{port:8124});
			socket.on('message',_handleMessage);
			socket.connect();
			agosp.out('connecting started');
			},
			
		send: function(type, message) {
			socket.send(message);
			}
	};
	
	return obj;
	
})();

jQuery( function(){ agosp.out( "WebSocket module is ready" ); } );
