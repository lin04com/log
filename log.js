/**
 * @author  Erick Song
 * @date    2012-08-22
 * @email   ahschl0322@gmail.com
 * @info    console.log moudle
 *
 */

define(function(require, exports, module){
    var logdiv,
        logstr = '',
        doc = document,
        curl = location.href;

    if(!window.console){
        window.console={};
        window.console.log=function(){return;};
    }

    //log
    window.log = function(){
          log.history = log.history || [];   // store logs to an array for reference
          log.history.push(arguments);
          if(this.console){
            if(curl.indexOf('debug=1') > -1){
                console.log(date2str(new Date(),"hh:mm:ss"), [].slice.call(arguments) );
            }
          }
        };

    //firelite + log
    if(curl.indexOf('firelite=1') > -1){
        var a = doc.createElement('A');
        a.href = 'javascript:if(!window.firebug){window.firebug=document.createElement("script");firebug.setAttribute("src","http://getfirebug.com/releases/lite/1.2/firebug-lite-compressed.js");document.body.appendChild(firebug);(function(){if(window.firebug.version){firebug.init()}else{setTimeout(arguments.callee)}})();void (firebug);if(window.log){(function(){if(window.firebug&&window.firebug.version){for(var a=0;a<log.history.length;a++){console.log(log.history[a])}}else{setTimeout(arguments.callee,100)}})()}};';
        a.style.cssText = 'position:absolute;right:0;top:0;color:#000;font-size:12px;border:1px solid #f00';
        a.innerHTML = 'Filelite + Log';
        doc.body.appendChild(a);
    }/*else if(curl.indexOf('log=1') > -1){
        for(var i = 0, l = arguments.length; i < l; i ++){ logstr += arguments[i] + " ## " ;}
        if(typeof(logdiv) == 'undefined'){
            logdiv = doc.createElement('div');
            logdiv.style.cssText = 'position:absolute;left:0;bottom:0;width:400px;height:200px;overflow:hidden;overflow-y:auto;border:1px solid #f00;z-index:10000;background:#ccc';
            doc.body.appendChild(logdiv);
        }
        logdiv.innerHTML += logstr + '<br />';
    }else{}*/

    function date2str(x,y) {
        var z = {M:x.getMonth()+1,d:x.getDate(),h:x.getHours(),m:x.getMinutes(),s:x.getSeconds()};
        y = y.replace(/(M+|d+|h+|m+|s+)/g,function(v) {return ((v.length>1?"0":"")+eval('z.'+v.slice(-1))).slice(-2);});
        return y.replace(/(y+)/g,function(v) {return x.getFullYear().toString().slice(-v.length);});
    }

    return log;

});
