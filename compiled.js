javascript:(function(e,k){function w(){var c=document.getElementById("permalink-overlay-dialog");return c?c.querySelector("video"):e}function x(c,a,b){c.addEventListener("input",function(){a.nextSibling.data="-";c.parentNode.style.opacity=1;a.parentNode.style.opacity=.6});a.addEventListener("input",function(){l.value=1;m();n(c,b);n(a,b);a.parentNode.style.opacity=1;c.parentNode.style.opacity=.6})}function t(c,a){var b=f.createElement("label");b.style.cssText="display:block;font-weight:bold";b.innerHTML=c+" <input type=\"range\" value=1 style='vertical-align:middle'> 100%"; var d=b.firstElementChild;d.oninput=function(){n(d,a)};setTimeout(function(){d.value=1;d.oninput()},10);return b}function n(c,a){var b=(1E3*(a.playbackRate=c.value)|0)/10+"%";c.nextSibling.data=b}function m(){if(!l)return(m=Function.prototype)();e[p]=1}var f=this.contentDocument||this.document;e||(e=f.querySelector("video"));if(e){window.alert=Function.prototype;var p="preservesPitch"in e?"preservesPitch":"mozPreservesPitch"in e?"mozPreservesPitch":"webkitPreservesPitch"in e?"webkitPreservesPitch": "",g=f.getElementById("fbPhotoPageButtons"),q=f.getElementById("playlist0"),r=f.getElementById("msg-expanded"),y=document.querySelector(".player_outro_area"),u=100,v="";if("twitter.com"==location.hostname){var h=document.getElementById("permalink-overlay-dialog");h=h&&h.querySelector(".AdaptiveMedia-container")||document.querySelector(".AdaptiveMedia-container")||document.querySelector(".tweet-details-fixer")||document.querySelector("#stream-items-id > .js-stream-item");e=w();h&&h.parentNode&&(h.parentNode.style.overflow= "visible")}else/dailymotion\.com/.test(location.hostname)?u=1E4:"instagram.com"==location.hostname&&(v+="position:fixed");r&&(r.style.cssText="display:block; bottom: 10px");if((k=f.querySelector("#content #container")||f.getElementById("watch-header")||f.getElementById("player-focus-control")||g||q||r||y||h||f.body)&&!k.querySelector("#speed-slider")){g&&(g.style.position="relative");g=function(c){var a=f.createElement("fieldset");a.id="SPControlFieldset";a.style.cssText="border: 3px groove #eee; background: #e3e3e3;box-sizing: border-box; white-space: nowrap;padding: 3px; position: relative; z-index:"+ u;a.style.cssText+=v;var b=f.createElement("legend");b.textContent="Pitch & Speed Controls";b.style.cssText="background: inherit;";a.appendChild(b);c.insertBefore(a,c.firstChild);return a}(k);"twitter.com"==location.hostname?g.style.cssText+="position: absolute; top: -40px; z-index: 100;":e.parentNode==document.body&&(g.style.cssText+="top: -33px;",e.style.width="95%");q=function(c,a,b,d){b=t("Speed",c);b.id="speed-slider";d=b.firstElementChild;d.min=.5;d.step=.05;d.max=1;a.insertBefore(b,a.firstChild); d.addEventListener("input",m);return d}(e,g);var l=function(c,a,b,d){if(p)return b=t("Pitch",c),d=b.firstElementChild,d.min=.7,d.max=1.1,d.value=1,d.step=.005,a.insertBefore(b,a.firstChild),d.addEventListener("input",function(){c[p]=0}),d}(e,g);l&&x(l,q,e);k=null}}}).call(window);