/*global fluid*/

(function () {
    "use strict";

    fluid.defeatLogging = true;

    fluid.defaults("windvane.motionTracker", {
        gradeNames: ["fisher.motionTracker", "electron.ipcComponent"],

        channel: "motion",

        source: {
            name: "FaceTime HD Camera"
        },

        components: {
            streamer: {
                options: {
                    source: "{motionTracker}.options.source"
                }
            }
        },

        listeners: {
            onMotionUpdate: [
                {
                    func: "{that}.send"
                }
            ]
        }
    });

    fluid.defaults("windvane.frontMotionTracker", {
        gradeNames: "windvane.motionTracker",

        channel: "frontMotion",

        source: {
            name: "Microsoft® LifeCam Studio(TM) #3 (045e:0772)"
        }
    });

    fluid.defaults("windvane.backMotionTracker", {
        gradeNames: "windvane.motionTracker",

        channel: "backMotion",

        source: {
            name: "Microsoft® LifeCam Studio(TM) #4 (045e:0772)"
        }
    });

    fluid.defaults("windvane.stereoMotionSource", {
        gradeNames: "fluid.modelComponent",

        components: {
            front: {
                type: "windvane.frontMotionTracker"
            }
        }
    });

    fluid.defaults("windvane.quadraphonicMotionSource", {
        gradeNames: "windvane.stereoMotionSource",

        events: {
            onFirstStreamConnected: null
        },

        components: {
            front: {
                options: {
                    components: {
                        streamer: {
                            options: {
                                events: {
                                    onStreamConnected: "{quadraphonicMotionSource}.events.onFirstStreamConnected"
                                }
                            }
                        }
                    }
                }
            },

            back: {
                createOnEvent: "onFirstStreamConnected",
                type: "windvane.backMotionTracker"
            }
        }
    });
}());
