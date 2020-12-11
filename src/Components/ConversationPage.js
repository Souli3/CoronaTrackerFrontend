var avatar = "https://x1.xingassets.com/assets/frontend_minified/img/users/nobody_m.original.jpg";

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}            
// send the text to  server
function insertChat(owner,who, text, time){
    if($("#message").innnerText!=''){
        $("#message").empty()
    }
    if (time === undefined){
        time = 0;
    }
    var control = "";
    var date = formatAMPM(new Date());
    
    if (who == owner){
        control = '<li style="width:100%">' +
                        '<div class="msj macro">' +
                        '<div class="avatar"><img class="img-circle" style="width:100%;" src="'+ avatar +'" /></div>' +
                            '<div class="text text-l">' +
                                '<p>'+ text +'</p>' +
                                '<p><small>'+date +'</small></p>'+
                            '</div>' +
                            '<p><small>'+who +'</small></p>'+
                        '</div>' +
                    '</li>';                    
    }else{
        control = '<li style="width:100%;">' +
                        '<div class="msj-rta macro">' +
                            '<div class="text text-r">' +
                                '<p>'+text+'</p>' +
                                '<p><small>'+date+'</small></p>' +
                            '</div>' +
                            '<p><small>'+who +'</small></p>'+
                        '<div class="avatar" style="padding:0px 0px 0px 10px !important"><img class="img-circle" style="width:100%;" src="'+avatar+'" /></div>' +                                
                  '</li>';
    }
    setTimeout(
        function(){                        
            $("#message").append(control).scrollTop($("#message").prop('scrollHeight'));
        }, time);
    
}


export default insertChat;