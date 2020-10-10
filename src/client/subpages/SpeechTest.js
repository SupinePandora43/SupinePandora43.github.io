"use strict";
// @ts-off
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var SpeechTest = /** @class */ (function (_super) {
    __extends(SpeechTest, _super);
    function SpeechTest(props) {
        var _this = _super.call(this, props) || this;
        window.onload = function () {
            var button = document.getElementById('butt');
            var input = document.getElementById('speech');
            var main = document.getElementsByTagName('main')[0];
            var voiceSelect = document.getElementById('voices');
            var voices;
            var currentVoice;
            var populateVoices = function () {
                var availableVoices = speechSynthesis.getVoices();
                voiceSelect.innerHTML = '';
                availableVoices.forEach(function (voice) {
                    var option = document.createElement('option');
                    var optionText = voice.name + " (" + voice.lang + ")";
                    if (voice.default) {
                        optionText += ' [default]';
                        if (typeof currentVoice === 'undefined') {
                            currentVoice = voice;
                            option.selected = true;
                        }
                    }
                    if (currentVoice === voice) {
                        option.selected = true;
                    }
                    option.textContent = optionText;
                    voiceSelect.appendChild(option);
                });
                voices = availableVoices;
            };
            populateVoices();
            console.log(voices);
            if (speechSynthesis.onvoiceschanged !== undefined) {
                speechSynthesis.onvoiceschanged = populateVoices;
            }
            voiceSelect.onchange = function (event) {
                console.log(event);
                var selectedIndex = voiceSelect.selectedIndex;
                currentVoice = voices[selectedIndex];
            };
            //currentVoice = voices[16]
            button.onclick = function () {
                var toSay = input.value.trim();
                _this.say(toSay);
            };
            console.log("loaded");
            var recognition = new window["webkitSpeechRecognition"]();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.onstart = function () {
                console.log("onstart");
            };
            recognition.onerror = function (event) {
                console.log("onerror");
                /*if (event.error == 'no-speech') {
                    start_img.src = 'mic.gif';
                    showInfo('info_no_speech');
                    ignore_onend = true;
                }
                if (event.error == 'audio-capture') {
                    start_img.src = 'mic.gif';
                    showInfo('info_no_microphone');
                    ignore_onend = true;
                }
                if (event.error == 'not-allowed') {
                    if (event.timeStamp - start_timestamp < 100) {
                        showInfo('info_blocked');
                    } else {
                        showInfo('info_denied');
                    }
                    ignore_onend = true;
                }*/
            };
            recognition.onend = function () {
                console.log("onend");
                /*recognizing = false;
                if (ignore_onend) {
                    return;
                }
                start_img.src = 'mic.gif';
                if (!final_transcript) {
                    showInfo('info_start');
                    return;
                }
                showInfo('');
                if (window.getSelection) {
                    window.getSelection().removeAllRanges();
                    var range = document.createRange();
                    range.selectNode(document.getElementById('final_span'));
                    window.getSelection().addRange(range);
                }
                if (create_email) {
                    create_email = false;
                    createEmail();
                }*/
            };
            recognition.onresult = function (event) {
                console.log("onresult");
                var interim_transcript = '';
                var final_transcript = "";
                for (var i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        final_transcript += event.results[i][0].transcript;
                    }
                    else {
                        interim_transcript += event.results[i][0].transcript;
                    }
                }
                console.log(interim_transcript);
                console.log(final_transcript);
                input.value = final_transcript;
                /*final_transcript = capitalize(final_transcript);
                final_span.innerHTML = linebreak(final_transcript);
                interim_span.innerHTML = linebreak(interim_transcript);
                if (final_transcript || interim_transcript) {
                    showButtons('inline-block');
                }*/
            };
            window['recognition'] = recognition;
            setTimeout(function () {
                recognition.lang = ['ru-RU'];
                recognition.start();
            }, 100);
        };
        return _this;
    }
    SpeechTest.prototype.render = function () {
        return (React.createElement("main", null,
            React.createElement("div", { className: "field" },
                React.createElement("label", { htmlFor: "speech" }, "Type something"),
                React.createElement("input", { type: "text", name: "speech", id: "speech", required: true })),
            React.createElement("div", { className: "field" },
                React.createElement("label", { htmlFor: "voices" }, "Choose a voice"),
                React.createElement("select", { name: "voices", id: "voices" })),
            React.createElement("button", { id: "butt" }, "Say it!"),
            React.createElement("p", null,
                "See how to build this application in this post on ",
                React.createElement("a", { href: "https://www.twilio.com/blog/speech-to-text-browser-web-speech-api" }, "speech to text in the browser with the Web Speech API"),
                ".")));
    };
    SpeechTest.prototype.say = function (text) {
        var utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = this.voice;
        utterance.addEventListener('start', function (event) {
            console.log("started speaking");
        });
        utterance.addEventListener('end', function (event) {
            console.log("stopped speaking");
        });
        speechSynthesis.speak(utterance);
    };
    return SpeechTest;
}(React.Component));
exports.default = SpeechTest;
//# sourceMappingURL=SpeechTest.js.map