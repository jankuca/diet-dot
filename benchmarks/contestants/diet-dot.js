// diet-dot.js
// 2011, Laura Doktorova, https://github.com/olado/doT
// 2013, James Costian, https://github.com/jamescostian/diet-dot
// Licensed under the MIT license.

'use strict';

var dietDot = function (str, varname) {
        var varname = varname || 'data',
            sid = 0,
            needhtmlencode,
            indv

        str = ("var out='" + str
            .replace(/'|\\/g, '\\$&')
            .replace(/\[\[=([\s\S]+?)\]\]/g || skip, function(m, code) { // Interpolation
                return "'+(" + code + ")+'";
            })
            .replace(/\[\[\?(\?)?\s*([\s\S]*?)\s*\]\]/g || skip, function(m, elsecase, code) { // Conditional
                return elsecase ?
                    (code ? "';}else if(" + code + "){out+='" : "';}else{out+='") :
                    (code ? "';if(" + code + "){out+='" : "';}out+='");
            })
            .replace(iterate || skip, function(m, iterate, vname, iname) { // Iterate
                if (!iterate) return "';} } out+='";
                sid+=1; indv=iname || "i"+sid
                return "';var arr"+sid+"="+iterate+";if(arr"+sid+"){var "+vname+","+indv+"=-1,l"+sid+"=arr"+sid+".length-1;while("+indv+"<l"+sid+"){"
                    +vname+"=arr"+sid+"["+indv+"+=1];out+='";
            })
            + "';return out;")
            .replace(/\n/g, '\\n').replace(/\t/g, '\\t').replace(/\r/g, '\\r')
            .replace(/(\s|;|\}|^|\{)out\+='';/g, '$1').replace(/\+''/g, '')
            .replace(/(\s|;|\}|^|\{)out\+=''\+/g,'$1out+=');

        return new Function(varname, str)
    },
    iterate = /\[\[~\s*(?:\]\]|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\]\])/g,
    skip = /$^/

// Attach to module.exports or the global variable's dietDot property
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = dietDot
}
else {
    (function(){return eval('this')}()).dietDot = dietDot
}
