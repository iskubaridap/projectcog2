/*jslint */
/*global AdobeEdge: false, window: false, document: false, console:false, alert: false */
(function (compId) {

    "use strict";
    var im='images/',
        aud='media/',
        vid='media/',
        js='js/',
        fonts = {
        },
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
                            id: 'base',
                            type: 'image',
                            rect: ['3px', '4px', '543px', '392px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"base.svg",'0px','0px']
                        },
                        {
                            id: 'Rectangle3Copy2',
                            type: 'rect',
                            rect: ['305px', '35px', '77px', '50px', 'auto', 'auto'],
                            fill: ["rgba(255,255,255,1)"],
                            stroke: [0,"rgb(0, 0, 0)","none"]
                        },
                        {
                            id: 'Rectangle3Copy',
                            type: 'rect',
                            rect: ['305px', '19px', '84px', '57px', 'auto', 'auto'],
                            fill: ["rgba(255,255,255,1)"],
                            stroke: [0,"rgb(0, 0, 0)","none"]
                        },
                        {
                            id: 'Rectangle3',
                            type: 'rect',
                            rect: ['300px', '0px', '175px', '21px', 'auto', 'auto'],
                            fill: ["rgba(255,255,255,1)"],
                            stroke: [0,"rgb(0, 0, 0)","none"]
                        },
                        {
                            id: 'Rectangle2',
                            type: 'rect',
                            rect: ['474px', '4px', '76px', '73px', 'auto', 'auto'],
                            fill: ["rgba(255,255,255,1.00)"],
                            stroke: [0,"rgb(0, 0, 0)","none"]
                        },
                        {
                            id: 'Fan',
                            type: 'image',
                            rect: ['502px', '138px', '8px', '8px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"Fan.svg",'0px','0px']
                        },
                        {
                            id: 'rightSide',
                            symbolName: 'rightSide',
                            type: 'rect',
                            rect: ['474', '5', '67', '73', 'auto', 'auto']
                        },
                        {
                            id: 'leftside',
                            symbolName: 'leftside',
                            type: 'rect',
                            rect: ['305', '4', '84', '79', 'auto', 'auto']
                        },
                        {
                            id: 'alien',
                            symbolName: 'alien',
                            type: 'rect',
                            rect: ['372px', '153px', '47', '44', 'auto', 'auto']
                        },
                        {
                            id: 'Text',
                            type: 'text',
                            rect: ['366px', '201px', '71px', '18px', 'auto', 'auto'],
                            text: "<p style=\"margin: 0px; text-align: center;\">​CLICK ME</p>",
                            font: ['Arial, Helvetica, sans-serif', [12, "px"], "rgba(107,135,142,1.00)", "normal", "none", "italic", "break-word", "normal"],
                            textStyle: ["", "", "12px", "", ""],
                            transform: [[],['1'],['7','-6']]
                        },
                        {
                            id: 'boxScreen2',
                            symbolName: 'boxScreen',
                            type: 'rect',
                            rect: ['-13px', '315px', '59', '44', 'auto', 'auto'],
                            transform: [[],[],[],['0.30508','0.30508']]
                        }
                    ],
                    style: {
                        '${Stage}': {
                            isStage: true,
                            rect: ['null', 'null', '550px', '400px', 'auto', 'auto'],
                            overflow: 'hidden',
                            fill: ["rgba(255,255,255,1)"]
                        }
                    }
                },
                timeline: {
                    duration: 5000,
                    autoPlay: true,
                    labels: {
                        "start": 0
                    },
                    data: [
                        [
                            "eid136",
                            "left",
                            0,
                            0,
                            "easeInOutBounce",
                            "${boxScreen2}",
                            '-13px',
                            '-13px'
                        ],
                        [
                            "eid124",
                            "scaleX",
                            0,
                            0,
                            "easeInOutBounce",
                            "${boxScreen2}",
                            '0.30508',
                            '0.30508'
                        ],
                        [
                            "eid7",
                            "top",
                            0,
                            0,
                            "linear",
                            "${alien}",
                            '153px',
                            '153px'
                        ],
                        [
                            "eid125",
                            "scaleY",
                            0,
                            0,
                            "easeInOutBounce",
                            "${boxScreen2}",
                            '0.30508',
                            '0.30508'
                        ],
                        [
                            "eid132",
                            "top",
                            0,
                            0,
                            "easeInOutBounce",
                            "${boxScreen2}",
                            '315px',
                            '315px'
                        ],
                        [
                            "eid6",
                            "left",
                            0,
                            0,
                            "linear",
                            "${alien}",
                            '372px',
                            '372px'
                        ]
                    ]
                }
            },
            "alien": {
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
                            display: 'block',
                            rect: ['6px', '0px', '41px', '44px', 'auto', 'auto'],
                            id: 'alian1',
                            fill: ['rgba(0,0,0,0)', 'images/alian1.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            display: 'none',
                            rect: ['0px', '4px', '47px', '39px', 'auto', 'auto'],
                            id: 'alien2',
                            fill: ['rgba(0,0,0,0)', 'images/alien2.svg', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '47px', '44px']
                        }
                    }
                },
                timeline: {
                    duration: 2500,
                    autoPlay: true,
                    labels: {
                        "start": 505,
                        "end": 2500
                    },
                    data: [
                        [
                            "eid3",
                            "display",
                            1000,
                            0,
                            "linear",
                            "${alian1}",
                            'block',
                            'none'
                        ],
                        [
                            "eid4",
                            "display",
                            2000,
                            0,
                            "linear",
                            "${alian1}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1",
                            "display",
                            0,
                            0,
                            "linear",
                            "${alien2}",
                            'none',
                            'none'
                        ],
                        [
                            "eid2",
                            "display",
                            1000,
                            0,
                            "linear",
                            "${alien2}",
                            'none',
                            'block'
                        ],
                        [
                            "eid5",
                            "display",
                            2000,
                            0,
                            "linear",
                            "${alien2}",
                            'block',
                            'none'
                        ]
                    ]
                }
            },
            "boxScreen": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0px', '0px', '60px', '44px', 'auto', 'auto'],
                            id: 'boxScreen',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/boxScreen.svg', '0px', '0px']
                        },
                        {
                            transform: [[], ['-17'], [0, 0, 0], [1, 1, 1]],
                            id: 'boxTicker',
                            type: 'image',
                            rect: ['17px', '13px', '13px', '28px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/boxTicker.svg', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '59px', '44px']
                        }
                    }
                },
                timeline: {
                    duration: 5000,
                    autoPlay: true,
                    labels: {
                        "start": 0,
                        "end": 4995
                    },
                    data: [
                        [
                            "eid8",
                            "rotateZ",
                            0,
                            1000,
                            "easeInOutBounce",
                            "${boxTicker}",
                            '-17deg',
                            '56deg'
                        ],
                        [
                            "eid40",
                            "rotateZ",
                            1495,
                            500,
                            "easeInOutBounce",
                            "${boxTicker}",
                            '56deg',
                            '12deg'
                        ],
                        [
                            "eid51",
                            "rotateZ",
                            2245,
                            1760,
                            "easeInOutBounce",
                            "${boxTicker}",
                            '12deg',
                            '59deg'
                        ],
                        [
                            "eid62",
                            "rotateZ",
                            4005,
                            995,
                            "easeInOutBounce",
                            "${boxTicker}",
                            '59deg',
                            '-17deg'
                        ],
                        [
                            "eid9",
                            "-webkit-transform-origin",
                            0,
                            0,
                            "easeInOutBounce",
                            "${boxTicker}",
                            [100,100],
                            [100,100],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ],
                        [
                            "eid454",
                            "-moz-transform-origin",
                            0,
                            0,
                            "easeInOutBounce",
                            "${boxTicker}",
                            [100,100],
                            [100,100],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ],
                        [
                            "eid455",
                            "-ms-transform-origin",
                            0,
                            0,
                            "easeInOutBounce",
                            "${boxTicker}",
                            [100,100],
                            [100,100],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ],
                        [
                            "eid456",
                            "msTransformOrigin",
                            0,
                            0,
                            "easeInOutBounce",
                            "${boxTicker}",
                            [100,100],
                            [100,100],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ],
                        [
                            "eid457",
                            "-o-transform-origin",
                            0,
                            0,
                            "easeInOutBounce",
                            "${boxTicker}",
                            [100,100],
                            [100,100],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ],
                        [
                            "eid458",
                            "transform-origin",
                            0,
                            0,
                            "easeInOutBounce",
                            "${boxTicker}",
                            [100,100],
                            [100,100],
                            {valueTemplate: '@@0@@% @@1@@%'}
                        ]
                    ]
                }
            },
            "rightSide": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            transform: [[], ['360'], [0, 0, 0], [1, 1, 1]],
                            id: 'gear2',
                            type: 'image',
                            rect: ['32px', '12px', '17px', '17px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/gear2.svg', '0px', '0px']
                        },
                        {
                            rect: ['9px', '20px', '32px', '24px', 'auto', 'auto'],
                            id: 'boxfloaty',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/boxfloaty.svg', '0px', '0px']
                        },
                        {
                            transform: [[], ['360'], [0, 0, 0], [1, 1, 1]],
                            id: 'gear1',
                            type: 'image',
                            rect: ['41px', '26px', '23px', '23px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/gear1.svg', '0px', '0px']
                        },
                        {
                            rect: ['14px', '47px', '15px', '14px', 'auto', 'auto'],
                            id: 'squars',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/squars.svg', '0px', '0px']
                        },
                        {
                            rect: ['0px', '57px', '19px', '16px', 'auto', 'auto'],
                            id: 'cPlus',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/cPlus.svg', '0px', '0px']
                        },
                        {
                            rect: ['24px', '40px', '43px', '18px', 'auto', 'auto'],
                            id: 'PHP',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/PHP.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            borderRadius: ['0px', '0px', '0px', '0px'],
                            id: 'cloud',
                            rect: ['3px', '0px', '19px', '14px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/cloud.svg', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '67px', '73px']
                        }
                    }
                },
                timeline: {
                    duration: 2000,
                    autoPlay: true,
                    labels: {
                        "start": 0
                    },
                    data: [
                        [
                            "eid200",
                            "border-bottom-left-radius",
                            1000,
                            1000,
                            "easeInOutQuad",
                            "${cloud}",
                            [0,0],
                            [0,0],
                            {valueTemplate: '@@0@@px @@1@@px'}
                        ],
                        [
                            "eid168",
                            "rotateZ",
                            0,
                            1995,
                            "linear",
                            "${gear1}",
                            '0deg',
                            '360deg'
                        ],
                        [
                            "eid199",
                            "top",
                            0,
                            1000,
                            "linear",
                            "${cloud}",
                            '0px',
                            '-3px'
                        ],
                        [
                            "eid201",
                            "top",
                            1000,
                            1000,
                            "easeInOutQuad",
                            "${cloud}",
                            '-3px',
                            '0px'
                        ],
                        [
                            "eid157",
                            "rotateZ",
                            0,
                            2000,
                            "easeInOutBounce",
                            "${gear2}",
                            '0deg',
                            '360deg'
                        ]
                    ]
                }
            },
            "leftside": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            rect: ['0px', '0px', '38px', '17px', 'auto', 'auto'],
                            id: 'js',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/js.svg', '0px', '0px']
                        },
                        {
                            rect: ['44px', '5px', '11px', '5px', 'auto', 'auto'],
                            id: 'left_arrow',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/left%20arrow.svg', '0px', '0px']
                        },
                        {
                            rect: ['44px', '0px', '11px', '5px', 'auto', 'auto'],
                            id: 'rightArrow',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/rightArrow.svg', '0px', '0px']
                        },
                        {
                            transform: [[], [], [], ['0.75', '0.75']],
                            id: 'leftCircle',
                            type: 'image',
                            rect: ['73px', '5px', '4px', '4px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/leftCircle.svg', '0px', '0px']
                        },
                        {
                            transform: [[], [], [], ['1.66666', '1.66666']],
                            id: 'rightCircle',
                            type: 'image',
                            rect: ['78px', '5px', '3px', '3px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/rightCircle.svg', '0px', '0px']
                        },
                        {
                            rect: ['23px', '24px', '60px', '18px', 'auto', 'auto'],
                            id: 'html5',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/html5.svg', '0px', '0px']
                        },
                        {
                            rect: ['29px', '42px', '55px', '30px', 'auto', 'auto'],
                            id: 'text1',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/text1.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'box1',
                            opacity: '1',
                            rect: ['35px', '76px', '3px', '3px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/box1.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'box1Copy',
                            opacity: '1',
                            rect: ['39px', '76px', '3px', '3px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/box1.svg', '0px', '0px']
                        },
                        {
                            type: 'image',
                            id: 'box1Copy2',
                            opacity: '1',
                            rect: ['43px', '76px', '3px', '3px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/box1.svg', '0px', '0px']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '84px', '79px']
                        }
                    }
                },
                timeline: {
                    duration: 2000,
                    autoPlay: true,
                    labels: {
                        "start": 0
                    },
                    data: [
                        [
                            "eid232",
                            "scaleX",
                            0,
                            1000,
                            "easeInOutQuad",
                            "${leftCircle}",
                            '0.75',
                            '1.25'
                        ],
                        [
                            "eid307",
                            "scaleX",
                            1005,
                            985,
                            "easeInOutQuad",
                            "${leftCircle}",
                            '1.25',
                            '0.75'
                        ],
                        [
                            "eid330",
                            "opacity",
                            1000,
                            500,
                            "easeInOutQuad",
                            "${box1Copy2}",
                            '1',
                            '0'
                        ],
                        [
                            "eid331",
                            "opacity",
                            1500,
                            500,
                            "easeInOutQuad",
                            "${box1Copy2}",
                            '0.000000',
                            '1'
                        ],
                        [
                            "eid239",
                            "scaleY",
                            0,
                            1000,
                            "easeInOutQuad",
                            "${rightCircle}",
                            '1.66666',
                            '1'
                        ],
                        [
                            "eid306",
                            "scaleY",
                            1005,
                            985,
                            "easeInOutQuad",
                            "${rightCircle}",
                            '1',
                            '1.66666'
                        ],
                        [
                            "eid329",
                            "left",
                            2000,
                            0,
                            "easeInOutQuad",
                            "${box1Copy}",
                            '39px',
                            '39px'
                        ],
                        [
                            "eid319",
                            "opacity",
                            0,
                            500,
                            "easeInOutQuad",
                            "${box1}",
                            '1',
                            '0'
                        ],
                        [
                            "eid320",
                            "opacity",
                            500,
                            500,
                            "easeInOutQuad",
                            "${box1}",
                            '0.000000',
                            '1'
                        ],
                        [
                            "eid233",
                            "scaleY",
                            0,
                            1000,
                            "easeInOutQuad",
                            "${leftCircle}",
                            '0.75',
                            '1.25'
                        ],
                        [
                            "eid308",
                            "scaleY",
                            1005,
                            985,
                            "easeInOutQuad",
                            "${leftCircle}",
                            '1.25',
                            '0.75'
                        ],
                        [
                            "eid237",
                            "scaleX",
                            0,
                            1000,
                            "easeInOutQuad",
                            "${rightCircle}",
                            '1.66666',
                            '1'
                        ],
                        [
                            "eid305",
                            "scaleX",
                            1005,
                            985,
                            "easeInOutQuad",
                            "${rightCircle}",
                            '1',
                            '1.66666'
                        ],
                        [
                            "eid322",
                            "opacity",
                            495,
                            500,
                            "easeInOutQuad",
                            "${box1Copy}",
                            '1',
                            '0'
                        ],
                        [
                            "eid323",
                            "opacity",
                            995,
                            500,
                            "easeInOutQuad",
                            "${box1Copy}",
                            '0.000000',
                            '1'
                        ]
                    ]
                }
            }
        };

    AdobeEdge.registerCompositionDefn(compId, symbols, fonts, scripts, resources, opts);

    if (!window.edge_authoring_mode) AdobeEdge.getComposition(compId).load("robot1_edgeActions.js");
})("EDGE-20598466");
