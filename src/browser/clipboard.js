function copy(text, callback) {
    if (text) {
        document.oncopy = function (event) {
            event.clipboardData.setData("text/plain", text);
            event.preventDefault();
            callback();
        };
        document.execCommand("Copy", false, null);
    }
}

function paste(callback){
    var x = document.createElement("INPUT");
    x.setAttribute("type", "text");
    x.select();
    document.execCommand("Paste", false, null);
    var text = x.value;
    callback(text);
}

var Clipboard ={
    copy: function (success, fail, text){
        if (!text || !text.length){
            fail("There is no text to copy");
        }
        setTimeout(function(){
            copy(text, function(){
                success();
            });
        }, 0)
    },
    paste: function(success, fail){
        setTimeout(function(){
            paste(function(text){
                success(text);
            })
        })
    }
}
require("cordova/exec/proxy").add("Clipboard", Clipboard);