(function(e,k){function x(){var a=document.getElementById("permalink-overlay-dialog");return a?a.querySelector("video"):e}function y(a,c,b){a.addEventListener("input",function(){t(c,"-");a.parentNode.style.opacity=1;c.parentNode.style.opacity=.6});c.addEventListener("input",function(){l.value=1;m();n(a,b);n(c,b);c.parentNode.style.opacity=1;a.parentNode.style.opacity=.6})}function u(a,c){var b=f.createElement("label");b.style.cssText="display:block;font-weight:bold";b.innerHTML=a+" <input type=\"range\" value=1 style='vertical-align:middle'> <b id='SPControlPercentText'  style='display:inline-block; width: 3.3em'>100%</b>";
var d=b.firstElementChild;d.oninput=function(){n(d,c)};setTimeout(function(){d.value=1;d.oninput()},10);return b}function n(a,c){var b=(1E3*(c.playbackRate=a.value)|0)/10+"%";t(a,b)}function m(){if(!l)return(m=Function.prototype)();e[p]=1}function t(a,c){var b=document.getElementById("SPControlPercentText");b&&(b.textContent=c)}var f=this.contentDocument||this.document;e||(e=f.querySelector("video"));if(e){(function(){var a=document.getElementById("SPControlFieldset");a&&a.remove&&a.remove()})();
window.alert=Function.prototype;var p="preservesPitch"in e?"preservesPitch":"mozPreservesPitch"in e?"mozPreservesPitch":"webkitPreservesPitch"in e?"webkitPreservesPitch":"",g=f.getElementById("fbPhotoPageButtons"),q=f.getElementById("playlist0"),r=f.getElementById("msg-expanded"),z=document.querySelector(".player_outro_area"),v=100,w="";if("twitter.com"==location.hostname){var h=document.getElementById("permalink-overlay-dialog");h=h&&h.querySelector(".AdaptiveMedia-container")||document.querySelector(".AdaptiveMedia-container")||
document.querySelector(".tweet-details-fixer")||document.querySelector("#stream-items-id > .js-stream-item");e=x();h&&h.parentNode&&(h.parentNode.style.overflow="visible")}else/dailymotion\.com/.test(location.hostname)?v=1E4:/instagram\.com/.test(location.hostname)&&(w="position: fixed;");r&&(r.style.cssText="display:block; bottom: 10px");if((k=f.querySelector("#content #container")||f.getElementById("watch-header")||f.getElementById("player-focus-control")||g||q||r||z||h||f.body)&&!k.querySelector("#speed-slider")){g&&
(g.style.position="relative");g=function(a){var c=f.createElement("fieldset");c.id="SPControlFieldset";c.style.cssText="position: relative;border: 3px groove #eee; background: #e3e3e3;box-sizing: border-box; white-space: nowrap;padding: 3px; z-index:"+v+"; "+w;var b=f.createElement("legend");b.textContent="Pitch & Speed Controls";b.style.cssText="background: inherit;";c.appendChild(b);a.insertBefore(c,a.firstChild);return c}(k);"twitter.com"==location.hostname?g.style.cssText+="position: absolute; top: -40px; z-index: 100;":
e.parentNode==document.body&&(g.style.cssText+="top: -33px;",e.style.width="95%");q=function(a,c,b,d){b=u("Speed",a);b.id="speed-slider";d=b.firstElementChild;d.min=.5;d.step=.05;d.max=1;c.insertBefore(b,c.firstChild);d.addEventListener("input",m);return d}(e,g);var l=function(a,c,b,d){if(p)return b=u("Pitch",a),d=b.firstElementChild,d.min=.7,d.max=1.1,d.value=1,d.step=.005,c.insertBefore(b,c.firstChild),d.addEventListener("input",function(){a[p]=0}),d}(e,g);l&&y(l,q,e);k=null}}}).call(window);