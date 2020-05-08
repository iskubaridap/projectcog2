/*jslint */
/*global AdobeEdge: false, window: false, document: false, console:false, alert: false */
(function (compId) {

    "use strict";
    var im='images/',
        aud='media/',
        vid='media/',
        js='js/',
        fonts = {
            'Lato': 'https://fonts.googleapis.com/css?family=Lato:400,700,300,100,100italic,300italic,400italic,700italic,900,900italic',
            'Lato2': '<link href=\'https://fonts.googleapis.com/css?family=Lato\' rel=\'stylesheet\' type=\'text/css\'>'        },
        opts = {
            'gAudioPreloadPreference': 'auto',
            'gVideoPreloadPreference': 'auto'
        },
        resources = [
        ],
        scripts = [
        ],
        symbols = {
            "stage": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "horizontal",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            id: 'Text2',
                            type: 'text',
                            rect: ['21.7%', '87.1%', 'auto', 'auto', 'auto', 'auto'],
                            text: "<p style=\"margin: 0px;\">​Imagination, meet innovation. You two should get along just fine.</p>",
                            align: "left",
                            font: ['Lato', [30, "px"], "rgba(88,75,79,1.00)", "300", "none", "normal", "break-word", "nowrap"],
                            textStyle: ["", "", "", "", "none"]
                        },
                        {
                            id: 'logo',
                            type: 'image',
                            rect: ['600px', '14px', '20%', '72.5%', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"logo.svg",'50%','50%','300px','399px', 'no-repeat'],
                            transform: [[],['-31']]
                        },
                        {
                            id: 'Text',
                            type: 'text',
                            rect: ['36.9%', '66.4%', 'auto', 'auto', 'auto', 'auto'],
                            text: "<p style=\"margin: 0px;\">​Project Cog</p>",
                            font: ['Lato', [80, "px"], "rgba(88,75,79,1.00)", "900", "none", "", "break-word", "nowrap"]
                        },
                        {
                            id: 'wholeArm',
                            symbolName: 'wholeArm',
                            type: 'rect',
                            rect: ['217px', '0px', '231', '278', 'auto', 'auto'],
                            transform: [[],['90']]
                        }
                    ],
                    style: {
                        '${Stage}': {
                            isStage: true,
                            rect: [undefined, undefined, '1500px', '550px'],
                            overflow: 'hidden',
                            fill: ["rgba(255,255,255,1)"]
                        }
                    }
                },
                timeline: {
                    duration: 5000,
                    autoPlay: true,
                    data: [
                        [
                            "eid654",
                            "rotateZ",
                            0,
                            1000,
                            "easeInOutQuad",
                            "${wholeArm}",
                            '90deg',
                            '0deg'
                        ],
                        [
                            "eid1958",
                            "rotateZ",
                            0,
                            0,
                            "easeInOutQuad",
                            "${logo}",
                            '-31deg',
                            '-31deg'
                        ],
                        [
                            "eid2659",
                            "rotateZ",
                            2785,
                            1215,
                            "easeInOutQuad",
                            "${logo}",
                            '-31deg',
                            '0deg'
                        ],
                        [
                            "eid2661",
                            "rotateZ",
                            5000,
                            0,
                            "easeInOutQuad",
                            "${logo}",
                            '0deg',
                            '0deg'
                        ],
                        [
                            "eid650",
                            "-webkit-transform-origin",
                            0,
                            0,
                            "linear",
                            "${wholeArm}",
                            [73.74,12.95],
                            [73.74,12.95],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ],
                        [
                            "eid18200",
                            "-moz-transform-origin",
                            0,
                            0,
                            "linear",
                            "${wholeArm}",
                            [73.74,12.95],
                            [73.74,12.95],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ],
                        [
                            "eid18201",
                            "-ms-transform-origin",
                            0,
                            0,
                            "linear",
                            "${wholeArm}",
                            [73.74,12.95],
                            [73.74,12.95],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ],
                        [
                            "eid18202",
                            "msTransformOrigin",
                            0,
                            0,
                            "linear",
                            "${wholeArm}",
                            [73.74,12.95],
                            [73.74,12.95],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ],
                        [
                            "eid18203",
                            "-o-transform-origin",
                            0,
                            0,
                            "linear",
                            "${wholeArm}",
                            [73.74,12.95],
                            [73.74,12.95],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ],
                        [
                            "eid18204",
                            "transform-origin",
                            0,
                            0,
                            "linear",
                            "${wholeArm}",
                            [73.74,12.95],
                            [73.74,12.95],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ],
                        [
                            "eid2102",
                            "left",
                            1000,
                            1000,
                            "easeInOutQuad",
                            "${wholeArm}",
                            '301px',
                            '360px'
                        ],
                        [
                            "eid2594",
                            "left",
                            2785,
                            1215,
                            "easeInOutSine",
                            "${wholeArm}",
                            '360px',
                            '217px'
                        ],
                        [
                            "eid653",
                            "top",
                            0,
                            1000,
                            "linear",
                            "${wholeArm}",
                            '-107px',
                            '0px'
                        ]
                    ]
                }
            },
            "claw": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['32px', '0px', '47px', '20px', 'auto', 'auto'],
                            id: 'topclaw2',
                            transform: [[], ['2']],
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/topclaw.svg', '0px', '0px']
                        },
                        {
                            rect: ['29px', '24px', '47px', '17px', 'auto', 'auto'],
                            id: 'bottomClaw2',
                            transform: [[], ['17']],
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/bottomClaw.svg', '0px', '0px']
                        },
                        {
                            id: 'clawJoint4',
                            type: 'image',
                            rect: ['0px', '1px', '50px', '34px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/clawJoint.svg', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            isStage: 'true',
                            rect: [undefined, undefined, '79px', '41px']
                        }
                    }
                },
                timeline: {
                    duration: 4005,
                    autoPlay: true,
                    data: [
                        [
                            "eid2198",
                            "rotateZ",
                            1005,
                            995,
                            "easeInOutQuad",
                            "${topclaw2}",
                            '0deg',
                            '-39deg'
                        ],
                        [
                            "eid2321",
                            "rotateZ",
                            2700,
                            105,
                            "easeInOutQuad",
                            "${topclaw2}",
                            '-39deg',
                            '-32deg'
                        ],
                        [
                            "eid11824",
                            "rotateZ",
                            2805,
                            620,
                            "easeInQuad",
                            "${topclaw2}",
                            '-32deg',
                            '7deg'
                        ],
                        [
                            "eid12668",
                            "rotateZ",
                            3425,
                            120,
                            "easeOutQuad",
                            "${topclaw2}",
                            '7deg',
                            '11deg'
                        ],
                        [
                            "eid12607",
                            "rotateZ",
                            3545,
                            460,
                            "easeOutQuad",
                            "${topclaw2}",
                            '11deg',
                            '-31deg'
                        ],
                        [
                            "eid2199",
                            "rotateZ",
                            1005,
                            995,
                            "easeInOutQuad",
                            "${bottomClaw2}",
                            '0deg',
                            '37deg'
                        ],
                        [
                            "eid2322",
                            "rotateZ",
                            2700,
                            110,
                            "easeInQuad",
                            "${bottomClaw2}",
                            '37deg',
                            '28deg'
                        ],
                        [
                            "eid8521",
                            "rotateZ",
                            2810,
                            0,
                            "easeInOutSine",
                            "${bottomClaw2}",
                            '28deg',
                            '28deg'
                        ],
                        [
                            "eid13269",
                            "rotateZ",
                            2980,
                            160,
                            "easeInOutSine",
                            "${bottomClaw2}",
                            '28deg',
                            '39deg'
                        ],
                        [
                            "eid17898",
                            "rotateZ",
                            3140,
                            120,
                            "easeOutSine",
                            "${bottomClaw2}",
                            '39deg',
                            '55deg'
                        ],
                        [
                            "eid14415",
                            "rotateZ",
                            3260,
                            215,
                            "easeInOutSine",
                            "${bottomClaw2}",
                            '55deg',
                            '81deg'
                        ],
                        [
                            "eid18019",
                            "rotateZ",
                            3475,
                            145,
                            "easeOutSine",
                            "${bottomClaw2}",
                            '81deg',
                            '76deg'
                        ],
                        [
                            "eid15737",
                            "rotateZ",
                            3620,
                            380,
                            "easeOutSine",
                            "${bottomClaw2}",
                            '76deg',
                            '17deg'
                        ],
                        [
                            "eid2167",
                            "-webkit-transform-origin",
                            1005,
                            0,
                            "easeInOutQuad",
                            "${topclaw2}",
                            [13.47,63.33],
                            [13.47,63.33],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ],
                        [
                            "eid18205",
                            "-moz-transform-origin",
                            1005,
                            0,
                            "easeInOutQuad",
                            "${topclaw2}",
                            [13.47,63.33],
                            [13.47,63.33],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ],
                        [
                            "eid18206",
                            "-ms-transform-origin",
                            1005,
                            0,
                            "easeInOutQuad",
                            "${topclaw2}",
                            [13.47,63.33],
                            [13.47,63.33],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ],
                        [
                            "eid18207",
                            "msTransformOrigin",
                            1005,
                            0,
                            "easeInOutQuad",
                            "${topclaw2}",
                            [13.47,63.33],
                            [13.47,63.33],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ],
                        [
                            "eid18208",
                            "-o-transform-origin",
                            1005,
                            0,
                            "easeInOutQuad",
                            "${topclaw2}",
                            [13.47,63.33],
                            [13.47,63.33],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ],
                        [
                            "eid18209",
                            "transform-origin",
                            1005,
                            0,
                            "easeInOutQuad",
                            "${topclaw2}",
                            [13.47,63.33],
                            [13.47,63.33],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ],
                        [
                            "eid2166",
                            "-webkit-transform-origin",
                            1005,
                            0,
                            "easeInOutQuad",
                            "${bottomClaw2}",
                            [13.47,23.53],
                            [13.47,23.53],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ],
                        [
                            "eid18210",
                            "-moz-transform-origin",
                            1005,
                            0,
                            "easeInOutQuad",
                            "${bottomClaw2}",
                            [13.47,23.53],
                            [13.47,23.53],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ],
                        [
                            "eid18211",
                            "-ms-transform-origin",
                            1005,
                            0,
                            "easeInOutQuad",
                            "${bottomClaw2}",
                            [13.47,23.53],
                            [13.47,23.53],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ],
                        [
                            "eid18212",
                            "msTransformOrigin",
                            1005,
                            0,
                            "easeInOutQuad",
                            "${bottomClaw2}",
                            [13.47,23.53],
                            [13.47,23.53],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ],
                        [
                            "eid18213",
                            "-o-transform-origin",
                            1005,
                            0,
                            "easeInOutQuad",
                            "${bottomClaw2}",
                            [13.47,23.53],
                            [13.47,23.53],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ],
                        [
                            "eid18214",
                            "transform-origin",
                            1005,
                            0,
                            "easeInOutQuad",
                            "${bottomClaw2}",
                            [13.47,23.53],
                            [13.47,23.53],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ]
                    ]
                }
            },
            "frontArm": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            id: 'ClawJointPipe2',
                            type: 'image',
                            rect: ['50px', '34px', '105px', '74px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/ClawJointPipe.svg', '0px', '0px']
                        },
                        {
                            id: 'elbow3',
                            type: 'image',
                            rect: ['0px', '0px', '143px', '108px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/elbow.svg', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            isStage: 'true',
                            rect: [undefined, undefined, '155px', '108px']
                        }
                    }
                },
                timeline: {
                    duration: 4000,
                    autoPlay: true,
                    data: [
                        [
                            "eid2813",
                            "top",
                            3005,
                            995,
                            "easeInOutQuad",
                            "${ClawJointPipe2}",
                            '34px',
                            '49px'
                        ],
                        [
                            "eid2812",
                            "left",
                            3005,
                            995,
                            "easeInOutQuad",
                            "${ClawJointPipe2}",
                            '50px',
                            '72px'
                        ]
                    ]
                }
            },
            "topArm": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['40px', '89px', '64px', '8px', 'auto', 'auto'],
                            transform: [[], ['31'], [], ['0.73438']],
                            id: 'Rectangle4',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            fill: ['rgba(192,192,192,1)']
                        },
                        {
                            id: 'elbowPipe2',
                            type: 'image',
                            rect: ['0px', '8px', '114px', '72px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/elbowPipe.svg', '0px', '0px']
                        },
                        {
                            id: 'armHydroPipe2',
                            type: 'image',
                            rect: ['80px', '30px', '74px', '42px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/armHydroPipe.svg', '0px', '0px']
                        },
                        {
                            id: 'forArmHydroPipeCover2',
                            type: 'image',
                            rect: ['46px', '72px', '40px', '34px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/forArmHydroPipeCover.svg', '0px', '0px']
                        },
                        {
                            id: 'mainArmHydroPipeCover2',
                            type: 'image',
                            rect: ['76px', '42px', '45px', '36px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/mainArmHydroPipeCover.svg', '0px', '0px']
                        },
                        {
                            id: 'mainArmCover4',
                            type: 'image',
                            rect: ['10px', '0px', '123px', '90px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/mainArmCover.svg', '0px', '0px']
                        },
                        {
                            id: 'baseBall3',
                            type: 'image',
                            rect: ['114px', '-31px', '53px', '73px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/baseBall.svg', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            isStage: 'true',
                            rect: [undefined, undefined, '154px', '109px']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [

                    ]
                }
            },
            "base": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            id: 'base3',
                            type: 'image',
                            rect: ['0px', '0px', '121px', '88px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/base.svg', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            isStage: 'true',
                            rect: [undefined, undefined, '121px', '137px']
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [

                    ]
                }
            },
            "wholeArm": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            type: 'rect',
                            id: 'arm2',
                            symbolName: 'arm',
                            transform: [[], ['-75']],
                            rect: ['0px', '96', '219', '182', 'auto', 'auto']
                        },
                        {
                            id: 'base4',
                            symbolName: 'base',
                            rect: ['110px', '0px', '121', '137', 'auto', 'auto'],
                            type: 'rect'
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            isStage: 'true',
                            rect: [undefined, undefined, '231px', '278px']
                        }
                    }
                },
                timeline: {
                    duration: 4120,
                    autoPlay: true,
                    data: [
                        [
                            "eid607",
                            "rotateZ",
                            0,
                            0,
                            "linear",
                            "${arm2}",
                            '26deg',
                            '26deg'
                        ],
                        [
                            "eid2320",
                            "rotateZ",
                            1750,
                            1035,
                            "easeInOutQuad",
                            "${arm2}",
                            '26deg',
                            '-20deg'
                        ],
                        [
                            "eid2595",
                            "rotateZ",
                            2785,
                            1215,
                            "easeInOutQuad",
                            "${arm2}",
                            '-20deg',
                            '-75deg'
                        ],
                        [
                            "eid605",
                            "-webkit-transform-origin",
                            0,
                            0,
                            "linear",
                            "${arm2}",
                            [78.08,-1.65],
                            [78.08,-1.65],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ],
                        [
                            "eid18215",
                            "-moz-transform-origin",
                            0,
                            0,
                            "linear",
                            "${arm2}",
                            [78.08,-1.65],
                            [78.08,-1.65],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ],
                        [
                            "eid18216",
                            "-ms-transform-origin",
                            0,
                            0,
                            "linear",
                            "${arm2}",
                            [78.08,-1.65],
                            [78.08,-1.65],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ],
                        [
                            "eid18217",
                            "msTransformOrigin",
                            0,
                            0,
                            "linear",
                            "${arm2}",
                            [78.08,-1.65],
                            [78.08,-1.65],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ],
                        [
                            "eid18218",
                            "-o-transform-origin",
                            0,
                            0,
                            "linear",
                            "${arm2}",
                            [78.08,-1.65],
                            [78.08,-1.65],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ],
                        [
                            "eid18219",
                            "transform-origin",
                            0,
                            0,
                            "linear",
                            "${arm2}",
                            [78.08,-1.65],
                            [78.08,-1.65],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ]
                    ]
                }
            },
            "arm": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            id: 'topArm2',
                            symbolName: 'topArm',
                            rect: ['30px', '0px', '154', '109', 'auto', 'auto'],
                            type: 'rect'
                        },
                        {
                            type: 'rect',
                            id: 'forArminner',
                            symbolName: 'forArminner',
                            transform: [[], ['6']],
                            rect: ['0', '57', '219', '125', 'auto', 'auto']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            isStage: 'true',
                            rect: [undefined, undefined, '219px', '182px']
                        }
                    }
                },
                timeline: {
                    duration: 4120,
                    autoPlay: true,
                    data: [
                        [
                            "eid2597",
                            "rotateZ",
                            3000,
                            1000,
                            "easeInOutExpo",
                            "${forArminner}",
                            '0deg',
                            '6deg'
                        ],
                        [
                            "eid615",
                            "-webkit-transform-origin",
                            0,
                            0,
                            "linear",
                            "${forArminner}",
                            [9.85,17.17],
                            [9.85,17.17],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ],
                        [
                            "eid18220",
                            "-moz-transform-origin",
                            0,
                            0,
                            "linear",
                            "${forArminner}",
                            [9.85,17.17],
                            [9.85,17.17],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ],
                        [
                            "eid18221",
                            "-ms-transform-origin",
                            0,
                            0,
                            "linear",
                            "${forArminner}",
                            [9.85,17.17],
                            [9.85,17.17],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ],
                        [
                            "eid18222",
                            "msTransformOrigin",
                            0,
                            0,
                            "linear",
                            "${forArminner}",
                            [9.85,17.17],
                            [9.85,17.17],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ],
                        [
                            "eid18223",
                            "-o-transform-origin",
                            0,
                            0,
                            "linear",
                            "${forArminner}",
                            [9.85,17.17],
                            [9.85,17.17],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ],
                        [
                            "eid18224",
                            "transform-origin",
                            0,
                            0,
                            "linear",
                            "${forArminner}",
                            [9.85,17.17],
                            [9.85,17.17],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ]
                    ]
                }
            },
            "forArminner": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            id: 'frontArm',
                            symbolName: 'frontArm',
                            rect: ['0px', '0px', '155', '108', 'auto', 'auto'],
                            type: 'rect'
                        },
                        {
                            type: 'rect',
                            id: 'claw2',
                            symbolName: 'claw',
                            transform: [[], ['83']],
                            rect: ['140px', '84px', '79', '41', 'auto', 'auto']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            isStage: 'true',
                            rect: [undefined, undefined, '219px', '125px']
                        }
                    }
                },
                timeline: {
                    duration: 4120,
                    autoPlay: true,
                    data: [
                        [
                            "eid617",
                            "-webkit-transform-origin",
                            0,
                            0,
                            "linear",
                            "${claw2}",
                            [21.52,43.9],
                            [21.52,43.9],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ],
                        [
                            "eid18225",
                            "-moz-transform-origin",
                            0,
                            0,
                            "linear",
                            "${claw2}",
                            [21.52,43.9],
                            [21.52,43.9],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ],
                        [
                            "eid18226",
                            "-ms-transform-origin",
                            0,
                            0,
                            "linear",
                            "${claw2}",
                            [21.52,43.9],
                            [21.52,43.9],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ],
                        [
                            "eid18227",
                            "msTransformOrigin",
                            0,
                            0,
                            "linear",
                            "${claw2}",
                            [21.52,43.9],
                            [21.52,43.9],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ],
                        [
                            "eid18228",
                            "-o-transform-origin",
                            0,
                            0,
                            "linear",
                            "${claw2}",
                            [21.52,43.9],
                            [21.52,43.9],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ],
                        [
                            "eid18229",
                            "transform-origin",
                            0,
                            0,
                            "linear",
                            "${claw2}",
                            [21.52,43.9],
                            [21.52,43.9],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ],
                        [
                            "eid2814",
                            "left",
                            3010,
                            1110,
                            "easeInOutQuad",
                            "${claw2}",
                            '140px',
                            '156px'
                        ],
                        [
                            "eid2598",
                            "rotateZ",
                            3340,
                            710,
                            "easeInOutQuad",
                            "${claw2}",
                            '0deg',
                            '83deg'
                        ],
                        [
                            "eid2815",
                            "top",
                            3005,
                            1110,
                            "easeInOutQuad",
                            "${claw2}",
                            '84px',
                            '99px'
                        ]
                    ]
                }
            }
        };

    AdobeEdge.registerCompositionDefn(compId, symbols, fonts, scripts, resources, opts);

    if (!window.edge_authoring_mode) AdobeEdge.getComposition(compId).load("pcheader2_edgeActions.js");
})("EDGE-66857092");
