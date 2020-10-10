// @ts-off

import * as React from "react"
export default class SpeechTest extends React.Component {
	public voice: SpeechSynthesisVoice
	public render() {
		return (<main>
				<div className="field">
					<label htmlFor="speech">Type something</label>
					<input type="text" name="speech" id="speech" required />
				</div>
				<div className="field">
					<label htmlFor="voices">Choose a voice</label>
					<select name="voices" id="voices"></select>
				</div>
				<button id="butt">Say it!</button>
				<p>
					See how to build this application in this post on <a href="https://www.twilio.com/blog/speech-to-text-browser-web-speech-api">speech to text in the browser with the Web Speech API</a>.
        </p>
		</main>)
	}
	public say(this: SpeechTest, text: string) {
		const utterance = new SpeechSynthesisUtterance(text);
		utterance.voice = this.voice;
		utterance.addEventListener('start', event => {
			console.log("started speaking")
		});
		utterance.addEventListener('end', event => {
			console.log("stopped speaking")
		});
		speechSynthesis.speak(utterance);
	}
	constructor(props: any) {
		super(props)
		window.onload = () => {

			const button = document.getElementById('butt') as HTMLButtonElement;
			const input = document.getElementById('speech') as HTMLInputElement;
			const main = document.getElementsByTagName('main')[0];
			const voiceSelect = document.getElementById('voices') as HTMLSelectElement;
			let voices;
			let currentVoice;

			const populateVoices = () => {
				const availableVoices = speechSynthesis.getVoices();
				voiceSelect.innerHTML = '';

				availableVoices.forEach(voice => {
					const option = document.createElement('option');
					let optionText = `${voice.name} (${voice.lang})`;
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
			console.log(voices)
			if (speechSynthesis.onvoiceschanged !== undefined) {
				speechSynthesis.onvoiceschanged = populateVoices;
			}
			voiceSelect.onchange = (event) => {
				console.log(event)
				const selectedIndex = voiceSelect.selectedIndex;
				currentVoice = voices[selectedIndex];
			}
			//currentVoice = voices[16]
			button.onclick = () => {
				const toSay = input.value.trim();
				this.say(toSay)
			}
			
			console.log("loaded")
			var recognition = new window["webkitSpeechRecognition"]();
			recognition.continuous = true;
			recognition.interimResults = true;

			recognition.onstart = function () {
				console.log("onstart")
			};

			recognition.onerror = function (event) {
				console.log("onerror")
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
				console.log("onend")
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
				console.log("onresult")
				var interim_transcript = '';
				let final_transcript = ""
				for (var i = event.resultIndex; i < event.results.length; ++i) {
					if (event.results[i].isFinal) {
						final_transcript += event.results[i][0].transcript;
					} else {
						interim_transcript += event.results[i][0].transcript;
					}
				}
				console.log(interim_transcript)
				console.log(final_transcript)

				input.value = final_transcript
				/*final_transcript = capitalize(final_transcript);
				final_span.innerHTML = linebreak(final_transcript);
				interim_span.innerHTML = linebreak(interim_transcript);
				if (final_transcript || interim_transcript) {
					showButtons('inline-block');
				}*/
			};

			


			window['recognition'] = recognition
			setTimeout(() => {
				recognition.lang = ['ru-RU'];
				recognition.start()
			}, 100)
		}
	}
}
