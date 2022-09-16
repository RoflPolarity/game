function ID(id){
    return document.getElementById(id);
}

function getNodesOf(obj, str) {
    if (str) var tags = str.toHash();
    var result = [], items = obj.childNodes;
    for (var i = 0, lim = items.length; i < lim; i++)
    {
        var item = items[i];
        if (item.nodeType != 1) continue;
        if (!tags || tags[item.tagName]) result.push(item);
    }
    return result;
}

function processEvent(obj, method) {
    var args = [].splice.call(arguments,2);
    return function(event) {
        event = event || window.event;
        obj[method].apply(obj, [event].concat(args));
    };
}
function onClickOrTap(elem, handler) {
    if (elem.addEventListener) {
        var event = "ontouchend" in window ? "touchend" : "click";
        elem.addEventListener(event, handler, false);
    } else {
        elem.attachEvent("onclick", handler);
    }
}


function classNameOf(obj) {
    var cne = classNameEditor;
    cne.value = obj.className;
    cne.obj = obj;
    return cne;
}

var classNameEditor = {
    seek: function(str)
    {
        var s = " ", spaced = s + this.value + s;
        return spaced.seek(s = str + s);
    },
    add: function(str)
    {
        if (!this.value.seek(str))
            this.obj.className = this.value + " " + str;
    },
    remove: function(str)
    {
        if (!this.value.seek(str)) return;
        var s = " ", spaced = s + this.value + s;
        var sample = new RegExp(s + str +s);
        this.obj.className = spaced.replace(sample, s).trim();
    },
};

String.prototype.seek = function(str){
    return (this.indexOf(str) > -1);
}

String.prototype.toHash = function(spacer) {
    var s = spacer || " ", hash = {};
    var a = this.split(s), i = a.length;
    while (i-- > 0) hash[a[i]] = true;
    return hash;
}

String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g,"");
}

Number.prototype.decline = function(word)
{
    var n = this + " ", p = word.split(/- |,/g);
    var pn = n.match(/([^1]|^)1 /) ? 1 : (n.match(/([^1]|^)[234] /) ? 2 : 3);
    return n + p[0] + p[pn];
}


var cookies = {
    path: "/",
    dates: {},
    keep: function(name, period)
    {
        if (period) {
            var date = new Date();
            date.setDate(date.getDate() + period);
            this.dates[name] = date.toGMTString();
        } else {
            this.dates[name] = null;
        }
    },
    get: function(name)
    {
        var s = ";", cookies = s + document.cookie.toString().replace("; ", s);
        var pos = cookies.indexOf(s + name + "=");
        return (pos == -1) ? null : cookies.substr(pos + name.length + 2).split(s, 1)[0]
    },
}
