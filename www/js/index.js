var notification_count=0;
var name;
var nameExist = 0;
var dialogueCheck = 0;

$(document).on('pageinit', function() {

	$('#messageButton1').on('click', function() {
		createMessage("Hello, how are you?", 3000);
	});
    
    $('#messageButton2').on('click', function() {
		createMessage("Good day sir!", 2000);
	});
	
	$('#dialogButton').on('click', function() {
		createDialog();
	});


	$('#notificationButton').on('click', function() {
		createNotification();
	});


});



function createMessage(inText, inNumber){		
	//phoneGap and jQueryMobile do not support toast messages directly
    //so we can add this using toast.js
    console.log(inText);
    console.log(inNumber);
    new Toast({content: inText, duration: inNumber}); 

}
        	

function createDialog() {

	//phonegap supports native dialog boxes.
	//here's a simple example
    if(dialogueCheck == nameExist){
    if(nameExist == 0){
    name = prompt("What is you name?");
        
    }
	navigator.notification.confirm(
    	"Have you drink water in the past hour " + name + "?",  // message
        dialogDismissed,         // callback
        'Water time!',            // title
        ['Yes!', "No"]                  // buttons
    );
nameExist++;
}
}
        	
        	
function dialogDismissed(buttonIndex) {
	
	if(buttonIndex==2){ new Toast({content: "Go get a cup, stay hydrated!", duration: 3000});
          dialogueCheck++;             
          createNotification();
                      }
                       
   	else if(buttonIndex==1){ new Toast({content: 'Well done, stay hydrated!', duration: 3000});
        dialogueCheck++;                    
        createNotification();  }
}

   
   
function createNotification() {
        		
	//
    //generate a time to post notification
    //
    var currentTime = new Date().getTime(); //current time
    var notificationTime = new Date(currentTime + (1000)); //delayed time  - add 1 second
    			
    //
    //setup notification
    //
    
    cordova.plugins.notification.local.schedule({ 
    	id: 		1,
        title: 		"Water Check",
        message: 	"Drink water " + name + "!",
        date: 		notificationTime 
        
   	});
   cordova.plugins.notification.local.on("click", createDialog);
   cordova.plugins.notification.local.on("clear", createNotification);

   // cordova.plugins.notification.local.on("trigger", createDialog);
    
}