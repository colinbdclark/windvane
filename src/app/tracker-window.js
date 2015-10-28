"use strict";

var fluid = require("infusion");
require("infusion-electron");

fluid.defaults("windvane.trackingWindow", {
    gradeNames: "electron.unthrottledWindow",

    windowOptions: {
        title: "Motion tracker"
    },

    model: {
        url: {
            expander: {
                funcName: "fluid.stringTemplate",
                args: ["{windvane.config}.options.trackerWindowURL", "{app}.options.env"]
            }
        },

        dimensions: {
            width: 640,
            height: 480
        }
    }
});
