/*global fluid*/

(function () {
    "use strict";

    fluid.defaults("windvane.motionResponder", {
        gradeNames: ["electron.ipcComponent", "fluid.modelComponent"],

        channel: "motion",

        model: {
            leftMotion: 0,
            rightMotion: 0
        },

        listeners: {
            onMessage: [
                {
                    func: "{that}.applier.change",
                    args: [
                        "",
                        {
                            leftMotion: "{arguments}.1",
                            rightMotion: "{arguments}.2"
                        }
                    ]
                }
            ]
        }
    });


    fluid.defaults("windvane.frontMotionResponder", {
        gradeNames: "windvane.motionResponder",

        channel: "frontMotion"
    });

    fluid.defaults("windvane.backMotionResponder", {
        gradeNames: "windvane.motionResponder",

        channel: "backMotion"
    });


    /**
     * Base motion grade that only relays the "front" model.
     */
    fluid.defaults("windvane.motionTarget", {
        gradeNames: "fluid.modelComponent",

        model: {
            front: {
                leftMotion: 0,
                rightMotion: 0
            },

            back: {
                leftMotion: 0,
                rightMotion: 0
            }
        },

        components: {
            front: {
                type: "windvane.frontMotionResponder",
                options: {
                    model: "{motionTarget}.model.front"
                }
            }
        }
    });


    /**
     * A single-camera motion component, which
     * relays the camera's left and right motion values
     * to both the front and back models,
     * simulating a quadraphonic source of motion data.
     */
    fluid.defaults("windvane.stereoToQuadMotionTarget", {
        gradeNames: "windvane.motionTarget",

        model: {
            back: {
                leftMotion: "{stereoToQuadMotionTarget}.model.front.leftMotion",
                rightMotion: "{stereoToQuadMotionTarget}.model.front.rightMotion"
            }
        }
    });

    /**
     * A two-camera motion component consisting of two separate
     * motion responders, representing the front and back view
     * of the room.
     */
    fluid.defaults("windvane.quadraphonicMotionTarget", {
        gradeNames: "windvane.motionTarget",

        model: {
            front: {
                leftMotion: 0,
                rightMotion: 0
            },

            back: {
                leftMotion: 0,
                rightMotion: 0
            }
        },

        components: {
            back: {
                type: "windvane.backMotionResponder",
                options: {
                    model: "{quadraphonicMotionTarget}.model.back"
                }
            }
        }
    });
}());
