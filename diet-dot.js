// diet-dot.js
// 2011, Laura Doktorova, https://github.com/olado/doT
// 2013, James Costian, https://github.com/jamescostian/diet-dot
// Licensed under the MIT license.

"use strict";

var dietDot = function (template, varname) {
        this.settings.varname = varname || 'it'
        return this.render(template)
    }

dietDot.prototype.settings = {
    interpolate: /\{\{=([\s\S]+?)\}\}/g,
    conditional: /\{\{\?(\?)?\s*([\s\S]*?)\s*\}\}/g,
    iterate: /\{\{~\s*(?:\}\}|([\s\S]+?)\s*\:\s*([\w$]+)\s*(?:\:\s*([\w$]+))?\s*\}\})/g,
    varname: 'it',
    strip: true,
    append: true,
    selfcontained: false
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = dietDot;
} else if (typeof define === 'function' && define.amd) {
    define(function(){return dietDot;});
} else {
    (function(){ return this || (0,eval)('this'); }()).dietDot = dietDot;
}

function encodeHTMLSource() {
    var encodeHTMLRules = { "&": "&#38;", "<": "&#60;", ">": "&#62;", '"': '&#34;', "'": '&#39;', "/": '&#47;' },
        matchHTML = /&(?!#?\w+;)|<|>|"|'|\//g;
    return function() {
        return this ? this.replace(matchHTML, function(m) {return encodeHTMLRules[m] || m;}) : this;
    };
}
String.prototype.encodeHTML = encodeHTMLSource();

var startend = {
    append: { start: "'+(",      end: ")+'",      endencode: "||'').toString().encodeHTML()+'" },
    split:  { start: "';out+=(", end: ");out+='", endencode: "||'').toString().encodeHTML();out+='"}
}, skip = /$^/;

function resolveDefs(c, block, def) {
    return ((typeof block === 'string') ? block : block.toString())
    .replace(c.define || skip, function(m, code, assign, value) {
        if (code.indexOf('def.') === 0) {
            code = code.substring(4);
        }
        if (!(code in def)) {
            if (assign === ':') {
                if (c.defineParams) value.replace(c.defineParams, function(m, param, v) {
                    def[code] = {arg: param, text: v};
                });
                if (!(code in def)) def[code]= value;
            } else {
                new Function("def", "def['"+code+"']=" + value)(def);
            }
        }
        return '';
    })
    .replace(c.use || skip, function(m, code) {
        if (c.useParams) code = code.replace(c.useParams, function(m, s, d, param) {
            if (def[d] && def[d].arg && param) {
                var rw = (d+":"+param).replace(/'|\\/g, '_');
                def.__exp = def.__exp || {};
                def.__exp[rw] = def[d].text.replace(new RegExp("(^|[^\\w$])" + def[d].arg + "([^\\w$])", "g"), "$1" + param + "$2");
                return s + "def.__exp['"+rw+"']";
            }
        });
        var v = new Function("def", "return " + code)(def);
        return v ? resolveDefs(c, v, def) : v;
    });
}

function unescape(code) {
    return code.replace(/\\('|\\)/g, "$1").replace(/[\r\t\n]/g, ' ');
}

dietDot.prototype.render = function(tmpl) {
    var c = this.settings,
        str = (c.use || c.define) ? resolveDefs(c, tmpl, def || {}) : tmpl,
        cse = c.append ? startend.append : startend.split,
        sid = 0,
        needhtmlencode,
        indv

    str = ("var out='" + (c.strip ? str.replace(/(^|\r|\n)\t* +| +\t*(\r|\n|$)/g,' ')
                .replace(/\r|\n|\t|\/\*[\s\S]*?\*\//g,''): str)
        .replace(/'|\\/g, '\\$&')
        .replace(c.interpolate || skip, function(m, code) {
            return cse.start + unescape(code) + cse.end;
        })
        .replace(c.encode || skip, function(m, code) {
            needhtmlencode = true;
            return cse.start + unescape(code) + cse.endencode;
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
        .replace(c.evaluate || skip, function(m, code) {
            return "';" + unescape(code) + "out+='";
        })
        + "';return out;")
        .replace(/\n/g, '\\n').replace(/\t/g, '\\t').replace(/\r/g, '\\r')
        .replace(/(\s|;|\}|^|\{)out\+='';/g, '$1').replace(/\+''/g, '')
        .replace(/(\s|;|\}|^|\{)out\+=''\+/g,'$1out+=');

    if (needhtmlencode && c.selfcontained) {
        str = "String.prototype.encodeHTML=(" + encodeHTMLSource.toString() + "());" + str;
    }
    try {
        return new Function(c.varname, str);
    } catch (e) {
        if (typeof console !== 'undefined') console.log("Could not create a template function: " + str);
        throw e;
    }
}
