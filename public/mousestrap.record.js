(function(d){function n(b,a,h){if(this.recording)if("keydown"==h.type){1===b.length&&g&&k();for(i=0;i<a.length;++i)l(a[i]);l(b)}else"keyup"==h.type&&0<c.length&&k();else p.apply(this,arguments)}function l(b){var a;for(a=0;a<c.length;++a)if(c[a]===b)return;c.push(b);1===b.length&&(g=!0)}function k(){e.push(c);c=[];g=!1;clearTimeout(m);m=setTimeout(q,50)}function r(b){var a;for(a=0;a<b.length;++a)b[a].sort(function(a,b){return 1<a.length&&1===b.length?-1:1===a.length&&1<b.length?1:a>b?1:-1}),b[a]=
b[a].join("+")}function q(){f&&(r(e),f(e));e=[];f=null;c=[]}var e=[],f=null,c=[],g=!1,m=null,p=d.prototype.handleKey;d.prototype.record=function(b){var a=this;a.recording=!0;f=function(){a.recording=!1;b.apply(a,arguments)}};d.prototype.handleKey=function(){n.apply(this,arguments)};d.init()})(Mousetrap);