(
    function(v, appendTo) {

        var doc = this.contentDocument || this.document;

        if(!v) v = doc.querySelector("video");
        if(!v) return;


        removeAnyPriorSC();


        // XXX 
        // Replace window.alert to rid of "Hello, new user" alert, 
        // as seen in Firefox on YouTube.
        window.alert = Function.prototype;

        var PRESERVES_PITCH = getPreservesPitch(v);

        var fbButtonsDiv = doc.getElementById("fbPhotoPageButtons");
        var artistworksDiv = doc.getElementById("playlist0");
        var artistworksMessageCaption = doc.getElementById("msg-expanded");
        var vimeoAppendTo = document.querySelector(".player_outro_area");


        if("twitter.com" == location.hostname) {

            let overlayElement = document.getElementById("permalink-overlay-dialog");
            var twitterAppendTo = overlayElement && 
                overlayElement.querySelector(".AdaptiveMedia-container")
                || document.querySelector(".AdaptiveMedia-container") 
                || document.querySelector(".tweet-details-fixer") 
                || document.querySelector("#stream-items-id > .js-stream-item");
            v = findTwitterVideoElement();

            if(twitterAppendTo && twitterAppendTo.parentNode) {
                twitterAppendTo.parentNode.style.overflow = "visible";
            }
        } 


        function getSpecialCaseCSS() {
            let cssText = "z-index: 100;",
                hostname = location.hostname;

            if(/dailymotion\.com/.test(hostname)) {
                cssText = "z-index: 10000;"
            } else if(/instagram\.com/.test(hostname)) {
                cssText += "position: fixed; top: 0;"
            }
            return cssText;
        }

        function findTwitterVideoElement() {
            var dialog = document.getElementById("permalink-overlay-dialog");
            if(dialog) {
                return dialog.querySelector("video");
            }
            return v;
        }
        
        if(artistworksMessageCaption) {
            showArtistworksMessageCaption(artistworksMessageCaption);
        }

        appendTo = (doc.querySelector("#content #container")
        || doc.getElementById("watch-header"))  // YT

        || doc.getElementById("player-focus-control") 
        || fbButtonsDiv 
        || artistworksDiv || artistworksMessageCaption
        || vimeoAppendTo 
        || twitterAppendTo
//        || document.querySelector(".np_ControlsManager")
        || doc.body;

        if(!appendTo || appendTo.querySelector("#speed-slider")) return;

        if(fbButtonsDiv) {
            fbButtonsDiv.style.position = "relative";
        }

        const FIELDSET = makeFieldset(appendTo);

        if(location.hostname == "twitter.com") {
            positionForTwitter(appendTo);
        } else if(v.parentNode  == document.body) {
            positionForStandalone(appendTo);
            v.style.width = "95%";
        }

        var speedSlider = makeSpeedSlider(v, FIELDSET);
        var pitchSlider = makePitchSlider(v, FIELDSET);
        if(pitchSlider) {
            mutuallyExclude(pitchSlider, speedSlider, v);
        }

        appendTo = null;

        function mutuallyExclude(pitchSlider, speedSlider, v) {
            pitchSlider.addEventListener("input", function(){
                setPercentText(speedSlider, "-");
                pitchSlider.parentNode.style.opacity = 1; 
                speedSlider.parentNode.style.opacity = .6; 
            });
            speedSlider.addEventListener("input", function(){
                resetPitchSlider();
                sliderInput(pitchSlider, v);
                sliderInput(speedSlider, v);
                speedSlider.parentNode.style.opacity = 1; 
                pitchSlider.parentNode.style.opacity = .6; 
            });
        }    

        function resetPitchSlider() {
            pitchSlider.value = 1;
            resetPreservesPitch();
        }

        function makeVideoSlider(text, v) {
            var label = doc.createElement("label");
            label.style.cssText = "display:block;font-weight:bold";
            label.innerHTML = text + " <input type=\"range\" value=1 " 
                + "style='vertical-align:middle'> "
                + "<b id='SPControlPercentText' "
                + " style='display:inline-block; width: 3.3em'>100%</b>"; 
            var i = label.firstElementChild;
            i.oninput= function(){ sliderInput(i, v) };
            setTimeout(function(){ i.value = 1; i.oninput()}, 10);
            return label;
        }

        function sliderInput(i, v) {
            // Format to at most one decimal point of precision.
            var data=(1000*(v.playbackRate=i.value)|0)/10+"%";
            setPercentText(i, data);
        }

        function makeSpeedSlider(v, fieldset,l,i) {
            l = makeVideoSlider("Speed", v);
            l.id="speed-slider";
            i = l.firstElementChild;
            i.min=.5;
            i.step=.05;
            i.max = 1;
            fieldset.insertBefore(l, fieldset.firstChild);
            i.addEventListener("input", resetPreservesPitch);
            return i;
        }

        function resetPreservesPitch() {
            if(!pitchSlider) {
                return (resetPreservesPitch = Function.prototype)();
            }
            v[PRESERVES_PITCH] = 1;
        };

        function makePitchSlider(v, fieldset,l,i) {
            if(!PRESERVES_PITCH) return;

            l = makeVideoSlider("Pitch", v);
            i = l.firstElementChild;
            i.min=.7;
            i.max=1.1;
            i.value = 1;
            i.step=.005;
            fieldset.insertBefore(l, fieldset.firstChild);
            i.addEventListener("input", function() {
                v[PRESERVES_PITCH] = 0;
            });
            return i;
        }

        function makeFieldset(appendTo) {
            var fieldsetLocal = doc.createElement("fieldset");
            fieldsetLocal.id = "SPControlFieldset";
            fieldsetLocal.style.cssText = "position: relative;"
            + "border: 3px groove #eee; background: #e3e3e3;" 
            + "box-sizing: border-box; white-space: nowrap;"
            + "padding: 3px; "
            + "; " + getSpecialCaseCSS();


            var legend = doc.createElement("legend");
            legend.textContent = "Pitch & Speed Controls";
            legend.style.cssText = "background: inherit;"
            fieldsetLocal.appendChild(legend);
            appendTo.insertBefore(fieldsetLocal, appendTo.firstChild);
            return fieldsetLocal;
        }

        function positionForTwitter() {
            FIELDSET.style.cssText += 
            "position: absolute; top: -40px; z-index: 100;"
        }

        function positionForStandalone() {
            FIELDSET.style.cssText += 
            "top: -33px;";

        }

        function setPercentText(i, val) {
            let percentText = document.getElementById("SPControlPercentText");
            if(percentText) {
                percentText.textContent = val;
            }
        }

        function getPreservesPitch(v) {
            return "preservesPitch" in v ? "preservesPitch" : "mozPreservesPitch" in v ? 
              "mozPreservesPitch" : "webkitPreservesPitch" in v ? "webkitPreservesPitch" : ""; 
        }

        function showArtistworksMessageCaption(amc) {
            amc.style.cssText = "display:block; bottom: 10px";
        }

        function removeAnyPriorSC() {
            var fieldset = document.getElementById("SPControlFieldset");
            if(fieldset && fieldset.remove) {
                fieldset.remove();
            }
        }
    }
).call(window);