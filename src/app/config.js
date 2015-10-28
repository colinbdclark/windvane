"use strict";

var path = require("path"),
    fluid = require("infusion"),
    windvane = fluid.registerNamespace("windvane");

fluid.defaults("windvane.config", {
    gradeNames: ["fluid.component", "fluid.resolveRootSingle"],
    singleRootType: "windvane.config"
});

windvane.config.getConfigPathArgument = function () {
    var args = process.argv.slice(2);
    return args.length > 0 ? args[0] : undefined;
};

windvane.config.loadConfigOptions = function (configName) {
    if (!configName) {
        configName = "default";
    }

    var firstSepIdx = configName.indexOf(path.sep),
        configPath;

    if (firstSepIdx === 0) {
        // Absolute path.
        // TODO: This will fail on Windows if the config is on a different volume.
        configPath = configName;
    } else {
        configPath = process.cwd();
        if (configName.indexOf(".json") < 0 && firstSepIdx < 0) {
            // We've got a plain config name.
            // Load the file from the default directory.
            configName += ".json";
            configPath += "/configs/";
        }
        configPath += configName;
    }

    console.log("Loading app configuration file from " + configPath);

    var options = require(configPath);
    return options;
};

var configPath = windvane.config.getConfigPathArgument(),
    configOptions = windvane.config.loadConfigOptions(configPath);

windvane.config(configOptions);
