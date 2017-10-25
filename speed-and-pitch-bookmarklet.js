(
    function(v,n) {

        var doc = this.contentDocument || this.document;

        if(!v) v = doc.querySelector("video");
        if(!v) return;

        var fbButtonsDiv = doc.getElementById("fbPhotoPageButtons");
        var artistworksDiv = doc.getElementById("playlist0");
        var artistworksMessageCaption = doc.getElementById("msg-expanded");
        var vimeoAppendTo = document.querySelector(".player_outro_area");

        if("twitter.com" == location.hostname) {
            var twitterAppendTo = document.querySelector(".tweet-details-fixer") 
              || document.querySelector("#stream-items-id > .js-stream-item");
            v = findTwitterVideoElement();
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

        n = doc.getElementById("watch-header")
        || doc.getElementById("player-focus-control") 
        || fbButtonsDiv 
        || artistworksDiv || artistworksMessageCaption
        || vimeoAppendTo 
        || twitterAppendTo
        || doc.body;

        if(!n || n.querySelector("#speed-slider")) return;

        if(fbButtonsDiv) {
            fbButtonsDiv.style.position = "relative";
        }

        n = makeFieldset(n);

        if(location.hostname == "twitter.com") {
            positionForTwitter(n);
        } else if(v.parentNode  == document.body){
            positionForStandalone(n);
            v.style.width = "95%";
        }

        var PRESERVES_PITCH = getPreservesPitch(v);

        var speedSlider = makeSpeedSlider(v,n);
        var pitchSlider = makePitchSlider(v,n);
        if(pitchSlider) {
            mutuallyExclude(pitchSlider, speedSlider, v);
        }

        v = n = null;

        function mutuallyExclude(pitchSlider, speedSlider, v) {
            pitchSlider.addEventListener("input", function(){
                setPercentText(speedSlider, "-");
                pitchSlider.parentNode.style.opacity = 1; 
                speedSlider.parentNode.style.opacity = .6; 
            });
            speedSlider.addEventListener("input", function(){
                pitchSlider.value = 1;
                sliderInput(speedSlider, v);
                speedSlider.parentNode.style.opacity = 1; 
                pitchSlider.parentNode.style.opacity = .6; 
            });
        }    

        function makeVideoSlider(text, v) {
            var label = doc.createElement("label");
            label.style.cssText = "display:block;font-weight:bold";
            label.innerHTML = text + " <input type=\"range\" value=1> . "; 
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

        function makeSpeedSlider(v,n,l,i) {
            l = makeVideoSlider("Speed", v);
            l.id="speed-slider";
            i = l.firstElementChild;
            i.min=.5;
            i.step=.05;
            i.max = 1;
            n.insertBefore(l, n.firstChild);
            i.addEventListener("input", resetPreservesPitch);
            return i;
        }

        function resetPreservesPitch() {
            if(!pitchSlider) {
                return (resetPreservesPitch = Function.prototype)();
            }
            v[PRESERVES_PITCH] = 1;
        };

        function makePitchSlider(v,n,l,i) {
            if(!PRESERVES_PITCH) return;

            l = makeVideoSlider("Pitch", v);
            i = l.firstElementChild;
            i.min=.7;
            i.max=1.1;
            i.value = 1;
            i.step=.005;
            n.insertBefore(l, n.firstChild);
            i.addEventListener("input", function() {
                v[PRESERVES_PITCH] = 0;
            });
            return i;
        }

        function makeFieldset() {
            var fieldset = doc.createElement("fieldset");
            fieldset.style.cssText = 
            "border: 3px groove #eee;background: #e3e3e3; padding: 3px";
            var legend = doc.createElement("legend");
            legend.textContent = "Pitch & Speed Controls";
            legend.style.cssText = "background: inherit;"
            fieldset.appendChild(legend);
            n.insertBefore(fieldset, n.firstChild);

            return fieldset;
        }

        function positionForTwitter(fieldset) {
            fieldset.style.cssText += 
            "position: absolute; top: -7px; left: -7px; z-index: 100;"
        }

        function positionForStandalone(fieldset) {
            fieldset.style.cssText += 
            "position: relative; top: -33px;";

        }

        function setPercentText(i, val) {
            return i.nextSibling.data = val;
        }

        function getPreservesPitch(v) {
            return "preservesPitch" in v ? "preservesPitch" : "mozPreservesPitch" in v ? 
              "mozPreservesPitch" : "webkitPreservesPitch" in v ? "webkitPreservesPitch" : ""; 
        }

        function showArtistworksMessageCaption(amc) {
            amc.style.cssText = "display:block; bottom: 10px";
        }
    }
).call(window);