// diet-dot.js
// 2011, Laura Doktorova, https://github.com/olado/doT
// 2013, James Costian, https://github.com/jamescostian/diet-dot
// Licensed under the MIT license.

'use strict';

var dietDot = function (template, varname) {
        return this.compile(template, varname || 'data')
    },
    startend = {
        start: "'+(",
        end: ")+'",
        endencode: "||'').toString().encodeHTML()+'"
    },
    settings = {
        interpolate: /<%=([\s\S]+?)%>/g,
        conditional: /<%\?(\?)?\s*([\s\S]*?)\s*%>/g,
        iterate: /<%~\s*(?:%>|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*%>)/g,
        strip: true
    },
    skip = /$^/

function encodeHTMLSource() {
    var encodeHTMLRules = { "&": "&#38;", "<": "&#60;", ">": "&#62;", '"': '&#34;', "'": '&#39;', "/": '&#47;' },
        matchHTML = /&(?!#?\w+;)|<|>|"|'|\//g;
    return function() {
        return this ? this.replace(matchHTML, function(m) {return encodeHTMLRules[m] || m;}) : this;
    };
}
String.prototype.encodeHTML = encodeHTMLSource();

function unescape(code) {
    return code.replace(/[\r\t\n]/g, ' ');
}

dietDot.prototype.compile = function(str, varname) {
    var c = settings,
        sid = 0,
        needhtmlencode,
        indv

    c.varname = varname
    str = ("var out='" + (c.strip ? str.replace(/(^|\r|\n)\t* +| +\t*(\r|\n|$)/g,' ')
                .replace(/\r|\n|\t|\/\*[\s\S]*?\*\//g,''): str)
        .replace(/'|\\/g, '\\$&')
        .replace(c.interpolate || skip, function(m, code) {
            return startend.start + unescape(code) + startend.end;
        })
        .replace(c.conditional || skip, function(m, elsecase, code) {
            return elsecase ?
                (code ? "';}else if(" + unescape(code) + "){out+='" : "';}else{out+='") :
                (code ? "';if(" + unescape(code) + "){out+='" : "';}out+='");
        })
        .replace(c.iterate || skip, function(m, iterate, vname, iname) {
            if (!iterate) return "';} } out+='";
            sid+=1; indv=iname || "i"+sid; iterate=unescape(iterate);
            return "';var arr"+sid+"="+iterate+";if(arr"+sid+"){var "+vname+","+indv+"=-1,l"+sid+"=arr"+sid+".length-1;while("+indv+"<l"+sid+"){"
                +vname+"=arr"+sid+"["+indv+"+=1];out+='";
        })
        + "';return out;")
        .replace(/\n/g, '\\n').replace(/\t/g, '\\t').replace(/\r/g, '\\r')
        .replace(/(\s|;|\}|^|\{)out\+='';/g, '$1').replace(/\+''/g, '')
        .replace(/(\s|;|\}|^|\{)out\+=''\+/g,'$1out+=');

    try {
        return new Function(c.varname, str)
    }
    catch (e) {
        console.log('Could not create a template function: ' + str)
        throw e
    }
}

// Attach to module.exports or the global variable's dietDot property
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = dietDot
}
else {
    (function(){return eval('this')}()).dietDot = dietDot
}
