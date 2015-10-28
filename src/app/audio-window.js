"use strict";

var fluid = require("infusion"),
    electron = require("infusion-electron");

fluid.defaults("windvane.audioWindow", {
    gradeNames: "electron.unthrottledWindow",

    windowOptions: {
        title: "Audio"
    },

    model: {
        url: {
            expander: {
                funcName: "fluid.stringTemplate",
                args: ["{windvane.config}.options.audioWindowURL", "{app}.options.env"]
            }
        },

        dimensions: {
            width: 100,
            height: 100
        }
    },

    components: {
        frontRelayer: {
            type: "windvane.audioWindow.relayer",
            options: {
                channel: "frontMotion"
            }
        },

        backRelayer: {
            type: "windvane.audioWindow.relayer",
            options: {
                channel: "backMotion"
            }
        }
    },

    listeners: {
        onClose: [
            "{frontRelayer}.stop()",
            "{backRelayer}.stop()"
        ]
    }
});

fluid.defaults("windvane.audioWindow.relayer", {
    gradeNames: "electron.ipcMessageRelayer",

    channel: "motion",

    members: {
        source: electron.ipc,
        target: "{audioWindow}.win"
    }
});
