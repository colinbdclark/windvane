"use strict";

var fluid = require("infusion"),
    windvane = fluid.registerNamespace("windvane");

require("infusion-electron");
require("./config.js");

fluid.defaults("windvane.app", {
    gradeNames: "electron.app",

    commandLineSwitches: {
        "disable-renderer-backgrounding": null
    },

    env: {
        appRoot: "@expand:windvane.app.getRootPath()"
    },

    components: {
        audioPlayer: {
            createOnEvent: "onReady",
            type: "windvane.audioWindow"
        },

        tracker: {
            createOnEvent: "onCreateTracker",
            type: "windvane.trackingWindow"
        }
    },

    events: {
        onCreateTracker: null
    },

    listeners: {
        onReady: [
            "{that}.events.onCreateTracker.fire()"
        ]
    }
});

windvane.app.getRootPath = function () {
    return "file://" + process.cwd();
};
