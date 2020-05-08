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
                scaleToFit: "width",
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
                            rect: ['40%', '2.6%', '20%', '72.5%', 'auto', 'auto'],
                            cursor: 'pointer',
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
                            rect: ['14.4%', '0%', '231', '278', 'auto', 'auto'],
                            cursor: 'pointer',
                            transform: [[],['90']]
                        },
                        {
                            id: 'cover',
                            type: 'rect',
                            rect: ['0px', '1px', '1500px', '550px', 'auto', 'auto'],
                            fill: ["rgba(255,255,255,0)"],
                            stroke: [0,"rgba(0,0,0,1)","none"]
                        }
                    ],
                    style: {
                        '${Stage}': {
                            isStage: true,
                            rect: ['null', 'null', '1500px', '550px', 'auto', 'auto'],
                            overflow: 'visible',
                            fill: ["rgba(255,255,255,0)"]
                        }
                    }
                },
                timeline: {
                    duration: 7206,
                    autoPlay: true,
                    labels: {
                        "start": 2780,
                        "end": 7023
                    },
                    data: [
                        [
                            "eid2102",
                            "left",
                            1571,
                            826,
                            "easeInOutSine",
                            "${wholeArm}",
                            '20.07%',
                            '24.01%'
                        ],
                        [
                            "eid2594",
                            "left",
                            2785,
                            1215,
                            "easeInOutSine",
                            "${wholeArm}",
                            '24%',
                            '14.44%'
                        ],
                        [
                            "eid19796",
                            "left",
                            4433,
                            1558,
                            "easeInOutQuart",
                            "${wholeArm}",
                            '14.47%',
                            '8.55%'
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
                            "eid39251",
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
                            "eid39252",
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
                            "eid39253",
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
                            "eid39254",
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
                            "eid39255",
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
                            "eid654",
                            "rotateZ",
                            0,
                            1000,
                            "easeOutQuad",
                            "${wholeArm}",
                            '90deg',
                            '0deg'
                        ],
                        [
                            "eid653",
                            "top",
                            0,
                            1580,
                            "easeInOutSine",
                            "${wholeArm}",
                            '-19.45%',
                            '0%'
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
                            type: 'image',
                            id: 'topclaw2',
                            rect: ['32px', '0px', '47px', '20px', 'auto', 'auto'],
                            transform: [[], ['2'], [0, 0, 0], [1, 1, 1]],
                            fill: ['rgba(0,0,0,0)', 'images/topclaw.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'bottomClaw2',
                            rect: ['29px', '24px', '47px', '17px', 'auto', 'auto'],
                            transform: [[], ['17'], [0, 0, 0], [1, 1, 1]],
                            fill: ['rgba(0,0,0,0)', 'images/bottomClaw.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'clawJoint4',
                            rect: ['0px', '1px', '50px', '34px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/clawJoint.svg', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '79px', '41px']
                        }
                    }
                },
                timeline: {
                    duration: 5332,
                    autoPlay: true,
                    data: [
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
                            "eid39256",
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
                            "eid39257",
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
                            "eid39258",
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
                            "eid39259",
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
                            "eid39260",
                            "transform-origin",
                            1005,
                            0,
                            "easeInOutQuad",
                            "${bottomClaw2}",
                            [13.47,23.53],
                            [13.47,23.53],
                            {valueTemplate: '@@0@@% @@1@@%'}
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
                            "eid19798",
                            "rotateZ",
                            4297,
                            387,
                            "easeInOutSine",
                            "${bottomClaw2}",
                            '17deg',
                            '35deg'
                        ],
                        [
                            "eid19799",
                            "rotateZ",
                            4964,
                            368,
                            "easeInOutSine",
                            "${bottomClaw2}",
                            '35deg',
                            '3deg'
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
                            "eid39261",
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
                            "eid39262",
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
                            "eid39263",
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
                            "eid39264",
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
                            "eid39265",
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
                            "eid19797",
                            "rotateZ",
                            4297,
                            387,
                            "easeInOutSine",
                            "${topclaw2}",
                            '-31deg',
                            '-44deg'
                        ],
                        [
                            "eid19800",
                            "rotateZ",
                            4964,
                            368,
                            "easeInOutSine",
                            "${topclaw2}",
                            '-44deg',
                            '1deg'
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
                            type: 'image',
                            id: 'ClawJointPipe2',
                            rect: ['50px', '34px', '105px', '74px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/ClawJointPipe.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'elbow3',
                            rect: ['0px', '0px', '143px', '108px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/elbow.svg', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '155px', '108px']
                        }
                    }
                },
                timeline: {
                    duration: 4000,
                    autoPlay: true,
                    data: [
                        [
                            "eid2812",
                            "left",
                            3005,
                            995,
                            "easeInOutQuad",
                            "${ClawJointPipe2}",
                            '50px',
                            '72px'
                        ],
                        [
                            "eid2813",
                            "top",
                            3005,
                            995,
                            "easeInOutQuad",
                            "${ClawJointPipe2}",
                            '34px',
                            '49px'
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
                            rect: ['53px', '77px', '64px', '8px', 'auto', 'auto'],
                            transform: [[], ['31'], [], ['0.73438']],
                            id: 'Rectangle4',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            fill: ['rgba(192,192,192,1)']
                        },
                        {
                            type: 'image',
                            id: 'elbowPipe2',
                            rect: ['0px', '8px', '114px', '72px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/elbowPipe.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'armHydroPipe2',
                            rect: ['80px', '30px', '74px', '42px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/armHydroPipe.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'forArmHydroPipeCover2',
                            rect: ['46px', '72px', '40px', '34px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/forArmHydroPipeCover.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'mainArmHydroPipeCover2',
                            rect: ['76px', '42px', '45px', '36px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/mainArmHydroPipeCover.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'mainArmCover4',
                            rect: ['10px', '0px', '123px', '90px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/mainArmCover.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'baseBall3',
                            rect: ['114px', '-31px', '53px', '73px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/baseBall.svg', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '154px', '109px']
                        }
                    }
                },
                timeline: {
                    duration: 3624,
                    autoPlay: true,
                    data: [
                        [
                            "eid19354",
                            "left",
                            3386,
                            0,
                            "easeInOutSine",
                            "${Rectangle4}",
                            '53px',
                            '53px'
                        ],
                        [
                            "eid19136",
                            "-webkit-transform-origin",
                            3624,
                            0,
                            "easeInOutSine",
                            "${forArmHydroPipeCover2}",
                            [17,27.65],
                            [17,27.65],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ],
                        [
                            "eid39266",
                            "-moz-transform-origin",
                            3624,
                            0,
                            "easeInOutSine",
                            "${forArmHydroPipeCover2}",
                            [17,27.65],
                            [17,27.65],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ],
                        [
                            "eid39267",
                            "-ms-transform-origin",
                            3624,
                            0,
                            "easeInOutSine",
                            "${forArmHydroPipeCover2}",
                            [17,27.65],
                            [17,27.65],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ],
                        [
                            "eid39268",
                            "msTransformOrigin",
                            3624,
                            0,
                            "easeInOutSine",
                            "${forArmHydroPipeCover2}",
                            [17,27.65],
                            [17,27.65],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ],
                        [
                            "eid39269",
                            "-o-transform-origin",
                            3624,
                            0,
                            "easeInOutSine",
                            "${forArmHydroPipeCover2}",
                            [17,27.65],
                            [17,27.65],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ],
                        [
                            "eid39270",
                            "transform-origin",
                            3624,
                            0,
                            "easeInOutSine",
                            "${forArmHydroPipeCover2}",
                            [17,27.65],
                            [17,27.65],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ],
                        [
                            "eid19355",
                            "top",
                            3386,
                            0,
                            "easeInOutSine",
                            "${Rectangle4}",
                            '77px',
                            '77px'
                        ],
                        [
                            "eid19138",
                            "rotateZ",
                            3404,
                            220,
                            "easeInOutQuad",
                            "${forArmHydroPipeCover2}",
                            '0deg',
                            '13deg'
                        ],
                        [
                            "eid19137",
                            "rotateZ",
                            3385,
                            220,
                            "easeInOutQuad",
                            "${Rectangle4}",
                            '31deg',
                            '44deg'
                        ],
                        [
                            "eid19353",
                            "-webkit-transform-origin",
                            3386,
                            0,
                            "easeInOutSine",
                            "${Rectangle4}",
                            [0,50],
                            [0,50],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ],
                        [
                            "eid39271",
                            "-moz-transform-origin",
                            3386,
                            0,
                            "easeInOutSine",
                            "${Rectangle4}",
                            [0,50],
                            [0,50],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ],
                        [
                            "eid39272",
                            "-ms-transform-origin",
                            3386,
                            0,
                            "easeInOutSine",
                            "${Rectangle4}",
                            [0,50],
                            [0,50],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ],
                        [
                            "eid39273",
                            "msTransformOrigin",
                            3386,
                            0,
                            "easeInOutSine",
                            "${Rectangle4}",
                            [0,50],
                            [0,50],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ],
                        [
                            "eid39274",
                            "-o-transform-origin",
                            3386,
                            0,
                            "easeInOutSine",
                            "${Rectangle4}",
                            [0,50],
                            [0,50],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ],
                        [
                            "eid39275",
                            "transform-origin",
                            3386,
                            0,
                            "easeInOutSine",
                            "${Rectangle4}",
                            [0,50],
                            [0,50],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ],
                        [
                            "eid19010",
                            "top",
                            3397,
                            0,
                            "easeInOutSine",
                            "${forArmHydroPipeCover2}",
                            '72px',
                            '72px'
                        ],
                        [
                            "eid19012",
                            "left",
                            3397,
                            0,
                            "easeInOutSine",
                            "${forArmHydroPipeCover2}",
                            '46px',
                            '46px'
                        ]
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
                            type: 'image',
                            id: 'base3',
                            rect: ['0px', '0px', '121px', '88px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/base.svg', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '121px', '137px']
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
                            rect: ['0px', '96', '219', '182', 'auto', 'auto'],
                            id: 'arm2',
                            symbolName: 'arm',
                            type: 'rect',
                            transform: [[], ['23'], [0, 0, 0], [1, 1, 1]]
                        },
                        {
                            type: 'rect',
                            id: 'base4',
                            symbolName: 'base',
                            rect: ['110px', '0px', '121', '137', 'auto', 'auto']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '231px', '278px']
                        }
                    }
                },
                timeline: {
                    duration: 7013,
                    autoPlay: true,
                    data: [
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
                            "eid39276",
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
                            "eid39277",
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
                            "eid39278",
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
                            "eid39279",
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
                            "eid39280",
                            "transform-origin",
                            0,
                            0,
                            "linear",
                            "${arm2}",
                            [78.08,-1.65],
                            [78.08,-1.65],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ],
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
                            "eid22685",
                            "rotateZ",
                            5978,
                            1035,
                            "easeOutQuad",
                            "${arm2}",
                            '-75deg',
                            '23deg'
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
                            type: 'rect',
                            id: 'topArm2',
                            symbolName: 'topArm',
                            rect: ['30px', '0px', '154', '109', 'auto', 'auto']
                        },
                        {
                            rect: ['0', '57', '219', '125', 'auto', 'auto'],
                            id: 'forArminner',
                            symbolName: 'forArminner',
                            type: 'rect',
                            transform: [[], ['6'], [0, 0, 0], [1, 1, 1]]
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '219px', '182px']
                        }
                    }
                },
                timeline: {
                    duration: 6645,
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
                            "eid39281",
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
                            "eid39282",
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
                            "eid39283",
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
                            "eid39284",
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
                            "eid39285",
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
                            type: 'rect',
                            id: 'frontArm',
                            symbolName: 'frontArm',
                            rect: ['0px', '0px', '155', '108', 'auto', 'auto']
                        },
                        {
                            rect: ['140px', '84px', '79', '41', 'auto', 'auto'],
                            id: 'claw2',
                            symbolName: 'claw',
                            type: 'rect',
                            transform: [[], ['-30'], [0, 0, 0], [1, 1, 1]]
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '219px', '125px']
                        }
                    }
                },
                timeline: {
                    duration: 6645,
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
                            "eid39286",
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
                            "eid39287",
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
                            "eid39288",
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
                            "eid39289",
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
                            "eid39290",
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
                            "eid22364",
                            "rotateZ",
                            5987,
                            658,
                            "easeOutQuad",
                            "${claw2}",
                            '83deg',
                            '-30deg'
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

    if (!window.edge_authoring_mode) AdobeEdge.getComposition(compId).load("pcheader_edgeActions.js");
})("EDGE-66857092");
