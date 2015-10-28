var fluid = require("infusion");

require("./src/app/audio-window.js");
require("./src/app/tracker-window.js");
require("./src/app/windvane-app.js");

var windvane = fluid.registerNamespace("windvane");

windvane.app();
