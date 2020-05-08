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
            js+"jquery-1.7.1.min.js",
            js+"jquery.easing.1.3.js"
        ],
        symbols = {
            "stage": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            id: 'kimonoGirl_v',
                            symbolName: 'kimonoGirl_v',
                            type: 'rect',
                            rect: ['411px', '436px', '272', '364', 'auto', 'auto'],
                            opacity: '0',
                            transform: [['-50','-273']]
                        },
                        {
                            id: 'kimonoGirl_h',
                            symbolName: 'kimonoGirl_h',
                            type: 'rect',
                            rect: ['3px', '464px', '269', '363', 'auto', 'auto'],
                            opacity: '0',
                            transform: [['-183','-300']]
                        },
                        {
                            id: 'background',
                            type: 'image',
                            rect: ['0px', '0px', '774px', '729px', 'auto', 'auto'],
                            fill: ["rgba(0,0,0,0)",im+"background.png",'0px','0px']
                        },
                        {
                            id: 'kimonoGirl',
                            symbolName: 'kimonoGirl',
                            type: 'rect',
                            rect: ['211px', '485px', '272', '364', 'auto', 'auto'],
                            transform: [['-116','-321']]
                        }
                    ],
                    style: {
                        '${Stage}': {
                            isStage: true,
                            rect: ['null', 'null', '774px', '729px', 'auto', 'auto'],
                            overflow: 'hidden',
                            fill: ["rgba(212,180,135,0.00)"]
                        }
                    }
                },
                timeline: {
                    duration: 0,
                    autoPlay: true,
                    data: [
                        [
                            "eid250",
                            "background-color",
                            0,
                            0,
                            "linear",
                            "${Stage}",
                            'rgba(212,180,135,0.00)',
                            'rgba(212,180,135,0.00)'
                        ],
                            [ "eid184", "trigger", 0, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${kimonoGirl_v}', [2500] ] ],
                            [ "eid244", "trigger", 0, function executeSymbolFunction(e, data) { this._executeSymbolAction(e, data); }, ['stop', '${kimonoGirl_h}', [2500] ] ]
                    ]
                }
            },
            "eye": {
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
                            transform: [['-305', '-115'], [0, 0, 0], [0, 0, 0], [1, 1, 1]],
                            display: 'block',
                            rect: ['305', '115', '35', '35', 'auto', 'auto'],
                            id: 'leftEye',
                            fill: ['rgba(0,0,0,0)', 'images/rightEye01.png']
                        },
                        {
                            type: 'image',
                            transform: [['-380', '-146'], [0, 0, 0], [0, 0, 0], [1, 1, 1]],
                            display: 'none',
                            rect: ['380', '146', '35', '35', 'auto', 'auto'],
                            id: 'rightEye02',
                            fill: ['rgba(0,0,0,0)', 'images/rightEye02.png']
                        },
                        {
                            type: 'image',
                            transform: [['-82', '-102'], [0, 0, 0], [0, 0, 0], [1, 1, 1]],
                            display: 'none',
                            rect: ['82', '102', '35', '35', 'auto', 'auto'],
                            id: 'rightEye03',
                            fill: ['rgba(0,0,0,0)', 'images/rightEye03.png']
                        },
                        {
                            type: 'image',
                            transform: [['-51', '-97'], [0, 0, 0], [0, 0, 0], [1, 1, 1]],
                            display: 'none',
                            rect: ['51', '97', '35', '35', 'auto', 'auto'],
                            id: 'rightEye04',
                            fill: ['rgba(0,0,0,0)', 'images/rightEye04.png']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '35', '35']
                        }
                    }
                },
                timeline: {
                    duration: 2000,
                    autoPlay: true,
                    data: [
                        [
                            "eid2",
                            "display",
                            0,
                            0,
                            "linear",
                            "${rightEye03}",
                            'none',
                            'none'
                        ],
                        [
                            "eid13",
                            "display",
                            1850,
                            0,
                            "linear",
                            "${rightEye03}",
                            'none',
                            'block'
                        ],
                        [
                            "eid9",
                            "display",
                            1900,
                            0,
                            "linear",
                            "${rightEye03}",
                            'block',
                            'none'
                        ],
                        [
                            "eid3",
                            "display",
                            0,
                            0,
                            "linear",
                            "${rightEye04}",
                            'none',
                            'none'
                        ],
                        [
                            "eid10",
                            "display",
                            1900,
                            0,
                            "linear",
                            "${rightEye04}",
                            'none',
                            'block'
                        ],
                        [
                            "eid15",
                            "display",
                            2000,
                            0,
                            "linear",
                            "${rightEye04}",
                            'block',
                            'none'
                        ],
                        [
                            "eid4",
                            "display",
                            0,
                            0,
                            "linear",
                            "${leftEye}",
                            'block',
                            'block'
                        ],
                        [
                            "eid5",
                            "display",
                            1750,
                            0,
                            "linear",
                            "${leftEye}",
                            'block',
                            'none'
                        ],
                        [
                            "eid11",
                            "display",
                            1900,
                            0,
                            "linear",
                            "${leftEye}",
                            'none',
                            'none'
                        ],
                        [
                            "eid14",
                            "display",
                            2000,
                            0,
                            "linear",
                            "${leftEye}",
                            'none',
                            'block'
                        ],
                        [
                            "eid1",
                            "display",
                            0,
                            0,
                            "linear",
                            "${rightEye02}",
                            'none',
                            'none'
                        ],
                        [
                            "eid7",
                            "display",
                            1750,
                            0,
                            "linear",
                            "${rightEye02}",
                            'none',
                            'block'
                        ],
                        [
                            "eid12",
                            "display",
                            1850,
                            0,
                            "linear",
                            "${rightEye02}",
                            'block',
                            'none'
                        ],
                        [
                            "eid8",
                            "display",
                            1900,
                            0,
                            "linear",
                            "${rightEye02}",
                            'none',
                            'none'
                        ]
                    ]
                }
            },
            "kimonoGirl_h": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            transform: [['-49', '-123'], [0, 0, 0], [0, 0, 0], [1, 1, 1]],
                            id: 'hair',
                            type: 'image',
                            rect: ['94', '175', '212', '193', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/hair.png']
                        },
                        {
                            transform: [['-43', '-145'], [0, 0, 0], [0, 0, 0], [1, 1, 1]],
                            id: 'tail',
                            type: 'image',
                            rect: ['139', '145', '136', '107', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/tail.png']
                        },
                        {
                            transform: [['-59', '-80'], [0, 0, 0], [0, 0, 0], [1, 1, 1]],
                            id: 'comb',
                            type: 'image',
                            rect: ['139', '106', '138', '63', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/comb.png']
                        },
                        {
                            transform: [['-176', '-15'], [0, 0, 0], [0, 0, 0], [1, 1, 1]],
                            id: 'neck',
                            type: 'image',
                            rect: ['283', '250', '64', '74', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/neck.png']
                        },
                        {
                            transform: [['-97', '-61'], [0, 0, 0], [0, 0, 0], [1, 1, 1]],
                            id: 'kimono',
                            type: 'image',
                            rect: ['162', '317', '148', '107', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/kimono.png']
                        },
                        {
                            transform: [['-98', '-22'], [], [], ['1.20689', '1.20689']],
                            id: 'leftEar',
                            type: 'image',
                            rect: ['309', '219', '29', '31', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/leftEar.png']
                        },
                        {
                            transform: [['7'], [0, 0, 0], [0, 0, 0], [1, 1, 1]],
                            id: 'rightEar',
                            type: 'image',
                            rect: ['33', '198', '31', '31', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/rightEar.png']
                        },
                        {
                            transform: [['-86', '-109'], [0, 0, 0], [0, 0, 0], [1, 1, 1]],
                            id: 'face',
                            type: 'image',
                            rect: ['139', '208', '167', '149', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/face.png']
                        },
                        {
                            transform: [['-20', '-18'], [0, 0, 0], [0, 0, 0], [1, 1, 1]],
                            id: 'mouth',
                            type: 'image',
                            rect: ['139', '250', '11', '5', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/mouth.png']
                        },
                        {
                            transform: [['-38', '-5'], [0, 0, 0], [0, 0, 0], [1, 1, 1]],
                            id: 'rightEye',
                            symbolName: 'eye',
                            rect: ['95', '184', '35', '35', 'auto', 'auto'],
                            type: 'rect'
                        },
                        {
                            transform: [['-13'], [0, 0, 0], [0, 0, 0], [1, 1, 1]],
                            id: 'leftEye',
                            symbolName: 'eye',
                            rect: ['174', '179', '35', '35', 'auto', 'auto'],
                            type: 'rect'
                        },
                        {
                            transform: [['-22', '-15'], [0, 0, 0], [0, 0, 0], [1, 1, 1]],
                            id: 'nose',
                            type: 'image',
                            rect: ['139', '222', '7', '7', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/nose.png']
                        },
                        {
                            transform: [['-406', '-71'], [0, 0, 0], [0, 0, 0], [1, 1, 1]],
                            id: 'rightCheek',
                            type: 'image',
                            rect: ['460', '287', '31', '27', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/rightCheek.png']
                        },
                        {
                            transform: [['-95', '-53'], [0, 0, 0], [0, 0, 0], [1, 1, 1]],
                            id: 'leftCheek',
                            type: 'image',
                            rect: ['266', '269', '31', '26', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/leftCheek.png']
                        },
                        {
                            transform: [['-373', '-163'], [0, 0, 0], [0, 0, 0], [1, 1, 1]],
                            id: 'bangs',
                            type: 'image',
                            rect: ['414', '221', '169', '126', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/bangs.png']
                        },
                        {
                            transform: [['-181', '-90'], [], [], ['1.09637', '1.09637']],
                            id: 'leftHairPin',
                            type: 'image',
                            rect: ['356', '152', '89', '83', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/leftHirPin.png']
                        },
                        {
                            transform: [['-345', '-167'], [], [], ['0.82142', '0.82142']],
                            id: 'rightHairPin',
                            type: 'image',
                            rect: ['337', '212', '89', '84', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/rightHairPin.png']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '269', '363']
                        }
                    }
                },
                timeline: {
                    duration: 5000,
                    autoPlay: false,
                    data: [
                        [
                            "eid34",
                            "scaleX",
                            2500,
                            2500,
                            "linear",
                            "${rightEar}",
                            '1',
                            '1.12903'
                        ],
                        [
                            "eid67",
                            "translateX",
                            0,
                            2500,
                            "linear",
                            "${leftCheek}",
                            '-95px',
                            '-84px'
                        ],
                        [
                            "eid23",
                            "translateX",
                            2500,
                            2500,
                            "linear",
                            "${leftCheek}",
                            '-84px',
                            '-74px'
                        ],
                        [
                            "eid58",
                            "translateY",
                            0,
                            2500,
                            "linear",
                            "${leftEar}",
                            '-22px',
                            '-22px'
                        ],
                        [
                            "eid60",
                            "scaleX",
                            0,
                            2500,
                            "linear",
                            "${leftEar}",
                            '1.20689',
                            '1'
                        ],
                        [
                            "eid246",
                            "scaleX",
                            2500,
                            2500,
                            "linear",
                            "${leftEar}",
                            '1',
                            '0.86206'
                        ],
                        [
                            "eid24",
                            "translateY",
                            2500,
                            2500,
                            "linear",
                            "${leftCheek}",
                            '-53px',
                            '-52px'
                        ],
                        [
                            "eid69",
                            "translateX",
                            0,
                            2500,
                            "linear",
                            "${leftHairPin}",
                            '-181px',
                            '-174px'
                        ],
                        [
                            "eid37",
                            "translateX",
                            2500,
                            2500,
                            "linear",
                            "${leftHairPin}",
                            '-174px',
                            '-167px'
                        ],
                        [
                            "eid75",
                            "scaleX",
                            0,
                            2500,
                            "linear",
                            "${rightHairPin}",
                            '0.82142',
                            '1'
                        ],
                        [
                            "eid43",
                            "scaleX",
                            2500,
                            2500,
                            "linear",
                            "${rightHairPin}",
                            '1',
                            '1.13094'
                        ],
                        [
                            "eid90",
                            "translateY",
                            2500,
                            0,
                            "linear",
                            "${rightCheek}",
                            '-71px',
                            '-71px'
                        ],
                        [
                            "eid35",
                            "scaleY",
                            2500,
                            2500,
                            "linear",
                            "${rightEar}",
                            '1',
                            '1.12903'
                        ],
                        [
                            "eid74",
                            "translateY",
                            0,
                            2500,
                            "linear",
                            "${rightHairPin}",
                            '-167px',
                            '-175px'
                        ],
                        [
                            "eid42",
                            "translateY",
                            2500,
                            2500,
                            "linear",
                            "${rightHairPin}",
                            '-175px',
                            '-180px'
                        ],
                        [
                            "eid62",
                            "scaleY",
                            0,
                            2500,
                            "linear",
                            "${leftEar}",
                            '1.20689',
                            '1'
                        ],
                        [
                            "eid63",
                            "translateX",
                            0,
                            2500,
                            "linear",
                            "${rightEye}",
                            '-38px',
                            '-27px'
                        ],
                        [
                            "eid28",
                            "translateX",
                            2500,
                            2500,
                            "linear",
                            "${rightEye}",
                            '-27px',
                            '-11px'
                        ],
                        [
                            "eid65",
                            "translateX",
                            0,
                            2500,
                            "linear",
                            "${rightCheek}",
                            '-406px',
                            '-396px'
                        ],
                        [
                            "eid25",
                            "translateX",
                            2500,
                            2500,
                            "linear",
                            "${rightCheek}",
                            '-396px',
                            '-391px'
                        ],
                        [
                            "eid66",
                            "translateX",
                            0,
                            2500,
                            "linear",
                            "${leftEye}",
                            '-13px',
                            '-1px'
                        ],
                        [
                            "eid22",
                            "translateX",
                            2500,
                            2500,
                            "linear",
                            "${leftEye}",
                            '-1px',
                            '12px'
                        ],
                        [
                            "eid79",
                            "translateX",
                            0,
                            2500,
                            "linear",
                            "${comb}",
                            '-59px',
                            '-69px'
                        ],
                        [
                            "eid45",
                            "translateX",
                            2500,
                            2500,
                            "linear",
                            "${comb}",
                            '-69px',
                            '-86px'
                        ],
                        [
                            "eid76",
                            "scaleY",
                            0,
                            2500,
                            "linear",
                            "${rightHairPin}",
                            '0.82142',
                            '1'
                        ],
                        [
                            "eid44",
                            "scaleY",
                            2500,
                            2500,
                            "linear",
                            "${rightHairPin}",
                            '1',
                            '1.13094'
                        ],
                        [
                            "eid80",
                            "translateX",
                            0,
                            2500,
                            "linear",
                            "${tail}",
                            '-43px',
                            '-63px'
                        ],
                        [
                            "eid46",
                            "translateX",
                            2500,
                            2500,
                            "linear",
                            "${tail}",
                            '-63px',
                            '-101px'
                        ],
                        [
                            "eid56",
                            "translateX",
                            0,
                            2500,
                            "linear",
                            "${leftEar}",
                            '-98px',
                            '-97px'
                        ],
                        [
                            "eid31",
                            "translateX",
                            2500,
                            2500,
                            "linear",
                            "${leftEar}",
                            '-97px',
                            '-102px'
                        ],
                        [
                            "eid73",
                            "translateX",
                            0,
                            2500,
                            "linear",
                            "${rightHairPin}",
                            '-345px',
                            '-331px'
                        ],
                        [
                            "eid41",
                            "translateX",
                            2500,
                            2500,
                            "linear",
                            "${rightHairPin}",
                            '-331px',
                            '-331px'
                        ],
                        [
                            "eid71",
                            "scaleX",
                            0,
                            2500,
                            "linear",
                            "${leftHairPin}",
                            '1.09637',
                            '1'
                        ],
                        [
                            "eid39",
                            "scaleX",
                            2500,
                            2500,
                            "linear",
                            "${leftHairPin}",
                            '1',
                            '0.89156'
                        ],
                        [
                            "eid33",
                            "translateY",
                            2500,
                            2500,
                            "linear",
                            "${rightEar}",
                            '0px',
                            '-2px'
                        ],
                        [
                            "eid72",
                            "scaleY",
                            0,
                            2500,
                            "linear",
                            "${leftHairPin}",
                            '1.09637',
                            '1'
                        ],
                        [
                            "eid40",
                            "scaleY",
                            2500,
                            2500,
                            "linear",
                            "${leftHairPin}",
                            '1',
                            '0.89156'
                        ],
                        [
                            "eid77",
                            "translateX",
                            0,
                            2500,
                            "linear",
                            "${hair}",
                            '-49px',
                            '-61px'
                        ],
                        [
                            "eid52",
                            "translateX",
                            2500,
                            2500,
                            "linear",
                            "${hair}",
                            '-61px',
                            '-68px'
                        ],
                        [
                            "eid64",
                            "translateX",
                            0,
                            2500,
                            "linear",
                            "${mouth}",
                            '-20px',
                            '-5px'
                        ],
                        [
                            "eid29",
                            "translateX",
                            2500,
                            2500,
                            "linear",
                            "${mouth}",
                            '-5px',
                            '12px'
                        ],
                        [
                            "eid68",
                            "translateX",
                            0,
                            2500,
                            "linear",
                            "${nose}",
                            '-22px',
                            '-3px'
                        ],
                        [
                            "eid27",
                            "translateX",
                            2500,
                            2500,
                            "linear",
                            "${nose}",
                            '-3px',
                            '20px'
                        ],
                        [
                            "eid221",
                            "translateX",
                            0,
                            2500,
                            "linear",
                            "${bangs}",
                            '-373px',
                            '-360px'
                        ],
                        [
                            "eid36",
                            "translateX",
                            2500,
                            2500,
                            "linear",
                            "${bangs}",
                            '-360px',
                            '-345px'
                        ],
                        [
                            "eid54",
                            "translateX",
                            0,
                            2500,
                            "linear",
                            "${face}",
                            '-86px',
                            '-84px'
                        ],
                        [
                            "eid48",
                            "translateX",
                            2500,
                            2500,
                            "linear",
                            "${face}",
                            '-84px',
                            '-82px'
                        ],
                        [
                            "eid70",
                            "translateY",
                            0,
                            2500,
                            "linear",
                            "${leftHairPin}",
                            '-90px',
                            '-86px'
                        ],
                        [
                            "eid38",
                            "translateY",
                            2500,
                            2500,
                            "linear",
                            "${leftHairPin}",
                            '-86px',
                            '-81px'
                        ],
                        [
                            "eid55",
                            "translateX",
                            0,
                            2500,
                            "linear",
                            "${rightEar}",
                            '7px',
                            '2px'
                        ],
                        [
                            "eid32",
                            "translateX",
                            2500,
                            2500,
                            "linear",
                            "${rightEar}",
                            '2px',
                            '0px'
                        ]
                    ]
                }
            },
            "kimonoGirl_v": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            transform: [['-61', '-116'], [0, 0, 0], [0, 0, 0], [1, 1, 1]],
                            id: 'hair',
                            type: 'image',
                            rect: ['94', '175', '212', '193', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/hair.png']
                        },
                        {
                            transform: [['-63', '-121'], [0, 0, 0], [0, 0, 0], [1, 1, 1]],
                            id: 'tail',
                            type: 'image',
                            rect: ['139', '145', '136', '107', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/tail.png']
                        },
                        {
                            transform: [['-69', '-74'], [0, 0, 0], [0, 0, 0], [1, 1, 1]],
                            id: 'comb',
                            type: 'image',
                            rect: ['139', '106', '138', '63', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/comb.png']
                        },
                        {
                            transform: [['-176', '-15'], [0, 0, 0], [0, 0, 0], [1, 1, 1]],
                            id: 'neck',
                            type: 'image',
                            rect: ['283', '250', '64', '74', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/neck.png']
                        },
                        {
                            transform: [['-97', '-61'], [0, 0, 0], [0, 0, 0], [1, 1, 1]],
                            id: 'kimono',
                            type: 'image',
                            rect: ['162', '317', '148', '107', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/kimono.png']
                        },
                        {
                            transform: [['-97', '-21'], [0, 0, 0], [0, 0, 0], [1, 1, 1]],
                            id: 'leftEar',
                            type: 'image',
                            rect: ['309', '219', '29', '31', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/leftEar.png']
                        },
                        {
                            transform: [['2', '1'], [0, 0, 0], [0, 0, 0], [1, 1, 1]],
                            id: 'rightEar',
                            type: 'image',
                            rect: ['33', '198', '31', '31', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/rightEar.png']
                        },
                        {
                            transform: [['-84', '-111'], [0, 0, 0], [0, 0, 0], [1, 1, 1]],
                            id: 'face',
                            type: 'image',
                            rect: ['139', '208', '167', '149', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/face.png']
                        },
                        {
                            transform: [['-5', '-33'], [0, 0, 0], [0, 0, 0], [1, 1, 1]],
                            id: 'mouth',
                            type: 'image',
                            rect: ['139', '250', '11', '5', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/mouth.png']
                        },
                        {
                            transform: [['-27', '-20'], [0, 0, 0], [0, 0, 0], [1, 1, 1]],
                            id: 'rightEye',
                            symbolName: 'eye',
                            rect: ['95', '184', '35', '35', 'auto', 'auto'],
                            type: 'rect'
                        },
                        {
                            transform: [['-1', '-15'], [0, 0, 0], [0, 0, 0], [1, 1, 1]],
                            id: 'leftEye',
                            symbolName: 'eye',
                            rect: ['174', '179', '35', '35', 'auto', 'auto'],
                            type: 'rect'
                        },
                        {
                            transform: [['-3', '-30'], [0, 0, 0], [0, 0, 0], [1, 1, 1]],
                            id: 'nose',
                            type: 'image',
                            rect: ['139', '222', '7', '7', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/nose.png']
                        },
                        {
                            transform: [['-396', '-82'], [0, 0, 0], [0, 0, 0], [1, 1, 1]],
                            id: 'rightCheek',
                            type: 'image',
                            rect: ['460', '287', '31', '27', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/rightCheek.png']
                        },
                        {
                            transform: [['-84', '-65'], [0, 0, 0], [0, 0, 0], [1, 1, 1]],
                            id: 'leftCheek',
                            type: 'image',
                            rect: ['266', '269', '31', '26', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/leftCheek.png']
                        },
                        {
                            transform: [['-360', '-173'], [0, 0, 0], [0, 0, 0], [1, 1, 1]],
                            id: 'bangs',
                            type: 'image',
                            rect: ['414', '221', '169', '126', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/bangs.png']
                        },
                        {
                            transform: [['-177', '-98'], [], [], ['0.91566', '0.91566']],
                            id: 'leftHairPin',
                            type: 'image',
                            rect: ['356', '152', '89', '83', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/leftHirPin.png']
                        },
                        {
                            transform: [['-330', '-183'], [], [], ['0.89887', '0.89887']],
                            id: 'rightHairPin',
                            type: 'image',
                            rect: ['337', '212', '89', '84', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/rightHairPin.png']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '272', '364']
                        }
                    }
                },
                timeline: {
                    duration: 5000,
                    autoPlay: false,
                    data: [
                        [
                            "eid114",
                            "translateY",
                            0,
                            2500,
                            "linear",
                            "${bangs}",
                            '-173px',
                            '-163px'
                        ],
                        [
                            "eid165",
                            "translateY",
                            2500,
                            2500,
                            "linear",
                            "${bangs}",
                            '-163px',
                            '-145px'
                        ],
                        [
                            "eid152",
                            "translateY",
                            0,
                            2500,
                            "linear",
                            "${leftEar}",
                            '-21px',
                            '-22px'
                        ],
                        [
                            "eid167",
                            "translateY",
                            2500,
                            2500,
                            "linear",
                            "${leftEar}",
                            '-22px',
                            '-26px'
                        ],
                        [
                            "eid118",
                            "translateY",
                            0,
                            2500,
                            "linear",
                            "${comb}",
                            '-74px',
                            '-80px'
                        ],
                        [
                            "eid169",
                            "translateY",
                            2500,
                            2500,
                            "linear",
                            "${comb}",
                            '-80px',
                            '-85px'
                        ],
                        [
                            "eid150",
                            "translateY",
                            0,
                            2500,
                            "linear",
                            "${leftCheek}",
                            '-65px',
                            '-53px'
                        ],
                        [
                            "eid157",
                            "translateY",
                            2500,
                            2500,
                            "linear",
                            "${leftCheek}",
                            '-53px',
                            '-41px'
                        ],
                        [
                            "eid146",
                            "translateY",
                            0,
                            2500,
                            "linear",
                            "${mouth}",
                            '-33px',
                            '-18px'
                        ],
                        [
                            "eid161",
                            "translateY",
                            2500,
                            2500,
                            "linear",
                            "${mouth}",
                            '-18px',
                            '-8px'
                        ],
                        [
                            "eid126",
                            "translateX",
                            0,
                            2500,
                            "linear",
                            "${leftHairPin}",
                            '-177px',
                            '-174px'
                        ],
                        [
                            "eid176",
                            "translateX",
                            2500,
                            2500,
                            "linear",
                            "${leftHairPin}",
                            '-174px',
                            '-171px'
                        ],
                        [
                            "eid134",
                            "scaleX",
                            0,
                            2500,
                            "linear",
                            "${rightHairPin}",
                            '0.89887',
                            '1'
                        ],
                        [
                            "eid174",
                            "scaleX",
                            2500,
                            2500,
                            "linear",
                            "${rightHairPin}",
                            '1',
                            '1.05952'
                        ],
                        [
                            "eid122",
                            "translateY",
                            0,
                            2500,
                            "linear",
                            "${rightHairPin}",
                            '-183px',
                            '-175px'
                        ],
                        [
                            "eid171",
                            "translateY",
                            2500,
                            2500,
                            "linear",
                            "${rightHairPin}",
                            '-175px',
                            '-156px'
                        ],
                        [
                            "eid136",
                            "scaleY",
                            0,
                            2500,
                            "linear",
                            "${rightHairPin}",
                            '0.89887',
                            '1'
                        ],
                        [
                            "eid175",
                            "scaleY",
                            2500,
                            2500,
                            "linear",
                            "${rightHairPin}",
                            '1',
                            '1.05952'
                        ],
                        [
                            "eid142",
                            "translateY",
                            0,
                            2500,
                            "linear",
                            "${nose}",
                            '-30px',
                            '-15px'
                        ],
                        [
                            "eid159",
                            "translateY",
                            2500,
                            2500,
                            "linear",
                            "${nose}",
                            '-15px',
                            '-5px'
                        ],
                        [
                            "eid132",
                            "translateX",
                            0,
                            2500,
                            "linear",
                            "${rightHairPin}",
                            '-330px',
                            '-331px'
                        ],
                        [
                            "eid173",
                            "translateX",
                            2500,
                            2500,
                            "linear",
                            "${rightHairPin}",
                            '-331px',
                            '-334px'
                        ],
                        [
                            "eid124",
                            "translateY",
                            0,
                            2500,
                            "linear",
                            "${leftHairPin}",
                            '-98px',
                            '-86px'
                        ],
                        [
                            "eid172",
                            "translateY",
                            2500,
                            2500,
                            "linear",
                            "${leftHairPin}",
                            '-86px',
                            '-67px'
                        ],
                        [
                            "eid154",
                            "translateY",
                            0,
                            2500,
                            "linear",
                            "${rightEar}",
                            '1px',
                            '0px'
                        ],
                        [
                            "eid166",
                            "translateY",
                            2500,
                            2500,
                            "linear",
                            "${rightEar}",
                            '0px',
                            '-4px'
                        ],
                        [
                            "eid128",
                            "scaleX",
                            0,
                            2500,
                            "linear",
                            "${leftHairPin}",
                            '0.91566',
                            '1'
                        ],
                        [
                            "eid177",
                            "scaleX",
                            2500,
                            2500,
                            "linear",
                            "${leftHairPin}",
                            '1',
                            '1.05952'
                        ],
                        [
                            "eid120",
                            "translateY",
                            0,
                            2500,
                            "linear",
                            "${tail}",
                            '-121px',
                            '-145px'
                        ],
                        [
                            "eid170",
                            "translateY",
                            2500,
                            2500,
                            "linear",
                            "${tail}",
                            '-145px',
                            '-148px'
                        ],
                        [
                            "eid156",
                            "translateY",
                            0,
                            2500,
                            "linear",
                            "${face}",
                            '-111px',
                            '-109px'
                        ],
                        [
                            "eid163",
                            "translateY",
                            2500,
                            2500,
                            "linear",
                            "${face}",
                            '-109px',
                            '-103px'
                        ],
                        [
                            "eid130",
                            "scaleY",
                            0,
                            2500,
                            "linear",
                            "${leftHairPin}",
                            '0.91566',
                            '1'
                        ],
                        [
                            "eid178",
                            "scaleY",
                            2500,
                            2500,
                            "linear",
                            "${leftHairPin}",
                            '1',
                            '1.05952'
                        ],
                        [
                            "eid144",
                            "translateY",
                            0,
                            2500,
                            "linear",
                            "${leftEye}",
                            '-15px',
                            '0px'
                        ],
                        [
                            "eid158",
                            "translateY",
                            2500,
                            2500,
                            "linear",
                            "${leftEye}",
                            '0px',
                            '14px'
                        ],
                        [
                            "eid116",
                            "translateY",
                            0,
                            2500,
                            "linear",
                            "${hair}",
                            '-116px',
                            '-123px'
                        ],
                        [
                            "eid168",
                            "translateY",
                            2500,
                            2500,
                            "linear",
                            "${hair}",
                            '-123px',
                            '-133px'
                        ],
                        [
                            "eid148",
                            "translateY",
                            0,
                            2500,
                            "linear",
                            "${rightCheek}",
                            '-82px',
                            '-71px'
                        ],
                        [
                            "eid162",
                            "translateY",
                            2500,
                            2500,
                            "linear",
                            "${rightCheek}",
                            '-71px',
                            '-59px'
                        ],
                        [
                            "eid140",
                            "translateY",
                            0,
                            2500,
                            "linear",
                            "${rightEye}",
                            '-20px',
                            '-5px'
                        ],
                        [
                            "eid160",
                            "translateY",
                            2500,
                            2500,
                            "linear",
                            "${rightEye}",
                            '-5px',
                            '9px'
                        ]
                    ]
                }
            },
            "maru": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            transform: [[-26, 62, 0], [0, 0, 0], [0, 0], [1, 1, 1], ['50%', '50%']],
                            borderRadius: ['45px 45px', '45px 45px', '45px 45px', '45px 45px'],
                            rect: [26, -62, 31, 31, 'auto', 'auto'],
                            id: 'RoundRect',
                            stroke: [0, 'rgba(0,0,0,1)', 'none'],
                            type: 'rect',
                            fill: ['rgba(255,255,255,0.75)']
                        },
                        {
                            transform: [[46, 62, 0], [0, 0, 0], [0, 0], [1, 1, 1], ['50%', '50%']],
                            borderRadius: ['45px 45px', '45px 45px', '45px 45px', '45px 45px'],
                            rect: [26, -62, 31, 31, 'auto', 'auto'],
                            id: 'RoundRectCopy',
                            stroke: [0, 'rgba(0,0,0,1)', 'none'],
                            type: 'rect',
                            fill: ['rgba(255,255,255,0.7461)']
                        },
                        {
                            transform: [[118, 62, 0], [0, 0, 0], [0, 0], [1, 1, 1], ['50%', '50%']],
                            borderRadius: ['45px 45px', '45px 45px', '45px 45px', '45px 45px'],
                            rect: [26, -62, 31, 31, 'auto', 'auto'],
                            id: 'RoundRectCopy2',
                            stroke: [0, 'rgba(0,0,0,1)', 'none'],
                            type: 'rect',
                            fill: ['rgba(255,255,255,0.7461)']
                        },
                        {
                            transform: [[175, 62, 0], [0, 0, 0], [0, 0], [1, 1, 1], ['50%', '50%']],
                            borderRadius: ['45px 45px', '45px 45px', '45px 45px', '45px 45px'],
                            rect: [26, -62, 31, 31, 'auto', 'auto'],
                            id: 'RoundRectCopy3',
                            stroke: [0, 'rgba(0,0,0,1)', 'none'],
                            type: 'rect',
                            fill: ['rgba(255,255,255,0.7461)']
                        },
                        {
                            transform: [[237, 62, 0], [0, 0, 0], [0, 0], [1, 1, 1], ['50%', '50%']],
                            borderRadius: ['45px 45px', '45px 45px', '45px 45px', '45px 45px'],
                            rect: [26, -62, 31, 31, 'auto', 'auto'],
                            id: 'RoundRectCopy4',
                            stroke: [0, 'rgba(0,0,0,1)', 'none'],
                            type: 'rect',
                            fill: ['rgba(255,255,255,0.7461)']
                        },
                        {
                            transform: [[305, 62, 0], [0, 0, 0], [0, 0], [1, 1, 1], ['50%', '50%']],
                            borderRadius: ['45px 45px', '45px 45px', '45px 45px', '45px 45px'],
                            rect: [26, -62, 31, 31, 'auto', 'auto'],
                            id: 'RoundRectCopy8',
                            stroke: [0, 'rgba(0,0,0,1)', 'none'],
                            type: 'rect',
                            fill: ['rgba(255,255,255,0.7461)']
                        },
                        {
                            transform: [[368, 62, 0], [0, 0, 0], [0, 0], [1, 1, 1], ['50%', '50%']],
                            borderRadius: ['45px 45px', '45px 45px', '45px 45px', '45px 45px'],
                            rect: [26, -62, 31, 31, 'auto', 'auto'],
                            id: 'RoundRectCopy9',
                            stroke: [0, 'rgba(0,0,0,1)', 'none'],
                            type: 'rect',
                            fill: ['rgba(255,255,255,0.7461)']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, 31, 31]
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
            "ball1": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            transform: [[162, -183, 0], [0, 0, 0], [0, 0], [1, 1, 1], ['50%', '50%']],
                            borderRadius: ['45px 45px', '45px 45px', '45px 45px', '45px 45px'],
                            rect: [-174, 171, 23, 23, 'auto', 'auto'],
                            id: 'RoundRect2',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            fill: ['rgba(255,255,255,0.7461)']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, 23, 23]
                        }
                    }
                },
                timeline: {
                    duration: 500,
                    autoPlay: true,
                    data: [

                    ]
                }
            },
            "ball2": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            transform: [[150, -195, 0], [0, 0, 0], [0, 0], [1, 1, 1], ['50%', '50%']],
                            borderRadius: ['45px 45px', '45px 45px', '45px 45px', '45px 45px'],
                            rect: [-174, 171, 48, 48, 'auto', 'auto'],
                            id: 'RoundRect2',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            fill: ['rgba(230,209,209,0.75)']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, 23, 23]
                        }
                    }
                },
                timeline: {
                    duration: 500,
                    autoPlay: true,
                    data: [

                    ]
                }
            },
            "ball3": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            transform: [[156, -189, 0], [0, 0, 0], [0, 0], [1, 1, 1], ['50%', '50%']],
                            borderRadius: ['45px 45px', '45px 45px', '45px 45px', '45px 45px'],
                            rect: [-174, 171, 35, 35, 'auto', 'auto'],
                            id: 'RoundRect2',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            fill: ['rgba(208,243,220,0.75)']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, 23, 23]
                        }
                    }
                },
                timeline: {
                    duration: 500,
                    autoPlay: true,
                    data: [

                    ]
                }
            },
            "ball4": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            transform: [[162, -183, 0], [0, 0, 0], [0, 0], [1, 1, 1], ['50%', '50%']],
                            borderRadius: ['45px 45px', '45px 45px', '45px 45px', '45px 45px'],
                            rect: [-174, 171, 23, 23, 'auto', 'auto'],
                            id: 'RoundRect2',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            fill: ['rgba(201,209,243,0.75)']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, 23, 23]
                        }
                    }
                },
                timeline: {
                    duration: 500,
                    autoPlay: true,
                    data: [

                    ]
                }
            },
            "ball5": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            transform: [[146, -199, 0], [0, 0, 0], [0, 0], [1, 1, 1], ['50%', '50%']],
                            borderRadius: ['45px 45px', '45px 45px', '45px 45px', '45px 45px'],
                            rect: [-174, 171, 55, 55, 'auto', 'auto'],
                            id: 'RoundRect2',
                            stroke: [0, 'rgb(0, 0, 0)', 'none'],
                            type: 'rect',
                            fill: ['rgba(228,230,199,0.75)']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, 23, 23]
                        }
                    }
                },
                timeline: {
                    duration: 500,
                    autoPlay: true,
                    data: [

                    ]
                }
            },
            "kimonoGirl": {
                version: "6.0.0",
                minimumCompatibleVersion: "5.0.0",
                build: "6.0.0.400",
                scaleToFit: "none",
                centerStage: "none",
                resizeInstances: false,
                content: {
                    dom: [
                        {
                            transform: [['-97', '-61'], [0, 0, 0], [0, 0, 0], [1, 1, 1]],
                            id: 'kimono',
                            type: 'image',
                            rect: ['62px', '276px', '428px', '184px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/kimono.png']
                        },
                        {
                            transform: [['-61', '-123'], [0, 0, 0], [0, 0, 0], [1, 1, 1]],
                            id: 'hair',
                            type: 'image',
                            rect: ['94', '166px', '212', '193', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/hair.png']
                        },
                        {
                            transform: [['-63', '-145'], [0, 0, 0], [0, 0, 0], [1, 1, 1]],
                            id: 'tail',
                            type: 'image',
                            rect: ['139', '136px', '136', '107', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/tail.png']
                        },
                        {
                            transform: [['-97', '-22'], [0, 0, 0], [0, 0, 0], [1, 1, 1]],
                            id: 'leftEar',
                            type: 'image',
                            rect: ['251px', '45px', '42px', '59px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/leftEar.png']
                        },
                        {
                            transform: [['2'], [0, 0, 0], [0, 0, 0], [1, 1, 1]],
                            id: 'rightEar',
                            type: 'image',
                            rect: ['80px', '23px', '31px', '57px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/rightEar.png']
                        },
                        {
                            transform: [['-69', '-80'], [0, 0, 0], [0, 0, 0], [1, 1, 1]],
                            id: 'comb',
                            type: 'image',
                            rect: ['123px', '156px', '23px', '28px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/comb.png']
                        },
                        {
                            transform: [['-176', '-15'], [0, 0, 0], [0, 0, 0], [1, 1, 1]],
                            id: 'neck',
                            type: 'image',
                            rect: ['298px', '196px', '33px', '76px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/neck.png']
                        },
                        {
                            transform: [['-84', '-109'], [0, 0, 0], [0, 0, 0], [1, 1, 1]],
                            id: 'face',
                            type: 'image',
                            rect: ['147px', '264px', '153px', '67px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/face.png']
                        },
                        {
                            transform: [['-5', '-18'], [0, 0, 0], [0, 0, 0], [1, 1, 1]],
                            id: 'mouth',
                            type: 'image',
                            rect: ['114px', '221px', '59px', '23px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/mouth.png']
                        },
                        {
                            transform: [['-27', '-5'], [0, 0, 0], [0, 0, 0], [1, 1, 1]],
                            id: 'rightEye',
                            symbolName: 'eye',
                            rect: ['114px', '166px', '35', '35', 'auto', 'auto'],
                            type: 'rect'
                        },
                        {
                            transform: [['-1'], [0, 0, 0], [0, 0, 0], [1, 1, 1]],
                            id: 'leftEye',
                            symbolName: 'eye',
                            rect: ['158px', '161px', '35', '35', 'auto', 'auto'],
                            type: 'rect'
                        },
                        {
                            transform: [['-3', '-15'], [0, 0, 0], [0, 0, 0], [1, 1, 1]],
                            rect: ['139', '213px', '7', '7', 'auto', 'auto'],
                            id: 'nose',
                            opacity: '0',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/nose.png']
                        },
                        {
                            transform: [['-396', '-71'], [0, 0, 0], [0, 0, 0], [1, 1, 1]],
                            id: 'rightCheek',
                            type: 'image',
                            rect: ['458px', '252px', '5px', '34px', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/rightCheek.png']
                        },
                        {
                            transform: [['-84', '-53'], [0, 0, 0], [0, 0, 0], [1, 1, 1]],
                            rect: ['266', '260px', '31', '26', 'auto', 'auto'],
                            id: 'leftCheek',
                            opacity: '0',
                            type: 'image',
                            fill: ['rgba(0,0,0,0)', 'images/leftCheek.png']
                        },
                        {
                            transform: [['-174', '-86'], [0, 0, 0], [0, 0, 0], [1, 1, 1]],
                            id: 'leftHairPin',
                            type: 'image',
                            rect: ['293px', '109px', '89', '83', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/leftHirPin.png']
                        },
                        {
                            transform: [['-331', '-175'], [0, 0, 0], [0, 0, 0], [1, 1, 1]],
                            id: 'rightHairPin',
                            type: 'image',
                            rect: ['396px', '198px', '89', '84', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/rightHairPin.png']
                        },
                        {
                            transform: [['-360', '-163'], [0, 0, 0], [0, 0, 0], [1, 1, 1]],
                            id: 'bangs',
                            type: 'image',
                            rect: ['414px', '212px', '169px', '126', 'auto', 'auto'],
                            fill: ['rgba(0,0,0,0)', 'images/bangs.png']
                        }
                    ],
                    style: {
                        '${symbolSelector}': {
                            rect: [null, null, '272', '364']
                        }
                    }
                },
                timeline: {
                    duration: 2000,
                    autoPlay: false,
                    data: [

                    ]
                }
            }
        };

    AdobeEdge.registerCompositionDefn(compId, symbols, fonts, scripts, resources, opts);

    if (!window.edge_authoring_mode) AdobeEdge.getComposition(compId).load("elearning_edgeActions.js");
})("EDGE-2192733");
