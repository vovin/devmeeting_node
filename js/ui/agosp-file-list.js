
agosp = this.agosp || {};
agosp.ui = agosp.ui || {};

agosp.ui.fileList = (function(){
	
	var _addLi = function(name) {
			var li = document.createElement( "li" );
			li.appendChild( document.createTextNode(name) );
			jQuery("#files").append( li );
			jQuery(li).click( fl.select.bind(fl,name) );
		};
	
	var fl = {
			load: function(listener) {
					this.clear();
				        $.ajax({url:'http://localhost:8080/files',
						dataType:'jsonp',
						succcess:function(data){
								$.each(data,function(i){
									_addLi(i);
									});
							}});
				},
				
			clear: function() {
					jQuery("#files li").remove();
				},
				
			select: function(name) {
				}
		};
	
	agosp.events.add( document, agosp.events.APPLICATION_STARTED, function(){ 
			fl.load();
			agosp.out( "FileList module is ready" );
		});	
	
	return fl;
	
})();
