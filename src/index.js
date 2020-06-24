"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
//import App from './App';
//import './stylus/index.styl';
var Main_1 = require("./client/Main");
var registerServiceWorker_1 = require("./registerServiceWorker");
//import anime from 'animejs'
ReactDOM.render(React.createElement(Main_1.default, null, null), document.getElementById('root'));
/*anime({
    targets: '.App-logo',
    rotate: [0, 360],
    loop: true,
    delay: 0,
    duration: 30000,
    easing: 'linear'
})
*/
registerServiceWorker_1.default();
//# sourceMappingURL=index.js.map